import "./GuidePage.css";
import { useState } from "react";
import GuideBanner from "components/MerchantRegistration/GuidePage/GuideBanner";
import Tutorial from "components/MerchantRegistration/GuidePage/Tutorials/Tutorial";
import Footer from "components/Common/Footer/Footer";
import NavBar from "components/Common/NavBar/NavBar";
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
      </div>
    </>
  );
}

export default GuidePage;
