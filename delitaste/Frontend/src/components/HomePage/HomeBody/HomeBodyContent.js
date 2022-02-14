import "./HomeBody.scss";
import { Fragment, useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductGroup from "components/HomePage/HomeBody/ProductGroup";
import { CustomButtonGroup } from "./CustomButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faInfoCircle } from "@fortawesome/fontawesome-free-solid";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const productGroup = [
  {
    group_title: "Orders near you",
    group_description: "Your neighborhood’s latest orders",
  },
  {
    group_title: "Today's offers",
    group_description: "",
  },
  {
    group_title: "Popular near you",
    group_description: "",
  },
  {
    group_title: "Double the Savings",
    group_description: "",
  },
];

const nearbyProvider = [
  {
    product_id: 1,
    product_name: "Burger King - Lyon Garibaldi",
    product_photo:
      "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly9kMXJhbHNvZ25qbmczNy5jbG91ZGZyb250Lm5ldC9mNGNjYTcxNi0yYjcwLTQ4YWUtOWRjZS1lY2Q4ZjcxY2NmNjcuanBlZw==",
  },
  {
    product_id: 2,
    product_name: "KFC Lyon-Part Dieu",
    product_photo:
      "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly9kMXJhbHNvZ25qbmczNy5jbG91ZGZyb250Lm5ldC9mMTM4ZGU0MS1hYzU4LTQzMWMtYWQ2NC1kMzg0YWE1YzY4OWIuanBlZw==",
  },
  {
    product_id: 3,
    product_name: "Chamas Tacos - Lyon 5",
    product_photo:
      "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly9kMXJhbHNvZ25qbmczNy5jbG91ZGZyb250Lm5ldC8wMWFkZmVmMC1kYzRhLTQ0ZDctYmNkNy1jYzk5NjZkZWIzZTYuanBlZw==",
  },
  {
    product_id: 4,
    product_name: "Tacos World - Terreaux",
    product_photo:
      "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly9kMXJhbHNvZ25qbmczNy5jbG91ZGZyb250Lm5ldC9iMmI0MGI4Zi00OGExLTQ2MWUtODA4MS04NWRhZjhhYmYyOTEuanBlZw==",
  },
  {
    product_id: 5,
    product_name: "Burger King - Lyon Garibaldi",
    product_photo:
      "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly9kMXJhbHNvZ25qbmczNy5jbG91ZGZyb250Lm5ldC9mNGNjYTcxNi0yYjcwLTQ4YWUtOWRjZS1lY2Q4ZjcxY2NmNjcuanBlZw==",
  },
];
function HomeBodyContent(props) {
  return (
    <Fragment>
      <div className="home-content-provider">
        <ProductGroup
          groupTitle={productGroup[0].group_title}
          groupDescription={productGroup[0].group_description}
          productList={nearbyProvider}
        />
        <ProductGroup
          groupTitle={productGroup[1].group_title}
          groupDescription={productGroup[1].group_description}
          productList={nearbyProvider}
        />
        <ProductGroup
          groupTitle={productGroup[2].group_title}
          groupDescription={productGroup[2].group_description}
          productList={nearbyProvider}
        />
        <ProductGroup
          groupTitle={productGroup[3].group_title}
          groupDescription={productGroup[3].group_description}
          productList={nearbyProvider}
        />
      </div>
    </Fragment>
  );
}

export default HomeBodyContent;
