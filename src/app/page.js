"use client";
import { useEffect, useState } from "react";
import ThreeScene from "../components/ThreeScene";
import LoadingScreen from "@/components/LoadingScreen";
import { useAssetLoading } from "@/hooks/useAssetLoading";
import ArtStudioModelViewer from "@/components/LandingPage";
import Header from "@/components/Header";

export default function HomePage() {
  const { assetsLoaded, progress } = useAssetLoading();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set initial value
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    // Listen for resize
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {!assetsLoaded && <LoadingScreen progress={progress} />}

      {/* Smooth transition between mobile and desktop */}
      <div
        style={{
          transition: "opacity 0.5s",
          opacity: isMobile ? 1 : 0,
          pointerEvents: isMobile ? "auto" : "none",
          position: isMobile ? "static" : "absolute",
          width: "100%",
          height: "100%",
        }}
      >
        {isMobile && <ArtStudioModelViewer />}
      </div>

      <div
        style={{
          transition: "opacity 0.5s",
          opacity: isMobile ? 0 : 1,
          pointerEvents: isMobile ? "none" : "auto",
        }}
      >
        {!isMobile && (
          <>
            <Header />
            <ThreeScene />
          </>
        )}
      </div>
    </>
  );
}
