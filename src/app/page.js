"use client";
import ThreeScene from "../components/ThreeScene";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import HollowCylinder from "@/components/Collabration";
import AlumniSection from "@/components/Alumni";
import Gallery from "@/components/Gallery";
import CylindricalGallery from "@/components/Gallery";
import { Cylindrical } from "three";
import ImageScroll from "@/components/imageScroll";
import PaintingWing from "@/components/paintingwing";
import { useAssetLoading } from "@/hooks/useAssetLoading";
import Navbar from "@/components/BitSindri/Navbar";

//dynamically import the model viewer component
const ModelViewer = dynamic(() => import("../components/ModelViewer"), {
  ssr: false,
});

export default function HomePage() {
  const { assetsLoaded, progress } = useAssetLoading();

  return (
    <>
      {!assetsLoaded && <LoadingScreen progress={progress} />}
      {/* <Navbar /> */}
      <Header />
      <ThreeScene />

    </>
  );
}
