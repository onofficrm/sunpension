import { LucideIcon, PenLine } from 'lucide-react';
import { useBoardList } from '../hooks/useBoardList';
import BoardPostDetail from './BoardPostDetail';

type BoardListPageProps = {
  boTable: string;
  title: string;
  description: string;
  icon: LucideIcon;
  wrId: string | null;
  rows?: number;
  showWrite?: boolean;
  showHit?: boolean;
};

export default function BoardListPage({
  boTable,
  title,
  description,
  icon: Icon,
  wrId,
  rows = 20,
  showWrite = false,
  showHit = false,
}: BoardListPageProps) {
  const { items, loading, error } = useBoardList(boTable, rows);

  if (wrId) {
    return <BoardPostDetail boTable={boTable} wrId={wrId} title={title} />;
  }

  const noticeItems = items.filter((item) => item.is_notice);
  const normalItems = items.filter((item) => !item.is_notice);

  const renderRow = (item: (typeof items)[number], index: number, pinned: boolean) => (
    <li
      key={item.wr_id}
      className={pinned ? 'bg-brand-orange/5 hover:bg-brand-orange/10' : 'hover:bg-gray-50'}
    >
      <a
        href={`/bbs/board.php?bo_table=${boTable}&wr_id=${item.wr_id}`}
        className="block p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center md:px-6 md:py-5 transition-colors"
      >
        <div className="hidden md:block col-span-1 text-sm">
          {pinned ? (
            <span className="bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">공지</span>
          ) : (
            <span className="text-gray-400">{normalItems.length - index}</span>
          )}
        </div>
        <div className={`col-span-12 ${showHit ? 'md:col-span-7' : 'md:col-span-8'} text-left md:pl-2 mb-2 md:mb-0`}>
          <div className="flex items-center gap-2 md:hidden mb-1">
            {pinned ? (
              <span className="bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">공지</span>
            ) : null}
            {item.is_new ? (
              <span className="bg-brand-emerald text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">N</span>
            ) : null}
          </div>
          <span className="text-[15px] md:text-base font-medium text-brand-charcoal group-hover:text-brand-emerald transition-colors">
            {item.subject}
          </span>
          {item.category ? (
            <span className="ml-2 text-xs text-brand-emerald font-semibold hidden sm:inline">{item.category}</span>
          ) : null}
        </div>
        <div
          className={`col-span-12 ${showHit ? 'md:col-span-4' : 'md:col-span-3'} text-xs md:text-sm text-gray-500 flex justify-between md:justify-end md:gap-6`}
        >
          {showHit ? <span>조회 {item.hit}</span> : null}
          <span>{item.date}</span>
        </div>
      </a>
    </li>
  );

  return (
    <div className={`cebuvilla-board-${boTable} bg-brand-beige min-h-screen py-16 md:py-20`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6 text-brand-orange" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-1 tracking-tight">{title}</h1>
              <p className="text-gray-600 text-sm md:text-base">{description}</p>
            </div>
          </div>
          {showWrite ? (
            <a
              href={`/bbs/write.php?bo_table=${boTable}`}
              className="hidden sm:inline-flex items-center gap-2 bg-brand-navy text-white px-5 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-sm"
            >
              <PenLine className="w-4 h-4" /> 글쓰기
            </a>
          ) : null}
        </div>

        {loading && <p className="text-gray-500 mb-4">게시글을 불러오는 중...</p>}
        {error && (
          <p className="text-rose-600 mb-4 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3 text-sm">{error}</p>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 px-6 py-16 text-center text-gray-500">
            등록된 게시글이 없습니다.
          </div>
        )}

        {noticeItems.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden mb-6">
            <div className="px-5 py-3 border-b border-orange-50 bg-brand-orange/5">
              <p className="text-sm font-bold text-brand-orange">공지 · 상단 고정</p>
            </div>
            <ul className="divide-y divide-gray-100">{noticeItems.map((item, i) => renderRow(item, i, true))}</ul>
          </div>
        )}

        {normalItems.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {normalItems.map((item, index) => renderRow(item, index, false))}
            </ul>
          </div>
        )}

        {showWrite ? (
          <div className="mt-4 sm:hidden flex justify-end">
            <a
              href={`/bbs/write.php?bo_table=${boTable}`}
              className="inline-flex items-center gap-2 bg-brand-navy text-white px-5 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-sm"
            >
              <PenLine className="w-4 h-4" /> 글쓰기
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}
