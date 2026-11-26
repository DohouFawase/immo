import HeroSection from "@/components/home/contents/heroSection";
import PropertySection from "@/components/home/contents/PropertySection";
import {
  AgentCtaSection,
  BuyerGuideSection,
  ExploreSection,
  FaqSection,
  HowItWorksSection,
} from "@/components/home/contents/HomeSections";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PropertySection />
      <ExploreSection />
      <HowItWorksSection />
      <BuyerGuideSection />
      <FaqSection />
      <AgentCtaSection />
    </>
  );
}
