import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Timeline from "@/sections/Timeline";
import Projects from "@/sections/Projects";
import Certificates from "@/sections/Certificates";
import Reviews from "@/sections/Reviews";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <main className="relative z-10">
      <Hero />

      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00E5FF]/30 to-transparent" />

      <About />

      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7B00AA]/30 to-transparent" />

      <Skills />

      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00E5FF]/30 to-transparent" />

      <Timeline />

      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00FF22]/30 to-transparent" />

      <Projects preview={true} />

      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7B00AA]/30 to-transparent" />

      <Certificates preview={true} />

      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#F5D800]/30 to-transparent" />

      <Reviews />

      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00E5FF]/30 to-transparent" />

      <Contact />

      <Footer />
    </main>
  );
}
