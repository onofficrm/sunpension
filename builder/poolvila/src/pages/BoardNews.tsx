import { Newspaper } from 'lucide-react';
import BoardListPage from '../components/BoardListPage';

export default function BoardNews({ wrId }: { wrId: string | null }) {
  return (
    <BoardListPage
      boTable="news"
      title="새소식"
      description="세부풀빌라의 다양한 소식과 이벤트, 여행 정보를 안내해드립니다."
      icon={Newspaper}
      wrId={wrId}
      rows={20}
      showHit
    />
  );
}
