export type BoardItem = {
  wr_id: number;
  subject: string;
  summary: string;
  date: string;
  datetime: string;
  hit: number;
  category: string;
  is_notice: boolean;
  is_new: boolean;
  thumbnail: string;
  link: string;
  capacity: string;
  bedrooms: string;
  pool_info: string;
  features: string;
  region_label: string;
  content?: string;
  content_text?: string;
};

export type BoardListResponse = {
  ok: boolean;
  message?: string;
  bo_table?: string;
  total?: number;
  page?: number;
  per_page?: number;
  items?: BoardItem[];
};

export type BoardViewResponse = {
  ok: boolean;
  message?: string;
  item?: BoardItem;
};

const DEFAULT_THUMB =
  'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1200&auto=format&fit=crop';

export function boardThumb(item: BoardItem): string {
  return item.thumbnail || DEFAULT_THUMB;
}

export function boardFeatures(item: BoardItem): string[] {
  if (!item.features) return [];
  return item.features.split('|').map((v) => v.trim()).filter(Boolean);
}

export async function fetchBoardList(
  boTable: string,
  options: { page?: number; rows?: number } = {}
): Promise<BoardListResponse> {
  const params = new URLSearchParams({
    bo_table: boTable,
    page: String(options.page ?? 1),
    rows: String(options.rows ?? 15),
  });

  const res = await fetch(`/api/board/list?${params.toString()}`);
  return res.json();
}

export async function fetchBoardView(boTable: string, wrId: number): Promise<BoardViewResponse> {
  const params = new URLSearchParams({
    bo_table: boTable,
    wr_id: String(wrId),
  });

  const res = await fetch(`/api/board/view?${params.toString()}`);
  return res.json();
}
