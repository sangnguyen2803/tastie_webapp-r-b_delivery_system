import "./GuidePage.css";
import { useState } from "react";
import GuideBanner from "components/MerchantRegistration/GuidePage/GuideBanner";
import Tutorial from "components/MerchantRegistration/GuidePage/Tutorials/Tutorial";
import Footer from "components/Common/LayoutComponents/Footer/Footer";
import NavBar from "components/Common/LayoutComponents/NavBar/NavBar";
import ToolBar from "components/Common/LayoutComponents/Toolbar/Toolbar";
import BreadCrumbs from "components/Common/Breadcrumbs/Breadcrumbs";

function GuidePage() {
  return (
    <>
      <div className="guide-page">
        <NavBar />
        <div className="guide-page-containter">
          <BreadCrumbs />
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
