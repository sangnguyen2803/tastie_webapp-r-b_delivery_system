import "./SignContractForm.css";
import { useState } from "react";
import Footer from "components/Common/LayoutComponents/Footer/Footer";
import NavBar from "components/Common/LayoutComponents/NavBar/NavBar";
import BreadCrumbs from "components/Common/Breadcrumbs/Breadcrumbs";

function SignContractForm() {
  return (
    <>
      <div className="sign-contract-form">
        <NavBar />
        <div className="sign-contract-form-containter"></div>
        <Footer />
      </div>
    </>
  );
}

export default SignContractForm;
