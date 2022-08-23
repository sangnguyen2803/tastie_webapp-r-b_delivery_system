import "./HomeBanner.scss";
import { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faGlasses } from "@fortawesome/fontawesome-free-solid";
import Button from "components/Commons/Button/Button";
import { scroller } from "react-scroll";
function HomeBanner(props) {
  const homeBanner = [
    {
      banner_id: 1,
      banner_title: "Discover local favorites in your area",
      banner_redirect_text: "Tap to explore",
      banner_background:
        "https://cn-geo1.uber.com/static/mobile-content/eats/billboard-split-gratis.png",
      banner_text_color: "black",
      banner_link: "",
    },
    {
      banner_id: 2,
      banner_title: "30 days left of $0 Delivery Feesa",
      banner_content: "Enjoy $0 Delivery Fee on orders over $15 until Nov 10",
      banner_redirect_text: "See detail",
      banner_background:
        "https://d1g1f25tn8m2e6.cloudfront.net/6066cf54-f82f-4a8d-a5b9-f1d39d98757e.jpg",
      banner_text_color: "white",
      banner_link: "",
    },
  ];
  const scrollToSection = (sectionName) => {
    scroller.scrollTo(sectionName, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -100,
    });
  };
  return (
    <Fragment>
      <div className="homebody-container">
        <div className="homebody-wrapper">
          <div className="hb-title">
            <span className="hb-main-text">Crave it? Get it.</span>
            <span className="hb-sub-text">
              Search for a favorite restaurant, cuisine, or dish.
            </span>
            <Button
              buttonType="primary"
              width={130}
              height={36}
              radius={"0px"}
              label={"Explore now"}
              surfix={
                <FontAwesomeIcon
                  icon={faChevronRight}
                  style={{ color: "white" }}
                />
              }
              onClick={() => {
                scrollToSection(`provider-on-map`);
              }}
            />
            <span className="hb-sub-text-italic">
              100+ stores and restaurants are available for you to try, <br />
              <strong
                onClick={() => {
                  scrollToSection(`apro-home-product-slider-all`);
                }}
                style={{ color: "rgb(148, 0, 0)", cursor: "pointer" }}
              >
                check now
              </strong>
              .
            </span>
          </div>
          <div className="hb-banner-container">
            <div className="hb-banner-wrapper">
              {homeBanner.map((banner) => (
                <div
                  className="hb-banner-item"
                  key={banner.banner_id}
                  style={{
                    backgroundImage: `url(${banner.banner_background})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <span
                    className="hb-banner-item-banner-title"
                    style={{ color: `${banner.banner_text_color}` }}
                  >
                    {banner.banner_title}{" "}
                  </span>
                  {banner.banner_content && (
                    <span className="hb-banner-item-banner-content">
                      {banner.banner_content}
                    </span>
                  )}
                  <div className="hb-banner-item-redirect-text">
                    {banner.banner_redirect_text}
                    <FontAwesomeIcon
                      className="banner-redirect-icon"
                      icon={faChevronRight}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default HomeBanner;
