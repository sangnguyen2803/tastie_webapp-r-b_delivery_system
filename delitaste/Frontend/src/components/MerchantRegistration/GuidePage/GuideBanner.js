import "./GuideBanner.css";
import { useState } from "react";

function GuideBanner(props) {
  const [bannerContent, setBannerContent] = useState({
    subTitle: "Create your own business",
    title: "Grow your business on Tastie",
    description:
      "Tasite is an order and delivery management platform that instantly connects customers with your storefront. Built on the power of Tastie's network, we help merchants grow sales, reach more customers, and build their online brand.",
  });
  return (
    <div className="guide-banner">
      <div className="guide-banner-container">
        <div className="guide-banner-content">
          <span className="guide-sub-title">{bannerContent.subTitle}</span>
          <h1 className="guide-title">
            Grow your
            <br /> business on Tastie
          </h1>
          <p className="guide-description">{bannerContent.description}</p>
          <div className="btn-guide-wrapper">
            <button className="btn-guide-get-started">Get started</button>
            <button className="btn-guide-more-details">More Details</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuideBanner;
