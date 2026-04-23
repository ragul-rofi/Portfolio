import { useState } from "react";
import LoadingAnimation from "./components/LoadingAnimation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import BlogSection from "./components/BlogSection";
import ContactSection from "./components/ContactSection";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingAnimation onComplete={() => setIsLoading(false)} />}
      <div className="bg-[#F5F5F5] min-h-screen">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
      </div>
    </>
  );
}