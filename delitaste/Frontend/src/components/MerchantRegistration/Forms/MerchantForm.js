import "./MerchantForm.scss";
import { Link } from "react-router-dom";
import Footer from "components/Commons/Layout/Footer/Footer";
import NavBar from "components/Commons/Layout/NavBar/NavBar";
import ToolBar from "components/Commons/Layout/Toolbar/Toolbar";
import MerchantBanner from "assets/merchant-form-banner.png";
import Stepper from "components/Commons/Stepper/Stepper";
const backgroundStyling = {
  background: `url(${MerchantBanner})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

function MerchantForm({ children }) {
  return (
    <div className="merchant-registration-page">
      <NavBar hideBreadcrumb={false} />
      <div
        className="merchant-registration-form-container"
        style={backgroundStyling}
      >
        <div className="merchant-registration-form-wrapper">
          <div className="merchant-registration-form">
            <Stepper />
            {children}
          </div>
        </div>
      </div>
      <Footer />
      <ToolBar />
    </div>
  );
}

export default MerchantForm;
