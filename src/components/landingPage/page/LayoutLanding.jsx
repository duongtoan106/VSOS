import React from "react";
import WelcomePanel from "./WelcomePanel";
import CompanyProfile from "./CompanyProfile";
import WelcomeVSOS from "./WelcomeVSOS";
import Service from "./Service";
import Footer from "./FooterLanding";
import ShopService from "./ShopService";
import Reason from "./Reason";
import SOSForm from "./SOSForm";
import FooterLanding from "./FooterLanding";

export default function LayoutLanding() {
  return (
    <div>
      <WelcomeVSOS />
      <WelcomePanel />
      <CompanyProfile />
      <Service />
      <ShopService />
      <Reason />
      <SOSForm />
      <FooterLanding />
    </div>
  );
}
