/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import MainPage from './pages/MainPage';
import BoardVilla from './pages/BoardVilla';
import BoardNews from './pages/BoardNews';
import BoardDiary from './pages/BoardDiary';
import BoardFree from './pages/BoardFree';
import BoardNotice from './pages/BoardNotice';

const SPA_BOARDS = new Set(['cebu', 'mactan', 'news', 'diary', 'free', 'notice']);

function isSpaNavigable(url: URL): boolean {
  const path = url.pathname;
  if (path === '/' || path.endsWith('/index.php')) {
    return true;
  }
  if (path.includes('/bbs/board.php')) {
    const boTable = url.searchParams.get('bo_table') || '';
    return SPA_BOARDS.has(boTable);
  }
  return false;
}

export default function App() {
  const [currentUrl, setCurrentUrl] = useState(window.location.pathname + window.location.search);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentUrl(window.location.pathname + window.location.search);
    };

    const handleLinkClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor || !anchor.href) {
        return;
      }
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) {
        return;
      }

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.origin);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) {
        return;
      }

      if (url.pathname === window.location.pathname && url.hash && url.search === window.location.search) {
        return;
      }

      if (!isSpaNavigable(url)) {
        return;
      }

      e.preventDefault();
      window.history.pushState({}, '', url.pathname + url.search + url.hash);
      setCurrentUrl(url.pathname + url.search);
      window.scrollTo(0, 0);

      if (url.hash) {
        setTimeout(() => {
          const element = document.getElementById(url.hash.substring(1));
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  void currentUrl;

  const renderPage = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const boTable = searchParams.get('bo_table');
    const wrId = searchParams.get('wr_id');

    if (window.location.pathname.includes('/bbs/board.php')) {
      if (boTable === 'cebu' || boTable === 'mactan') {
        return <BoardVilla region={boTable} wrId={wrId} />;
      }
      if (boTable === 'news') return <BoardNews wrId={wrId} />;
      if (boTable === 'diary') return <BoardDiary wrId={wrId} />;
      if (boTable === 'free') return <BoardFree wrId={wrId} />;
      if (boTable === 'notice') return <BoardNotice wrId={wrId} />;
    }

    return <MainPage />;
  };

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
}
