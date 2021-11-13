import "./GuideBanner.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

import MerchantBanner from "assets/Banner/merchant-ads.jpg";

const backgroundStyling = {
  background: `url(${MerchantBanner})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

function GuideBanner(props) {
  const [bannerContent, setBannerContent] = useState({
    subTitle: "Create your own business",
    title: "Grow your business on Tastie",
    description:
      "Tasite is an order and delivery management platform that instantly connects customers with your storefront. Built on the power of Tastie's network, we help merchants grow sales, reach more customers, and build their online brand.",
  });
  return (
    <div className="guide-banner" style={backgroundStyling}>
      <div className="guide-banner-container">
        <div className="guide-banner-content">
          <span className="guide-sub-title">{bannerContent.subTitle}</span>
          <h1 className="guide-title">
            Grow your
            <br /> business on Tastie
          </h1>
          <p className="guide-description">{bannerContent.description}</p>
          <div className="btn-guide-wrapper">
            <Link to="/merchant-registration/sign-contract">
              <button className="btn-guide-get-started">Get started</button>
            </Link>
            <button
              className="btn-guide-more-details"
              onClick={() => {
                window.scrollTo({ top: 550, behavior: "smooth" });
              }}
            >
              More Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuideBanner;
