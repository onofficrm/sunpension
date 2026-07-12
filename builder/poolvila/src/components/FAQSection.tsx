import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { question: "기준 인원과 최대 인원은 어떻게 다른가요?" },
    { question: "체크인과 체크아웃 시간은 언제인가요?" },
    { question: "추가 인원 비용이 있나요?" },
    { question: "보증금이 필요한가요?" },
    { question: "수영장 이용 규정이 있나요?" },
    { question: "음식 조리와 바비큐가 가능한가요?" },
    { question: "공항 픽업과 차량 이용이 가능한가요?" },
    { question: "취소와 환불은 어떻게 진행되나요?" },
    { question: "늦은 시간까지 파티가 가능한가요?" },
    { question: "어린이와 함께 이용할 수 있나요?" }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="cebuvilla-faq py-24 bg-brand-beige w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4 tracking-tight">예약 전 확인사항</h2>
          <p className="text-gray-600 text-lg">자주 묻는 질문을 확인해보세요.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border-b border-gray-100 last:border-b-0 ${openIndex === index ? 'bg-brand-emerald/5' : 'bg-white'}`}
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-bold text-brand-navy text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-brand-emerald flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  해당 사항은 풀빌라마다 조건이 다를 수 있으므로 예약 전 정확한 확인이 필요합니다. 담당자에게 문의해 주시면 고객님께서 선택하신 풀빌라의 상세 규정을 자세히 안내해 드립니다.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
