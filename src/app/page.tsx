import { HeroSection } from "@/components/HeroSection";
import { HighlightsSection } from "@/components/HighlightsSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesGrid } from "@/components/ServicesGrid";
import { AssistModeSection } from "@/components/AssistModeSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HighlightsSection />
      <AboutSection />
      <ServicesGrid />
      <AssistModeSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
