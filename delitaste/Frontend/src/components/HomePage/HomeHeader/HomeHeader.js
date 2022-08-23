import "./HomeHeader.scss";
import { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
function HomeHeader(props) {
  const homeCategory = [
    {
      category_id: 1000003,
      category_name: "Canadian",
      type: 2,
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/deals.png",
    },
    {
      category_id: 1000013,
      category_name: "Korean",
      type: 2,
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/alcohol.png",
    },
    {
      category_id: 1000008,
      category_name: "French",
      type: 2,
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/specialty_foods.jpg",
    },
    {
      category_id: 1000009,
      category_name: "German",
      type: 2,
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/japanese.png",
    },
    {
      category_id: 1000012,
      category_name: "Italian",
      type: 2,
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/sushi.png",
    },
    {
      category_id: 1000015,
      category_name: "Mediterraneans",
      type: 2,
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/burger.png",
    },
    {
      category_id: 1000019,
      category_name: "Portuguese",
      type: 2,
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/deals.png",
    },
    {
      category_id: 1000011,
      category_name: "India",
      type: 2,
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/alcohol.png",
    },
    {
      category_id: 1000014,
      category_name: "Latin-fusion",
      type: 2,
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/specialty_foods.jpg",
    },
    {
      category_id: 1000000,
      category_name: "American",
      type: 2,
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/american.png",
    },
    {
      category_id: 1000020,
      category_name: "Shanghai",
      type: 2,
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/sandwich.png",
    },
    {
      category_id: 1000010,
      category_name: "Halal",
      type: 2,
      category_photo:
        "https://duyt4h9nfnj50.cloudfront.net/new_search_home_eats_icon/Healthy_BrowseHome@3x.png",
    },
  ];
  return (
    <Fragment>
      <div className="homeheader-container">
        <div className="homeheader-category-wrapper">
          {homeCategory.map((category, index) => (
            <div
              className="homeheader-category-item"
              key={index}
              onClick={() => {
                props.history.push(
                  `/search?q=&type=3&category-type=${category.type}&category-id=${category.category_id}`
                );
              }}
            >
              <img
                className="hh-item-photo"
                src={category.category_photo}
                alt={"category_image"}
              />
              <span className="hh-item-text">{category.category_name}</span>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default withRouter(HomeHeader);
