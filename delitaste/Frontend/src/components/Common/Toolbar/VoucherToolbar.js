import React, { useState, useEffect } from "react";
import Fragment from "react";
import VoucherNotification from "../../../assets/Voucher.png";
import "./Toolbar.css";
function VoucherToolBar(props) {
  return (
    <>
      <div className="voucher-toolbar-container">
        <img src={VoucherNotification} />
      </div>
    </>
  );
}

export default VoucherToolBar;
