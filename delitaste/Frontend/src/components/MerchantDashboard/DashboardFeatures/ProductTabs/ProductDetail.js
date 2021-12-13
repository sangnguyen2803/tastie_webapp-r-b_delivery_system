import { Fragment, useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faSort,
  faQuestionCircle,
} from "@fortawesome/fontawesome-free-solid";
import Button from "components/Commons/Button/Button";
import Metric from "../Metric/Metric";
import Picture1 from "assets/FoodImg/picture2.jpg";
import Picture2 from "assets/FoodImg/picture1.jpg";
import Picture3 from "assets/FoodImg/picture3.jpg";
import Picture4 from "assets/FoodImg/picture4.jpg";
import Picture5 from "assets/FoodImg/picture5.jpg";
import ProgressBar from "components/Commons/ProgressBar/ProgressBar";
import Tabs from "../Tabs";
const productList = [
  {
    id: 1,
    name: "Menu BBQ Cheese & Bacon",

    price: "2.50$",
    category: "Fast food",
    productStatus: 3,
    lastUpdated: "2021-05-13",
    picture: Picture1,
    description: "mfsaef",
  },
  {
    id: 2,
    name: "Pepperoni Pizza - Authentique Raclette (DE RETOUR)",
    price: "10.00$",
    category: "Fast food",
    productStatus: 2,
    lastUpdated: "2021-05-13",
    picture: Picture2,
    description: "mfsaef",
  },
  {
    id: 3,
    name: "P333 Authent",
    price: "5.00$",
    category: "Fast food",
    productStatus: 2,
    lastUpdated: "2021-05-13",
    picture: Picture3,
  },
  {
    id: 4,
    name: "Macha Shake",
    price: "10.00$",
    productStatus: 1,
    lastUpdated: "2021-05-13",
    picture: Picture4,
    description: "mfsaef",
  },
  {
    id: 5,
    name: "Fried Milk Chicken - Honey Butter",
    price: "12.00$",
    category: "Fast food",
    productStatus: 1,
    lastUpdated: "2021-05-13",
    picture: Picture5,
    description: "mfsaef",
  },
];

const ProductFilterTab = {
  filterTabs: [
    { id: 0, name: "All" },
    { id: 1, name: "Live" },
    { id: 2, name: "Sold out" },
    { id: 3, name: "Delisted" },
    { id: 4, name: "Search Results" },
  ],
};
function ProductDetail(props) {
  const [currentTab, setCurrentTab] = useState(0);
  const [products, setProducts] = useState(productList);
  const [searchResult, setSearchResult] = useState(productList);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let temp = Array.from(products);
    let [sourceData] = temp.splice(e.source.index, 1);
    temp.splice(e.destination.index, 0, sourceData);
    setProducts(temp);
  };
  return (
    <Fragment>
      <div className="double-panel-container">
        <div className="main-detail-panel-wrapper">
          <div className="panel-detail-title">Product Menu</div>
        </div>
        <div className="sub-detail-panel-wrapper">B</div>
      </div>
    </Fragment>
  );
}

export default ProductDetail;
