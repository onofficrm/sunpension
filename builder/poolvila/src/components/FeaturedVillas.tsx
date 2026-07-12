import { MapPin, Users, BedDouble, Waves, CheckCircle2 } from 'lucide-react';

// 그누보드 최신글 연동 시 이 배열 데이터를 서버 데이터로 교체하세요.
const MOCK_VILLAS = [
  {
    id: 1,
    region: 'mactan',
    regionName: '막탄',
    title: '오션뷰 프리미엄 빌라',
    standardCapacity: 8,
    maxCapacity: 12,
    bedrooms: 4,
    hasPool: true,
    features: ['오션뷰', '바비큐 가능', '한국어 상담'],
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop',
    link: '/bbs/board.php?bo_table=mactan'
  },
  {
    id: 2,
    region: 'cebu',
    regionName: '세부시티',
    title: '시그니처 가든 풀빌라',
    standardCapacity: 6,
    maxCapacity: 10,
    bedrooms: 3,
    hasPool: true,
    features: ['시내접근성', '가족여행 추천', '주방 및 취사 가능'],
    image: 'https://images.unsplash.com/photo-1613490908144-82a15c329c32?q=80&w=2070&auto=format&fit=crop',
    link: '/bbs/board.php?bo_table=cebu'
  },
  {
    id: 3,
    region: 'mactan',
    regionName: '막탄',
    title: '럭셔리 파티 하우스',
    standardCapacity: 10,
    maxCapacity: 15,
    bedrooms: 5,
    hasPool: true,
    features: ['노래방 시설', '대형 거실', '단체 이용 가능'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
    link: '/bbs/board.php?bo_table=mactan'
  },
  {
    id: 4,
    region: 'cebu',
    regionName: '세부시티',
    title: '모던 시티뷰 풀빌라',
    standardCapacity: 4,
    maxCapacity: 8,
    bedrooms: 3,
    hasPool: true,
    features: ['골프장 이동 편리', '모던 인테리어', '프라이빗 수영장'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    link: '/bbs/board.php?bo_table=cebu'
  },
  {
    id: 5,
    region: 'mactan',
    regionName: '막탄',
    title: '트로피컬 패밀리 빌라',
    standardCapacity: 6,
    maxCapacity: 8,
    bedrooms: 3,
    hasPool: true,
    features: ['공항 픽업 가능', '가족여행 추천', '바비큐 가능'],
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop',
    link: '/bbs/board.php?bo_table=mactan'
  },
  {
    id: 6,
    region: 'cebu',
    regionName: '세부시티',
    title: '그랜드 럭셔리 맨션',
    standardCapacity: 12,
    maxCapacity: 20,
    bedrooms: 7,
    hasPool: true,
    features: ['단체 이용 가능', '대형 거실', '프라이빗 수영장'],
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop',
    link: '/bbs/board.php?bo_table=cebu'
  }
];

export default function FeaturedVillas() {
  return (
    <section className="cebuvilla-featured py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4 tracking-tight">지금 많이 찾는 세부 풀빌라</h2>
        <p className="text-brand-charcoal/80 text-lg max-w-2xl mx-auto">
          가족여행부터 단체여행까지 여행 목적에 맞는 풀빌라를 확인해보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_VILLAS.map((villa) => (
          <article 
            key={villa.id} 
            className="cebuvilla-card group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-1"
          >
            {/* 카드 썸네일 */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={villa.image} 
                alt={villa.title} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-sm text-white ${villa.region === 'cebu' ? 'bg-brand-navy/90' : 'bg-brand-emerald/90'} backdrop-blur-sm`}>
                  {villa.regionName}
                </span>
              </div>
            </div>

            {/* 카드 정보 */}
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-xl font-bold text-brand-navy mb-4 group-hover:text-brand-emerald transition-colors">
                {villa.title}
              </h3>
              
              <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-brand-emerald" />
                  <span>기준 {villa.standardCapacity}인 / 최대 {villa.maxCapacity}인</span>
                </div>
                <div className="flex items-center gap-2">
                  <BedDouble className="w-4 h-4 text-brand-emerald" />
                  <span>침실 {villa.bedrooms}개</span>
                </div>
                {villa.hasPool && (
                  <div className="flex items-center gap-2 col-span-2">
                    <Waves className="w-4 h-4 text-brand-emerald" />
                    <span>프라이빗 수영장</span>
                  </div>
                )}
              </div>

              <div className="flex-grow">
                <ul className="space-y-1.5 mb-6">
                  {villa.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-lg font-bold text-brand-navy">상담문의</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-auto">
                <a 
                  href={villa.link} 
                  className="cebuvilla-btn-card text-center bg-gray-50 hover:bg-gray-100 text-brand-charcoal border border-gray-200 font-semibold py-3 rounded-xl transition-all text-sm"
                >
                  자세히 보기
                </a>
                <a 
                  href="#villa-consultation" 
                  className="cebuvilla-btn-card text-center bg-brand-emerald hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md text-sm"
                >
                  상담하기
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <a 
          href="/bbs/board.php?bo_table=cebu" 
          className="inline-flex items-center justify-center gap-2 text-brand-navy font-bold hover:text-brand-emerald transition-colors border-b-2 border-brand-navy hover:border-brand-emerald pb-1"
        >
          풀빌라 전체보기 &rarr;
        </a>
      </div>
    </section>
  );
}
