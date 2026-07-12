import { MessagesSquare } from 'lucide-react';

export default function FreeBoardBanner() {
  return (
    <div className="cebuvilla-free-board-banner bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
      <div className="flex items-center gap-4 text-center md:text-left">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 hidden sm:flex">
          <MessagesSquare className="w-6 h-6 text-gray-500" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-brand-navy mb-1">커뮤니티 자유게시판</h4>
          <p className="text-gray-600 text-sm">세부 여행과 풀빌라에 대해 자유롭게 이야기를 나눠보세요.</p>
        </div>
      </div>
      <a 
        href="/bbs/board.php?bo_table=free" 
        className="flex-shrink-0 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-brand-charcoal font-bold rounded-xl transition-colors text-sm w-full md:w-auto text-center"
      >
        자유게시판 바로가기
      </a>
    </div>
  );
}
