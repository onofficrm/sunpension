import { Search, CalendarDays, CheckCircle, CreditCard } from 'lucide-react';

export default function ReservationProcess() {
  const steps = [
    {
      id: '01',
      title: '풀빌라 확인',
      description: '세부시티와 막탄의 풀빌라 사진과 정보를 확인합니다.',
      icon: <Search className="w-8 h-8" />
    },
    {
      id: '02',
      title: '일정과 인원 전달',
      description: '체크인 날짜, 체크아웃 날짜, 이용 인원과 여행 목적을 알려주세요.',
      icon: <CalendarDays className="w-8 h-8" />
    },
    {
      id: '03',
      title: '예약 가능 여부 확인',
      description: '담당자가 예약 가능 여부, 이용 조건과 정확한 금액을 안내합니다.',
      icon: <CheckCircle className="w-8 h-8" />
    },
    {
      id: '04',
      title: '예약 확정',
      description: '예약 내용을 확인하고 안내된 절차에 따라 예약을 확정합니다.',
      icon: <CreditCard className="w-8 h-8" />
    }
  ];

  return (
    <section className="cebuvilla-process py-24 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4 tracking-tight">세부 풀빌라 예약은 이렇게 진행됩니다</h2>
          <p className="text-gray-600 text-lg">쉽고 빠른 상담으로 고객님께 딱 맞는 풀빌라를 안내해 드립니다.</p>
        </div>

        <div className="relative">
          {/* PC 가로선 (모바일 숨김) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-100"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center relative">
                
                {/* 모바일 세로선 */}
                {index !== steps.length - 1 && (
                  <div className="md:hidden absolute left-[2.25rem] top-20 bottom-[-2rem] w-0.5 bg-gray-100 z-0"></div>
                )}

                <div className="flex-shrink-0 w-20 h-20 bg-white border-4 border-brand-beige rounded-full flex items-center justify-center text-brand-emerald shadow-sm relative z-10 mb-0 md:mb-6 mr-6 md:mr-0 group-hover:bg-brand-emerald group-hover:text-white transition-colors">
                  {step.icon}
                </div>
                
                <div className="pt-2 md:pt-0 pb-8 md:pb-0">
                  <div className="text-brand-emerald font-bold text-sm mb-1">STEP {step.id}</div>
                  <h3 className="text-xl font-bold text-brand-navy mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
