import "./SignContractForm.css";
import { useState } from "react";
import Footer from "components/Commons/LayoutComponents/Footer/Footer";
import NavBar from "components/Commons/LayoutComponents/NavBar/NavBar";
import BreadCrumbs from "components/Commons/Breadcrumbs/Breadcrumbs";

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
