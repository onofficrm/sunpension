import { Megaphone } from 'lucide-react';
import BoardListPage from '../components/BoardListPage';

export default function BoardNotice({ wrId }: { wrId: string | null }) {
  return (
    <BoardListPage
      boTable="notice"
      title="공지사항"
      description="필독 안내 및 중요 공지를 확인해주세요."
      icon={Megaphone}
      wrId={wrId}
      rows={30}
    />
  );
}
