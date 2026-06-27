import { Routes, Route } from "react-router";
import CityBackground from "@/components/effects/CityBackground";
import AnimeGrid from "@/components/effects/AnimeGrid";
import AmbientFX from "@/components/effects/AmbientFX";
import CustomCursor from "@/components/effects/CustomCursor";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import ProjectsPage from "@/pages/ProjectsPage";
import CertificatesPage from "@/pages/CertificatesPage";

export default function App() {
  return (
    <>
      {/* Cyberpunk City Background */}
      <CityBackground />
      <AnimeGrid />
      <AmbientFX />
      <CustomCursor />

      {/* Navigation */}
      <Navigation />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/certificates" element={<CertificatesPage />} />
      </Routes>
    </>
  );
}
