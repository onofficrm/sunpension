import React, { useState } from 'react';
import { Calendar, MapPin, Users, Compass, Loader2, Sparkles, Navigation } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function ItineraryPlanner() {
  const [days, setDays] = useState('3박 4일');
  const [location, setLocation] = useState('막탄');
  const [purpose, setPurpose] = useState('가족여행');
  const [people, setPeople] = useState('6');
  const [pace, setPace] = useState('여유롭게 휴식 위주');
  
  const [itinerary, setItinerary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setItinerary(null);
    
    try {
      const res = await fetch('/api/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ days, location, purpose, people, pace })
      });
      const data = await res.json();
      if (res.ok) {
        setItinerary(data.itinerary);
      } else {
        setItinerary('일정을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      setItinerary('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="cebuvilla-itinerary py-20 bg-white w-full border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold tracking-wider mb-4 border border-brand-orange/20">
            AI 추천 서비스
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-brand-navy mb-4 tracking-tight">
            맞춤형 세부 여행 일정 플래너
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            풀빌라 예약과 함께 세부에서 보낼 알찬 일정을 AI가 계획해 드립니다. 
            조건만 선택하시면 최적의 동선과 액티비티를 추천해 드려요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form */}
          <div className="lg:col-span-4 bg-brand-beige rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm h-fit">
            <h3 className="text-xl font-bold text-brand-navy mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-orange" />
              여행 조건 입력
            </h3>
            
            <form onSubmit={handleGenerate} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-400" /> 여행 기간
                </label>
                <select value={days} onChange={(e) => setDays(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-emerald">
                  <option>2박 3일</option>
                  <option>3박 4일</option>
                  <option>4박 5일</option>
                  <option>5박 6일</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gray-400" /> 선호 지역
                </label>
                <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-emerald">
                  <option>막탄 (휴양/리조트/액티비티 위주)</option>
                  <option>세부시티 (도심/쇼핑/밤문화 위주)</option>
                  <option>두 지역 모두 포함</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-gray-400" /> 여행 목적
                </label>
                <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-emerald">
                  <option>가족여행 (아이 동반)</option>
                  <option>가족여행 (부모님 동반)</option>
                  <option>친구들과의 우정여행</option>
                  <option>골프 투어</option>
                  <option>회사 워크숍/단합대회</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-gray-400" /> 인원수
                </label>
                <input 
                  type="number" 
                  min="2" max="30"
                  value={people} 
                  onChange={(e) => setPeople(e.target.value)} 
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-gray-400" /> 여행 페이스
                </label>
                <select value={pace} onChange={(e) => setPace(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-emerald">
                  <option>여유롭게 휴식 위주 (풀빌라에서 힐링)</option>
                  <option>적당히 섞인 밸런스형 (1일 1투어)</option>
                  <option>활동적이고 꽉 찬 일정 (호핑, 투어 필수)</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-brand-navy hover:bg-brand-emerald text-white font-bold py-4 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 mt-4 disabled:bg-gray-400"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> 
                    일정 생성 중...
                  </>
                ) : (
                  '맞춤형 일정 생성하기'
                )}
              </button>
            </form>
          </div>

          {/* Result */}
          <div className="lg:col-span-8">
            {itinerary ? (
              <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-inner min-h-[500px]">
                <div className="markdown-body prose prose-emerald prose-lg max-w-none prose-headings:text-brand-navy prose-a:text-brand-emerald">
                  <ReactMarkdown>{itinerary}</ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 border-dashed rounded-3xl h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 bg-brand-emerald/10 text-brand-emerald rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-gray-600 mb-2">어떤 여행을 원하시나요?</h4>
                <p className="text-gray-400 max-w-md">
                  좌측에서 원하시는 조건을 입력하고 '일정 생성하기' 버튼을 누르면 AI가 최적의 여행 일정을 만들어 드립니다.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
