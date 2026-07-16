import { BookOpen } from 'lucide-react';
import BoardListPage from '../components/BoardListPage';

export default function BoardDiary({ wrId }: { wrId: string | null }) {
  return (
    <BoardListPage
      boTable="diary"
      title="여행 다이어리"
      description="세부 현지에서 전하는 풀빌라 후기와 여행 이야기를 확인해보세요."
      icon={BookOpen}
      wrId={wrId}
      rows={20}
      showHit
    />
  );
}
