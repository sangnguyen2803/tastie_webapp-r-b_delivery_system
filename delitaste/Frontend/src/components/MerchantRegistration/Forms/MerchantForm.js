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
  const steps = [
    {
      description: "Service info",
      styling: "active",
    },
    {
      description: "Representative info",
      styling: "default",
    },
    {
      description: "Business unit info",
      styling: "default",
    },
    {
      description: "Product detail info",
      styling: "default",
    },
    {
      description: "Bank info",
      styling: "default",
    },
  ];
  return (
    <div className="merchant-registration-page navbar-state">
      <NavBar hideBreadcrumb={false} fixed={true} />
      <div
        className="merchant-registration-form-container"
        style={backgroundStyling}
      >
        <Stepper steps={steps} />
        <div className="merchant-registration-form-wrapper">
          <div className="merchant-registration-form">{children}</div>
        </div>
      </div>
      <Footer />
      <ToolBar />
    </div>
  );
}

export default MerchantForm;
