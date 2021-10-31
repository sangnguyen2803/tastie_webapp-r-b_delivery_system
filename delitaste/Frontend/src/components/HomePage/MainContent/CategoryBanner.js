import { Fragment } from "react";
import { Carousel } from "react-carousel-minimal";

function CategoryBanner({ cat_banner = [] }) {
  const data = [
    {
      image: cat_banner[0],
      caption: "San Francisco",
    },
    {
      image: cat_banner[1],
      caption: "Scotland",
    },
    {
      image: cat_banner[2],
      caption: "Darjeeling",
    },
    {
      image: cat_banner[3],
      caption: "San Francisco",
    },
    {
      image: cat_banner[4],
      caption: "Scotland",
    },
  ];

  const captionStyle = {
    fontSize: "1em",
  };
  const slideNumberStyle = {
    fontSize: "16px",
    fontWeight: "bold",
  };
  return (
    <Fragment>
      <div style={{ textAlign: "center" }}>
        <Carousel
          data={data}
          time={4000}
          width="100%"
          height="300px"
          captionStyle={captionStyle}
          radius="2px"
          slideNumberStyle={slideNumberStyle}
          captionPosition="bottom"
          automatic={true}
          dots={true}
          pauseIconColor="white"
          pauseIconSize="80px"
          slideBackgroundColor="darkgrey"
          slideImageFit="object-fit"
          thumbnails={true}
          thumbnailWidth="181px"
        />
      </div>
    </Fragment>
  );
}

export default CategoryBanner;
