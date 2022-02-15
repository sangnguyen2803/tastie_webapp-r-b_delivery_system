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

const providerGroup = [
  {
    group_title: "In a rush?",
    group_description: "Here’s the fastest delivery for you",
  },
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
    provider_id: 1,
    provider_name: "Burger King - Lyon Garibaldi Davinci",
    rating: "4.5",
    price_range: "3.49€-5.49€",
    cooking_time: "30 - 40 min",
    provider_photo:
      "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly9kMXJhbHNvZ25qbmczNy5jbG91ZGZyb250Lm5ldC9mNGNjYTcxNi0yYjcwLTQ4YWUtOWRjZS1lY2Q4ZjcxY2NmNjcuanBlZw==",
  },
  {
    provider_id: 2,
    provider_name: "KFC Lyon-Part Dieu",
    rating: "4.8",
    price_range: "3.49€-5.49€",
    cooking_time: "20 - 30 min",
    tag_name: "Free item (Spend €20)",
    provider_photo:
      "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly9kMXJhbHNvZ25qbmczNy5jbG91ZGZyb250Lm5ldC9mMTM4ZGU0MS1hYzU4LTQzMWMtYWQ2NC1kMzg0YWE1YzY4OWIuanBlZw==",
  },
  {
    provider_id: 3,
    provider_name: "Chamas Tacos - Lyon 5",
    rating: "4.5",
    price_range: "3.49€-5.49€",
    cooking_time: "10 - 15 min",
    provider_photo:
      "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly9kMXJhbHNvZ25qbmczNy5jbG91ZGZyb250Lm5ldC8wMWFkZmVmMC1kYzRhLTQ0ZDctYmNkNy1jYzk5NjZkZWIzZTYuanBlZw==",
  },
  {
    provider_id: 4,
    provider_name: "Tacos World - Terreaux",
    rating: "4.2",
    cooking_time: "5 - 15 min",
    price_range: "3.49€-5.49€",
    tag_name: "3 orders until €5 reward",
    provider_photo:
      "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly9kMXJhbHNvZ25qbmczNy5jbG91ZGZyb250Lm5ldC9iMmI0MGI4Zi00OGExLTQ2MWUtODA4MS04NWRhZjhhYmYyOTEuanBlZw==",
  },
  {
    provider_id: 5,
    provider_name: "Burger King - Lyon Garibaldi",
    rating: "3.8",
    cooking_time: "15 - 20 min",
    price_range: "3.49€-5.49€",
    provider_photo:
      "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly9kMXJhbHNvZ25qbmczNy5jbG91ZGZyb250Lm5ldC9mNGNjYTcxNi0yYjcwLTQ4YWUtOWRjZS1lY2Q4ZjcxY2NmNjcuanBlZw==",
  },
];
function HomeBodyContent(props) {
  return (
    <Fragment>
      <div className="home-content-provider">
        <ProductGroup
          groupTitle={providerGroup[0].group_title}
          groupDescription={providerGroup[0].group_description}
          providerList={nearbyProvider}
        />
        <ProductGroup
          groupTitle={providerGroup[1].group_title}
          groupDescription={providerGroup[1].group_description}
          providerList={nearbyProvider}
        />
        <ProductGroup
          groupTitle={providerGroup[2].group_title}
          groupDescription={providerGroup[2].group_description}
          providerList={nearbyProvider}
        />
        <ProductGroup
          groupTitle={providerGroup[3].group_title}
          groupDescription={providerGroup[3].group_description}
          providerList={nearbyProvider}
        />
      </div>
    </Fragment>
  );
}

export default HomeBodyContent;
