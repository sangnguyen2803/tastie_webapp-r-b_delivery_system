import { Fragment, useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faSort,
  faQuestionCircle,
  faSave,
} from "@fortawesome/fontawesome-free-solid";
import PropTypes from "prop-types";
import Button from "components/Commons/Button/Button";
import Metric from "../Metric/Metric";
import Picture1 from "assets/FoodImg/picture2.jpg";
import Picture2 from "assets/FoodImg/picture1.jpg";
import Picture3 from "assets/FoodImg/picture3.jpg";
import Picture4 from "assets/FoodImg/picture4.jpg";
import Picture5 from "assets/FoodImg/picture5.jpg";
import ProgressBar from "components/Commons/ProgressBar/ProgressBar";
import { getProductListAPI } from "store/actions/ProductAction/ProductAction";
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
    { id: 4, name: "Search Result" },
  ],
};
function ProviderGeneralInformation(props) {
  const [currentTab, setCurrentTab] = useState(0);
  const [products, setProducts] = useState(productList);
  const [searchResult, setSearchResult] = useState(productList);
  const [searchTerm, setSearchTerm] = useState("");
  const { user, provider, getProductListAPI } = props;
  useEffect(async () => {
    if (user.providerId !== -1 && user.providerId !== null) {
      const result = await getProductListAPI(user.providerId);
    }
  }, []);

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let temp = Array.from(products);
    let [sourceData] = temp.splice(e.source.index, 1);
    temp.splice(e.destination.index, 0, sourceData);
    setProducts(temp);
  };
  const filterSearchResult = (searchTerm) => {
    setCurrentTab(4);
    let result = productList;
    if (searchTerm.length !== 0)
      result = productList.filter((item) => item.name.includes(searchTerm));
    else setCurrentTab(0);
    setSearchResult(result);
  };
  const handleSelectTab = (value) => {
    setCurrentTab(value);
    let result = {};
    switch (value) {
      case 0:
        result = productList;
        break;
      case 1:
        result = productList.filter((item) => item.productStatus === 1);
        break;
      case 2:
        result = productList.filter((item) => item.productStatus === 2);
        break;
      case 3:
        result = productList.filter((item) => item.productStatus === 3);
        break;
      default:
        result = productList;
    }
    setSearchResult(result);
  };

  return (
    <Fragment>
      <div className="panel-detail-wrapper" style={{ marginTop: "0px" }}>
        <div className="panel-detail-title">Product Overview</div>
      </div>
    </Fragment>
  );
}

ProviderGeneralInformation.propTypes = {
  user: PropTypes.object.isRequired,
  provider: PropTypes.object.isRequired,
  getProductListAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  provider: state.ProviderReducer,
});

export default withRouter(
  connect(mapStateToProps, {
    getProductListAPI,
  })(ProviderGeneralInformation)
);
