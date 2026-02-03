import HeroSection from "@/components/home/HeroSection";
import PhoneMockups from "@/components/home/PhoneMockups";
import WhySection from "@/components/home/WhySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import StatsSection from "@/components/home/StatsSection";
import FinalCTA from "@/components/home/FinalCTA";
import { getSiteSettings } from "@/lib/data";

export default async function Home() {
    const siteSettings = await getSiteSettings();

    return (
        <>
            <HeroSection hero={siteSettings} />
            {(siteSettings.showPhoneMockups) && <PhoneMockups />}
            {/* {(siteSettings.showWhy) && <WhySection />} */}
            {(siteSettings.showTestimonials) && <TestimonialsSection />}
            {(siteSettings.showStats) && <StatsSection />}
            <FinalCTA />
        </>
    );
}
