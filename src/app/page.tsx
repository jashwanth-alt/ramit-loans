import { Hero } from "@/components/hero/hero";
import { StatsSection } from "@/components/stats/stats-section";
import { PartnerMarquee } from "@/components/marquee/partner-marquee";
import { LoanCardsSection } from "@/components/loan-cards/loan-cards-section";
import { EmiHomeSection } from "@/components/sections/emi-home-section";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { TestimonialsCarousel } from "@/components/testimonials/testimonials-carousel";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <PartnerMarquee />
      <LoanCardsSection />
      <EmiHomeSection />
      <HowItWorks />
      <WhyChooseUs />
      <TestimonialsCarousel />
      <FaqSection />
      <FinalCta />
    </>
  );
}
