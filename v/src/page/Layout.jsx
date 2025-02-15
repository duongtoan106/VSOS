import React from "react";
import WelcomePanel from "./WelcomePanel";
import CompanyProfile from "./CompanyProfile";
import WelcomeVSOS from "./WelcomeVSOS";
import Service from "./Service";
import Footer from "./Footer";
import ShopService from "./ShopService";
import Reason from "./Reason";
import SOSForm from "./SOSForm";

export default function Layout() {
  return (
    <div>
      <WelcomeVSOS />
      <WelcomePanel />
      <CompanyProfile />
      <Service />
      <ShopService />
      <Reason />
      <SOSForm />
      <Footer />
    </div>
  );
}
