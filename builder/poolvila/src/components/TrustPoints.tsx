import { Map, Camera, Users, Clock } from 'lucide-react';

export default function TrustPoints() {
  const points = [
    {
      icon: <Map className="w-6 h-6" />,
      title: '세부시티·막탄 지역별 비교'
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: '실제 사진 중심 풀빌라 정보'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: '인원과 여행 목적별 맞춤 안내'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: '상담부터 예약까지 빠른 안내'
    }
  ];

  return (
    <section className="cebuvilla-trust-points w-full py-12 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {points.map((point, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-emerald/10 text-brand-emerald rounded-full flex items-center justify-center">
                {point.icon}
              </div>
              <h3 className="text-[15px] font-bold text-brand-navy leading-tight">
                {point.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
