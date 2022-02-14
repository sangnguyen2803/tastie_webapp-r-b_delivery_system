import "./HomeHeader.scss";
import { Fragment, useState, useEffect } from "react";

function HomeHeader(props) {
  const homeCategory = [
    {
      category_id: 1,
      category_name: "Deals",
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/deals.png",
    },
    {
      category_id: 2,
      category_name: "Alcohol",
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/alcohol.png",
    },
    {
      category_id: 3,
      category_name: "Specialty Foods",
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/specialty_foods.jpg",
    },
    {
      category_id: 4,
      category_name: "Japanese",
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/japanese.png",
    },
    {
      category_id: 5,
      category_name: "Sushi",
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/sushi.png",
    },
    {
      category_id: 6,
      category_name: "Burgers",
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/burger.png",
    },
    {
      category_id: 7,
      category_name: "Deals",
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/deals.png",
    },
    {
      category_id: 8,
      category_name: "Alcohol",
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/alcohol.png",
    },
    {
      category_id: 9,
      category_name: "Specialty Foods",
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/specialty_foods.jpg",
    },
    {
      category_id: 10,
      category_name: "Sushi",
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/sushi.png",
    },
    {
      category_id: 11,
      category_name: "Sushi",
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/sushi.png",
    },
    {
      category_id: 12,
      category_name: "Sushi",
      category_photo:
        "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/sushi.png",
    },
  ];
  return (
    <Fragment>
      <div className="homeheader-container">
        <div className="homeheader-category-wrapper">
          {homeCategory.map((category) => (
            <div
              className="homeheader-category-item"
              key={category.category_id}
            >
              <img className="hh-item-photo" src={category.category_photo} />
              <span className="hh-item-text">{category.category_name}</span>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default HomeHeader;
