import "./GuidePage.scss";
import GuideBanner from "components/MerchantRegistration/GuidePage/GuideBanner";
import Tutorial from "components/MerchantRegistration/GuidePage/Tutorials/Tutorial";
import Footer from "components/Commons/Layout/Footer/Footer";
import NavBar from "components/Commons/Layout/NavBar/NavBar";
import ToolBar from "components/Commons/Layout/Toolbar/Toolbar";

function GuidePage() {
  return (
    <>
      <div className="guide-page navbar-state">
        <NavBar fixed={true} />
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
