import {
  faArrowLeft,
  faArrowRight,
  faChevronCircleLeft,
} from "@fortawesome/fontawesome-free-solid";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";

const CustomButtonGroup = ({ next, previous, carouselState, children }) => {
  const { totalItems, currentSlide, slidesToShow } = carouselState;
  return (
    <Fragment>
      <div className="cbg-header" style={{ position: "relative" }}>
        {children}
        <div className="custom-button-group">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={
              currentSlide !== 0
                ? "carousel-icon-visible"
                : "carousel-icon-no-click"
            }
            onClick={() => previous()}
          />
          <FontAwesomeIcon
            icon={faArrowRight}
            className={
              currentSlide !== totalItems - slidesToShow
                ? "carousel-icon-visible"
                : "carousel-icon-no-click"
            }
            onClick={() => next()}
          />
        </div>
      </div>
    </Fragment>
  );
};

export { CustomButtonGroup };
