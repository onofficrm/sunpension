import { Baby, Users, Trophy, Briefcase, PartyPopper, Users2 } from 'lucide-react';

export default function PurposeRecommendation() {
  const purposes = [
    {
      id: 'family',
      title: '가족여행',
      description: '아이들과 함께 머물기 편한 넓고 안전한 풀빌라',
      icon: <Baby className="w-8 h-8" />,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      id: 'friends',
      title: '친구모임',
      description: '수영장과 공용 공간을 함께 즐기기 좋은 풀빌라',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-pink-50 text-pink-600'
    },
    {
      id: 'golf',
      title: '골프여행',
      description: '골프장과 세부시티 이동이 편리한 풀빌라',
      icon: <Trophy className="w-8 h-8" />,
      color: 'bg-green-50 text-green-600'
    },
    {
      id: 'workshop',
      title: '기업 워크숍',
      description: '여러 명이 함께 이용할 수 있는 넓은 단체 숙소',
      icon: <Briefcase className="w-8 h-8" />,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      id: 'anniversary',
      title: '생일·기념여행',
      description: '특별한 날을 프라이빗하게 즐기기 좋은 공간',
      icon: <PartyPopper className="w-8 h-8" />,
      color: 'bg-orange-50 text-orange-600'
    },
    {
      id: 'large-group',
      title: '대가족·단체여행',
      description: '침실과 거실이 넓고 최대 인원이 많은 풀빌라',
      icon: <Users2 className="w-8 h-8" />,
      color: 'bg-brand-emerald/10 text-brand-emerald'
    }
  ];

  return (
    <section className="cebuvilla-purpose py-20 bg-brand-beige w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4 tracking-tight">여행 목적에 맞는 풀빌라를 찾아보세요</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {purposes.map((purpose) => (
            <a 
              key={purpose.id} 
              href="#villa-consultation"
              className="group block bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${purpose.color} transition-colors group-hover:bg-brand-navy group-hover:text-white`}>
                  {purpose.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-navy mb-2 group-hover:text-brand-emerald transition-colors">{purpose.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{purpose.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
