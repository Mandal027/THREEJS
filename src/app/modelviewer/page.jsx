"use client";

import { useState, useEffect } from "react";
import ModelViewer from "@/components/ModelViewer";
import LoadingScreen from "@/components/LoadingScreen";
// import Navbar from "@/components/Induction/Navbar";
import Navbar from "@/components/BitSindri/Navbar";

export default function ModelViewers() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to listen for all model-viewer load events
    const handleModelsLoaded = () => {
      let loadedModels = 0;
      const totalModels = 4; // Total number of model-viewer elements

      const onLoad = () => {
        loadedModels++;
        if (loadedModels === totalModels) {
          setIsLoading(false);
        }
      };

      // Get all model-viewer elements
      const modelViewers = document.querySelectorAll("model-viewer");
      modelViewers.forEach((viewer) => {
        viewer.addEventListener("load", onLoad);
      });

      // Cleanup function
      return () => {
        const modelViewers = document.querySelectorAll("model-viewer");
        modelViewers.forEach((viewer) => {
          viewer.removeEventListener("load", onLoad);
        });
      };
    };

    // Call the function after component mounts
    const cleanup = handleModelsLoaded();
    return cleanup;
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Navbar/>
      <ModelViewer />
    </>
  );
}
