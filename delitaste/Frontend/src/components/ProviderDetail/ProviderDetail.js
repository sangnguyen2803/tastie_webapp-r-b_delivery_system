import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import NavBar from "../Commons/Layout/NavBar/NavBar";
import Footer from "../Commons/Layout/Footer/Footer";
import React, { Fragment, useState, useEffect } from "react";
import ToolBar from "../Commons/Layout/Toolbar/Toolbar";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import {
  faClock,
  faHeart as faHeart2,
  faMapMarkerAlt,
  faStar,
  faCalendarPlus,
  faComment,
} from "@fortawesome/fontawesome-free-solid";
import { faHeart as faHeart1 } from "@fortawesome/fontawesome-free-regular";
import Background from "assets/home_banner.png";
import "./ProviderDetail.scss";
import PDHeader from "components/ProviderDetail/PDHeader/PDHeader";
import PDBody from "components/ProviderDetail/PDBody/PDBody";
import { getProductListAPI } from "store/actions/ProductAction/ProductAction";

function ProviderDetail(props) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const providerInfo = {
    provider_id: 1,
    address:
      "KP.3 Centana, 36 Mai Chi Tho, An Phu Ward,  District 2, Ho Chi Minh City",
    provider_name: "Burger King - Lyon Garibaldi Davinci",
    rating: "4.5",
    rating_total: "59",
    price_range: "3.49€-5.49€",
    cooking_time: "30 - 40 min",
    dietary: "Alergy-friendly",
    provider_photo:
      "https://d1ralsognjng37.cloudfront.net/02f41a01-e3e0-42ff-be63-b65c393270b5.jpeg",
  };
  const { product, user } = props;
  const [items, setItems] = useState(product.productList || []);
  useEffect(async () => {
    if (product.productList.length !== 0) return;
    const productList = await props.getProductListAPI(props.match.params?.id);
    setItems([...productList]);
  }, []);

  return (
    <Fragment>
      <NavBar fixed={true} />
      <div className="main">
        <PDHeader item={providerInfo} />
        <PDBody products={items} setProducts={setItems} />
      </div>
      <Footer />
      <ToolBar />
    </Fragment>
  );
}

ProviderDetail.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  getProductListAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  connect(mapStateToProps, { getProductListAPI })(ProviderDetail)
);
