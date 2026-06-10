import Banner from "@/home/Banner";
import FeaturedJobs from "@/home/FeaturedJobs";
import StatsSection from "@/home/Stats";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Banner></Banner>
      <StatsSection></StatsSection>
      <FeaturedJobs></FeaturedJobs>
    </div>
  );
}
