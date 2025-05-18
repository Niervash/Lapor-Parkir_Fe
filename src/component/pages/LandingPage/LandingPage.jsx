import React from "react";
import { HeaderSection } from "../../Section/LandingPage/Header/HeaderSection";
import { HomeSection } from "../../Section/LandingPage/Home/HomeSection";
import { AboutSection } from "../../Section/LandingPage/About/AboutSection";
import { StatsSection } from "../../Section/LandingPage/Stats/StatsSection";
import { TryAppSection } from "../../Section/LandingPage/TryApp/TryAppSection";
import { FooterSection } from "../../Section/LandingPage/Footer/FooterSection";

export const LandingPage = () => {
  return (
    <div>
      <HeaderSection />
      <HomeSection />
      <AboutSection />
      <StatsSection />
      <TryAppSection />
      <FooterSection />
    </div>
  );
};
