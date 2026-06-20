import BioluminescentFluid from "@/components/effects/BioluminescentFluid";
import AmbientFX from "@/components/effects/AmbientFX";
import CustomCursor from "@/components/effects/CustomCursor";
import Navigation from "@/components/Navigation";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Timeline from "@/sections/Timeline";
import Projects from "@/sections/Projects";
import Reviews from "@/sections/Reviews";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

export default function App() {
  return (
    <>
      {/* Deep fluid background */}
      <BioluminescentFluid />
      <AmbientFX />
      <CustomCursor />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative z-10">
        <Hero />

        {/* Neon divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00E5FF]/30 to-transparent" />

        <About />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7B00AA]/30 to-transparent" />

        <Skills />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00E5FF]/30 to-transparent" />

        <Timeline />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00FF22]/30 to-transparent" />

        <Projects />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7B00AA]/30 to-transparent" />

        <Reviews />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00E5FF]/30 to-transparent" />

        <Contact />

        <Footer />
      </main>
    </>
  );
}
