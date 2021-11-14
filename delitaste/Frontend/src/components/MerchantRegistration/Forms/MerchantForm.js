import "./MerchantForm.scss";
import { Link } from "react-router-dom";
import Footer from "components/Commons/LayoutComponents/Footer/Footer";
import NavBar from "components/Commons/LayoutComponents/NavBar/NavBar";
import Contract from "assets/pdf/contract.pdf";
import ToolBar from "components/Commons/LayoutComponents/Toolbar/Toolbar";
import ServiceInfoForm from "components/MerchantRegistration/Forms/DetailMerchantForm/ServiceInfoForm";
import MerchantBanner from "assets/merchant-form-banner.png";
import FormBanner from "assets/Banner/merchant-form-banner.png";

const backgroundStyling = {
  background: `url(${MerchantBanner})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

function ServiceInformationForm() {
  return (
    <div className="merchant-registration-page">
      <NavBar hideBreadcrumb={false} />
      <div className="merchant-registration-form-container">
        <div className="merchant-registration-form-wrapper">
          <div className="merchant-registration-form">
            <div className="form-banner-wrapper">
              <span className="merchant-registration-header-title">
                Service Basic Info
              </span>
            </div>
            <ServiceInfoForm />
            <div className="btn-merchant-registration-wrapper">
              <Link to="/merchant-registration">
                <button className="btn-merchant-registration-back">Back</button>
              </Link>
              <Link to="/merchant-registration/create-shop">
                <button className="btn-merchant-registration-next">
                  Agree
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToolBar />
    </div>
  );
}

export default ServiceInformationForm;
