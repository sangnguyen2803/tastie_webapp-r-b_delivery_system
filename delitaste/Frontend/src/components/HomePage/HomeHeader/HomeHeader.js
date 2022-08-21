import "./HomeHeader.scss";
import { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
function HomeHeader(props) {
  const homeCategory = [
    {
      category_id: 1000002,
      category_name: "Appetizers",
      type: 1,
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/deals.png",
    },
    {
      category_id: 1000058,
      category_name: "Alcohol",
      type: 1,
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/alcohol.png",
    },
    {
      category_id: 1000045,
      category_name: "Specialty Foods",
      type: 1,
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/specialty_foods.jpg",
    },
    {
      category_id: 1000007,
      category_name: "Bento",
      type: 1,
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/japanese.png",
    },
    {
      category_id: 1000056,
      category_name: "Raw",
      type: 1,
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/sushi.png",
    },
    {
      category_id: 1000009,
      category_name: "Burgers",
      type: 1,
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/burger.png",
    },
    {
      category_id: 1000002,
      category_name: "Appetizers",
      type: 1,
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/deals.png",
    },
    {
      category_id: 1000058,
      category_name: "Alcohol",
      type: 1,
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/alcohol.png",
    },
    {
      category_id: 1000045,
      category_name: "Specialty Foods",
      type: 1,
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
      category_id: 1000019,
      category_name: "Dessert",
      type: 1,
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/sandwich.png",
    },
    {
      category_id: 1000030,
      category_name: "Healthy",
      type: 1,
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
