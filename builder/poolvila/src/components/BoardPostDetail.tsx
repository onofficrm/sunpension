import { ArrowLeft } from 'lucide-react';
import { useBoardView } from '../hooks/useBoardView';

type BoardPostDetailProps = {
  boTable: string;
  wrId: string;
  title: string;
};

export default function BoardPostDetail({ boTable, wrId, title }: BoardPostDetailProps) {
  const { item, loading, error } = useBoardView(boTable, wrId);

  if (loading) {
    return <div className="min-h-[50vh] flex items-center justify-center text-gray-500">게시글을 불러오는 중...</div>;
  }

  if (error || !item) {
    return <div className="min-h-[50vh] flex items-center justify-center text-gray-500">{error || '게시글을 찾을 수 없습니다.'}</div>;
  }

  return (
    <div className="bg-brand-beige min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <a
          href={`/bbs/board.php?bo_table=${boTable}`}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-navy mb-6 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> 목록으로
        </a>

        <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <header className="p-8 md:p-10 border-b border-gray-100">
            <p className="text-sm text-brand-emerald font-bold mb-3">{title}</p>
            <h1 className="text-2xl md:text-4xl font-bold text-brand-navy mb-4">{item.subject}</h1>
            <div className="flex gap-4 text-sm text-gray-500">
              <span>{item.date}</span>
              <span>조회 {item.hit}</span>
              {item.category && <span>{item.category}</span>}
            </div>
          </header>
          <div
            className="p-8 md:p-10 prose prose-lg max-w-none prose-emerald"
            dangerouslySetInnerHTML={{ __html: item.content || item.summary }}
          />
        </article>
      </div>
    </div>
  );
}
