import React, { useState, useEffect } from "react";
import Fragment from "react";
import "./SlideShow.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faPhone,
  faStar,
} from "@fortawesome/fontawesome-free-solid";

function SlideShow({ images = [], interval = 8000 }) {
  const [thumbnails, setThumnails] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [contentSlideInfo, setContentSlideInfo] = useState({
    title: "",
    content: "",
  });
  const [nextSlideStyle, setNextSlideStyle] = useState({
    slide1: { backgroundImage: "url('" + images[0] + "')" },
    slide2: { backgroundImage: "url('" + images[1] + "')" },
    slide3: { backgroundImage: "url('" + images[2] + "')" },
    slide4: { backgroundImage: "url('" + images[3] + "')" },
  });
  const [currentSlideStyle, setCurrentSlideStyle] = useState({
    backgroundImage: "url('" + images[0] + "')",
  });
  useEffect(() => {
    setThumnails(images);
    setContentSlideInfo({
      ...contentSlideInfo,
      title: "Tastie Delivery",
      content:
        "Tasite is an order and delivery management platform that instantly connects customers with your storefront. Built on the power of Tastie's network, we help merchants grow sales, reach more customers, and build their online brand.",
    });
    setCurrentSlideStyle({
      backgroundImage: "url('" + images[currentSlide] + "')",
    });
    const loop = setInterval(() => {
      if (currentSlide === images.length - 1) {
        setCurrentSlide(0);
      } else {
        setCurrentSlide(currentSlide + 1);
      }
    }, interval);
    return () => clearInterval(loop);
  }, [images, currentSlide, interval]);

  function previous() {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else {
      setCurrentSlide(thumbnails.length - 1);
    }
  }

  function next() {
    if (currentSlide === thumbnails.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  }
  //<span className="slideshow-header">Bring a smile to your meal!</span>
  return (
    <>
      <div className="slideshow-wrapper">
        <section className="slideshow">
          <span className="slide-name">
            <FontAwesomeIcon className="slide-name-icon" icon={faStar} />
            Tastie Delivery
          </span>
          <div className="slide-holder">
            <section className="slide current-slide">
              <div style={currentSlideStyle} className="slide-thumbnail"></div>

              <div className="slide-description">{contentSlideInfo.title}</div>
            </section>
            <div className="sub-slide-wrapper">
              <FontAwesomeIcon
                onClick={previous}
                className="slide-controller-icon-left prev-slide"
                icon={faChevronLeft}
              />
              <FontAwesomeIcon
                onClick={next}
                className="slide-controller-icon-right next-slide"
                icon={faChevronRight}
              />
            </div>
          </div>
          <div className="slide-content-wrapper">
            <div className="slide-content">{contentSlideInfo.content}</div>
            <button className="btn-order">
              <FontAwesomeIcon className="icon-order" icon={faPhone} />
              Explore now
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default SlideShow;
