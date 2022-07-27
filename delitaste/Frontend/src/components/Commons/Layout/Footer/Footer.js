import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Logo from "assets/logo.png";
import { faMapMarkerAlt } from "@fortawesome/fontawesome-free-solid";
import { useTranslation } from "react-i18next";
import "./Footer.scss";

function Footer(props) {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className="footer-wrapper">
        <div className="foooter-detail-wrapper">
          <div className="footer-detail">
            <div className="footer-detail-header">Explore</div>
            <div className="footer-detail-item-wrapper">Pick for you</div>
            <div className="footer-detail-item-wrapper">Best-seller</div>
            <div className="footer-detail-item-wrapper">Today's order</div>
            <div className="footer-detail-item-wrapper">In a rush</div>
            <div className="footer-detail-item-wrapper">Orders near you</div>
          </div>
          <div className="footer-detail">
            <div className="footer-detail-header">New Business</div>
            <div className="footer-detail-item-wrapper">
              Merchant registration
            </div>
            <div className="footer-detail-item-wrapper">Merchant dashboard</div>
            <div className="footer-detail-item-wrapper">Parnership</div>
            <div className="footer-detail-item-wrapper">Advertisement</div>
            <div className="footer-detail-item-wrapper">Sponsorship</div>
          </div>
          <div className="footer-detail">
            <div className="footer-detail-header">Visit</div>
            <div className="footer-detail-item-wrapper">
              <FontAwesomeIcon className="footer-icon" icon={faMapMarkerAlt} />
              <span className="footer-item-text">
                227 Nguyễn Văn Cừ, Dist. 5, HCMC
              </span>
            </div>
            <div className="footer-detail-item-wrapper">
              <FontAwesomeIcon className="footer-icon" icon={faMapMarkerAlt} />
              <span className="footer-item-text">
                227 Nguyễn Văn Cừ, Dist. 5, HCMC{" "}
              </span>
            </div>
          </div>

          <div className="footer-detail">
            <div className="footer-detail-header">Legals</div>
            <div className="footer-detail-item-wrapper">Terms of use</div>
            <div className="footer-detail-item-wrapper">Privacy Policy</div>
          </div>
        </div>
        <div className="tail-footer"></div>
      </div>
      <div className="sub-footer-wrapper">
        <div className="head-footer">
          Tastie Delivery - Copyright &copy; Ho Chi Minh University of Science
        </div>
      </div>
    </>
  );
}

export default Footer;
