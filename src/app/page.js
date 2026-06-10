import Banner from "@/home/Banner";
import CTASection from "@/home/CTASection";
import FeaturedJobs from "@/home/FeaturedJobs";
import FeaturesSection from "@/home/FeaturesSection";
import PricingPreview from "@/home/PricingPreview";
import StatsSection from "@/home/Stats";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <StatsSection />
      <FeaturedJobs />
      <FeaturesSection />
      <PricingPreview />
      <CTASection />
    </div>
  );
}
