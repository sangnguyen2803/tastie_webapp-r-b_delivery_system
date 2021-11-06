import "./GuidePage.css";
import { useState } from "react";
import GuideBanner from "components/MerchantRegistration/GuidePage/GuideBanner";
import Tutorial from "components/MerchantRegistration/GuidePage/Tutorials/Tutorial";
import Footer from "components/Commons/LayoutComponents/Footer/Footer";
import NavBar from "components/Commons/LayoutComponents/NavBar/NavBar";
import ToolBar from "components/Commons/LayoutComponents/Toolbar/Toolbar";
import BreadCrumbs from "components/Commons/Breadcrumbs/Breadcrumbs";

function GuidePage() {
  return (
    <>
      <div className="guide-page">
        <NavBar />
        <div className="guide-page-containter">
          <GuideBanner />
          <Tutorial />
        </div>
        <Footer />
        <ToolBar />
      </div>
    </>
  );
}

export default GuidePage;
