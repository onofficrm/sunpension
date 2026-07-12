import { PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="cebuvilla-hero relative w-full pt-28 pb-32 lg:pt-40 lg:pb-40 flex items-center justify-center overflow-hidden">
      {/* 배경 이미지 및 오버레이 */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1543731068-7e0f5beff43a?q=80&w=2070&auto=format&fit=crop" 
          alt="세부풀빌라에서 휴식하는 사람들" 
          className="w-full h-full object-cover object-center sm:object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 via-brand-navy/50 to-brand-navy/90"></div>
      </div>
      
      {/* 히로 콘텐츠 */}
      <div className="cebuvilla-hero-content relative z-10 text-center px-4 w-full max-w-5xl mx-auto flex flex-col items-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-block py-1.5 px-4 rounded-full bg-brand-emerald/90 backdrop-blur-md text-white text-xs sm:text-sm font-bold tracking-widest mb-6"
        >
          가족여행 · 친구모임 · 골프여행 · 워크숍 · 단체여행
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold font-serif text-white mb-6 leading-tight tracking-tight drop-shadow-2xl break-keep"
        >
          우리끼리 즐기는<br className="md:hidden" /> 세부 프라이빗 풀빌라
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-white/95 mb-10 max-w-2xl font-light drop-shadow-md leading-relaxed break-keep"
        >
          세부시티부터 막탄까지 인원과 여행 목적에 맞는 풀빌라를 쉽고 빠르게 찾아보세요.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 w-full sm:w-auto"
        >
          <a href="/bbs/board.php?bo_table=cebu" className="cebuvilla-btn-hero flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-base md:text-lg transition-all">
            세부시티 풀빌라 보기
          </a>
          <a href="/bbs/board.php?bo_table=mactan" className="cebuvilla-btn-hero flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-base md:text-lg transition-all">
            막탄 풀빌라 보기
          </a>
          <a href="#villa-consultation" className="cebuvilla-btn-hero-primary flex items-center justify-center gap-2 bg-brand-emerald hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-base md:text-lg transition-all shadow-xl hover:shadow-2xl sm:w-full md:w-auto mt-2 sm:mt-0">
            <PhoneCall className="w-5 h-5" />
            내 조건에 맞는 풀빌라 상담
          </a>
        </motion.div>
      </div>
    </section>
  );
}
