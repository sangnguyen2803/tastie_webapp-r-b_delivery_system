import React, { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  faPlus,
  faMinus,
  faExpand,
  faCompress,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/fontawesome-free-solid";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import "./PDProductDetail.scss";

function PDProductDetail(props) {
  const { provider, user, match } = props;
  const [productItem, setProductItem] = useState(props.productItem);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(productItem.price);
  const [additionalOption, setAdditionalOption] = useState([]);
  const [heightViewPort, setHeightViewPort] = useState(180);
  const [isViewPortExpanded, setIsViewPortExpanded] = useState(false);
  const heightForExpansion = 120;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  const addToCart = () => {
    const cart = {
      providerId: match.params.id,
      status: 1,
      date: "2022-01-25T00:11:09.000Z",
      cartItem: {
        productId: productItem.product_id,
        productName: productItem.product_name,
        productImage: productItem.product_image,
        productPrice: productItem.price,
        additionalOption: additionalOption,
        quantity: quantity,
        totalPrice: totalPrice,
      },
    };
    console.log(cart);
    props.setShowProductDetail(false);
  };

  const onValueChange = (event, price) => {
    let additionalOptionItem = {
      optionName: event.target.name,
      value: event.target.value,
      price: price,
    };
    additionalOption.push(additionalOptionItem);
    setTotalPrice(totalPrice + price);
  };
  return (
    <Fragment>
      <div className="pd-pr-d-header" style={{ height: `${heightViewPort}px` }}>
        <img className="pd-pr-d-image" src={productItem.product_image} />
        <div
          className="pd-pr-d-icon-abs-wrapper"
          style={{ marginTop: `calc(${heightViewPort}px - 30px)` }}
          onClick={() => {
            !isViewPortExpanded
              ? setHeightViewPort(180 + heightForExpansion)
              : setHeightViewPort(180);
            setIsViewPortExpanded((prev) => !prev);
          }}
        >
          <FontAwesomeIcon
            className="pd-pr-d-icon-abs"
            icon={!isViewPortExpanded ? faExpand : faCompress}
          />
        </div>
      </div>
      <div
        className="pd-pr-d-body"
        style={{
          height: !isViewPortExpanded
            ? "350px"
            : `${350 - heightForExpansion}px`,
        }}
      >
        <div className="pd-pr-d-main-text">{productItem.product_name}</div>
        <div className="pd-pr-d-sub-text">{productItem.description}</div>
        <div
          className="pd-pr-option-box-container"
          style={{
            height: isViewPortExpanded ? "130px" : `${130 + heightViewPort}px`,
          }}
        >
          {productItem.product_options.map(
            (option) =>
              option.option_name && (
                <Fragment>
                  <div className="option-box-wrapper">
                    <div className="option-question">
                      <div className="option-box-title-wrapper-1">
                        <span className="option-box-title-main">
                          {option.option_name}
                        </span>
                        <span className="option-box-title-sub">Required</span>
                      </div>
                      <div className="option-box-show-more-icon">
                        <FontAwesomeIcon icon={faChevronDown} />
                      </div>
                    </div>
                    <div className="homebody-sb-radio-detail-wrapper">
                      {option.options.map((item) => (
                        <div className="option-answer ">
                          <label className="hb-sb-type-wrapper radio">
                            <input
                              type="radio"
                              name={option.option_name}
                              value={item.value}
                              onChange={(event) =>
                                onValueChange(event, item.price)
                              }
                            />
                            <span className="hb-sb-label-radio option-box-radio-label">
                              {item.value}
                            </span>
                            <span className="option-price">
                              {item.price != 0 && `+ $${item.price}.00`}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </Fragment>
              )
          )}
        </div>
      </div>
      <div className="pd-pr-d-footer">
        <div className="pd-pl-quantity-btn-open">
          <FontAwesomeIcon
            icon={faMinus}
            className="inc-des-button-open-left"
          />
          <input
            className="inc-des-value"
            type="number"
            id="number"
            value="1"
          />
          <FontAwesomeIcon
            icon={faPlus}
            className="inc-des-button-open-right"
          />
        </div>
        <Button
          color={"white"}
          bgColor={"black"}
          justifyContent={"center"}
          gap={"10px"}
          width={140}
          fontSize={13}
          height={35}
          label={"Add to order"}
          onClick={addToCart}
        />
      </div>
    </Fragment>
  );
}

PDProductDetail.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(connect(mapStateToProps, null)(PDProductDetail));
//<FontAwesomeIcon className="pd-pr-d-icon-abs-compress" icon={faCompress} />
