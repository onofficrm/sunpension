import Hero from '../components/Hero';
import ItineraryPlanner from '../components/ItineraryPlanner';
import TrustPoints from '../components/TrustPoints';
import FeaturedVillas from '../components/FeaturedVillas';
import RegionComparison from '../components/RegionComparison';
import ConsultBanner from '../components/ConsultBanner';
import PurposeRecommendation from '../components/PurposeRecommendation';
import ReservationProcess from '../components/ReservationProcess';
import FAQSection from '../components/FAQSection';
import TravelDiary from '../components/TravelDiary';
import NewsSection from '../components/NewsSection';
import NoticeBoard from '../components/NoticeBoard';
import FreeBoardBanner from '../components/FreeBoardBanner';
import InfoSection from '../components/InfoSection';
import ConsultationForm from '../components/ConsultationForm';

export default function MainPage() {
  return (
    <>
      <Hero />
      <ItineraryPlanner />
      <TrustPoints />
      <FeaturedVillas />
      <RegionComparison />
      <ConsultBanner />
      <PurposeRecommendation />
      <ReservationProcess />
      <FAQSection />
      <TravelDiary />
      
      <section className="cebuvilla-community bg-brand-beige py-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <NewsSection />
            <NoticeBoard />
          </div>
          <FreeBoardBanner />
        </div>
      </section>

      <InfoSection />
      
      <ConsultationForm />
    </>
  );
}
