import { MessagesSquare } from 'lucide-react';
import BoardListPage from '../components/BoardListPage';

export default function BoardFree({ wrId }: { wrId: string | null }) {
  return (
    <BoardListPage
      boTable="free"
      title="자유게시판"
      description="세부 여행과 풀빌라에 대해 자유롭게 이야기를 나눠보세요."
      icon={MessagesSquare}
      wrId={wrId}
      rows={20}
      showWrite
      showHit
    />
  );
}
