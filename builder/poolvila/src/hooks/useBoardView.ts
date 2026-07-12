import { useEffect, useState } from 'react';
import { BoardItem, fetchBoardView } from '../lib/boardApi';

export function useBoardView(boTable: string, wrId: string | null) {
  const [item, setItem] = useState<BoardItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!wrId) {
      setItem(null);
      setLoading(false);
      setError('');
      return;
    }

    let active = true;
    setLoading(true);
    setError('');

    fetchBoardView(boTable, Number(wrId))
      .then((res) => {
        if (!active) return;
        if (!res.ok || !res.item) {
          setError(res.message || '게시글을 찾을 수 없습니다.');
          setItem(null);
          return;
        }
        setItem(res.item);
      })
      .catch(() => {
        if (!active) return;
        setError('네트워크 오류가 발생했습니다.');
        setItem(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [boTable, wrId]);

  return { item, loading, error };
}
