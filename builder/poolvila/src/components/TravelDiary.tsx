import { Calendar, ArrowRight } from 'lucide-react';

// 그누보드 최신글 연동 시 이 배열 데이터를 서버 데이터로 교체하세요. (게시판 ID: diary)
const MOCK_DIARY = [
  {
    id: 1,
    category: '여행후기',
    title: '가족들과 함께한 완벽한 3박 4일 세부 풀빌라 여행',
    summary: '아이들과 함께 머물기 좋은 세부시티의 프라이빗 풀빌라에서 편안한 휴식을 취했습니다. 수영장도 넓고 바비큐 파티도 즐거웠어요.',
    date: '2023.10.15',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop',
    link: '/bbs/board.php?bo_table=diary&wr_id=1'
  },
  {
    id: 2,
    category: '현지정보',
    title: '막탄 풀빌라 주변 해산물 맛집 리스트 공유합니다',
    summary: '막탄 지역에 머물면서 방문했던 해산물 레스토랑과 현지 로컬 맛집 정보입니다. 픽업도 가능해서 편하게 이동했어요.',
    date: '2023.09.22',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
    link: '/bbs/board.php?bo_table=diary&wr_id=2'
  },
  {
    id: 3,
    category: '이용팁',
    title: '풀빌라 100% 즐기는 바비큐 파티 꿀팁',
    summary: '프라이빗 풀빌라의 꽃은 역시 바비큐죠! 현지 시장에서 장보기부터 셰프 서비스 이용 방법까지 정리해봤습니다.',
    date: '2023.09.10',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop',
    link: '/bbs/board.php?bo_table=diary&wr_id=3'
  }
];

export default function TravelDiary() {
  return (
    <section className="cebuvilla-diary py-24 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4 tracking-tight">세부풀빌라 여행 다이어리</h2>
            <p className="text-gray-600 text-lg">세부 현지에서 전하는 풀빌라 후기와 여행 이야기를 확인해보세요.</p>
          </div>
          <a 
            href="/bbs/board.php?bo_table=diary" 
            className="flex items-center gap-2 text-brand-emerald font-bold hover:text-emerald-700 transition-colors whitespace-nowrap"
          >
            여행 다이어리 전체보기 <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_DIARY.map((post) => (
            <article key={post.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
              <a href={post.link} className="block relative h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-navy/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {post.category}
                  </span>
                </div>
              </a>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-brand-navy mb-3 line-clamp-2 group-hover:text-brand-emerald transition-colors">
                  <a href={post.link}>{post.title}</a>
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {post.summary}
                </p>
                
                <a 
                  href={post.link} 
                  className="inline-flex items-center text-sm font-bold text-brand-navy group-hover:text-brand-emerald transition-colors mt-auto"
                >
                  자세히 보기 &rarr;
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
