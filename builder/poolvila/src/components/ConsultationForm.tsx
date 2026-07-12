import { MessageCircle, Phone } from 'lucide-react';

export default function ConsultationForm() {
  return (
    <section id="villa-consultation" className="cebuvilla-consult-form py-24 bg-white w-full border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4 tracking-tight">빠르고 간편한 풀빌라 상담</h2>
          <p className="text-gray-600 text-lg">
            복잡한 입력 없이, 카카오톡으로 편하게 문의주시면 딱 맞는 풀빌라를 추천해 드립니다.
          </p>
        </div>

        <div className="bg-brand-beige/30 p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-[#FEE500]/20 text-[#191919] rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-10 h-10" />
          </div>
          
          <h3 className="text-2xl font-bold text-brand-navy mb-2">카카오톡 실시간 상담</h3>
          <p className="text-gray-500 mb-8">
            인원수, 원하시는 여행 목적 등 간단히 남겨주시면 빠르게 답변해 드립니다.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="https://pf.kakao.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FEE500] hover:bg-[#FDD800] text-[#191919] font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 flex-1"
            >
              <MessageCircle className="w-6 h-6" fill="#191919" />
              카카오톡 문의하기
            </a>
          </div>
          
          <div className="mt-8 text-sm text-gray-400">
            상담 가능 시간: 매일 09:00 ~ 18:00
          </div>
        </div>
      </div>
    </section>
  );
}
