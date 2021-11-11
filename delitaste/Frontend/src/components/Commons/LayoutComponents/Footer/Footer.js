import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Logo from "assets/logo.png";
import { faMapMarkerAlt } from "@fortawesome/fontawesome-free-solid";
import { useTranslation } from "react-i18next";
import "./Footer.css";

function Footer(props) {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className="footer-wrapper">
        <div className="head-footer">
          <img className="footer-logo" src={Logo} />
          <input
            type="text"
            className="email-subcribe-text-box"
            placeholder="Leave your email for more information"
          />
        </div>
        <div className="foooter-detail-wrapper">
          <div className="footer-detail">
            <div className="footer-detail-header">Explore</div>
            <div className="footer-detail-item-wrapper">Home</div>
            <div className="footer-detail-item-wrapper">Best-seller</div>
            <div className="footer-detail-item-wrapper">Products</div>
            <div className="footer-detail-item-wrapper">About</div>
            <div className="footer-detail-item-wrapper">Contact</div>
          </div>
          <div className="footer-detail">
            <div className="footer-detail-header">New Business</div>
            <div className="footer-detail-item-wrapper">Create a shop</div>
            <div className="footer-detail-item-wrapper">Membership</div>
            <div className="footer-detail-item-wrapper">Parnership</div>
            <div className="footer-detail-item-wrapper">Advertisement</div>
            <div className="footer-detail-item-wrapper">Sponsorship</div>
          </div>
          <div className="footer-detail">
            <div className="footer-detail-header">Visit</div>
            <div className="footer-detail-item-wrapper">
              <FontAwesomeIcon className="footer-icon" icon={faMapMarkerAlt} />
              <span className="footer-item-text">
                543/65 Nguyen Dinh Chieu, district 3, Ho Chi Minh city
              </span>
            </div>
            <div className="footer-detail-item-wrapper">
              <FontAwesomeIcon className="footer-icon" icon={faMapMarkerAlt} />
              <span className="footer-item-text">
                543/65 Nguyen Dinh Chieu, district 3, Ho Chi Minh city
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
        <div className="head-footer">Footer</div>
      </div>
    </>
  );
}

export default Footer;
