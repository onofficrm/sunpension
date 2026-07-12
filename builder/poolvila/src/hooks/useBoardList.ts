import { useEffect, useState } from 'react';
import { BoardItem, BoardListResponse, fetchBoardList } from '../lib/boardApi';

export function useBoardList(boTable: string, rows = 15) {
  const [data, setData] = useState<BoardListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');

    fetchBoardList(boTable, { rows })
      .then((res) => {
        if (!active) return;
        if (!res.ok) {
          setError(res.message || '게시글을 불러오지 못했습니다.');
          setData(null);
          return;
        }
        setData(res);
      })
      .catch(() => {
        if (!active) return;
        setError('네트워크 오류가 발생했습니다.');
        setData(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [boTable, rows]);

  const items: BoardItem[] = data?.items ?? [];

  return { items, loading, error, total: data?.total ?? 0 };
}
