import React, { Fragment, useState, useEffect } from "react";
import "./ApplyPromotion.scss";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getScheduleTime } from "store/actions/ProviderAction/ProviderAction";
import { getOrderPromotionDetailAPI } from "store/actions/OrderAction/OrderAction";

function ApplyPromotion(props) {
  const { user, promotions } = props;
  const [promotionType, setPromotionType] = useState(0);
  const [promotionInvalid, setPromotionInvalid] = useState(false);
  const [promotionSelected, setPromotionSelected] = useState(
    promotions[0]?.code || ""
  );
  return (
    <Fragment>
      <div className="schedule-order-container">
        <span className="sch-o-head-text">Pick a promotion</span>
        <div className="sch-o-dropdown-date-container">
          <div className="sch-o-select-label" style={{ width: 100 }}>
            Promotion:
          </div>
          <select
            className="sch-o-select-container"
            onChange={(e) => {
              setPromotionInvalid(false);
              if (e.target.value[0] === "P") setPromotionType(1);
              else setPromotionType(2);
              setPromotionSelected(e.target.value);
            }}
          >
            <option value="" disabled defaultChecked={true}>
              Select a promotion...
            </option>
            {promotions?.promotion?.map((p, index) => (
              <option
                value={p.code}
                key={index}
              >{`${p.code} - ${p.description}`}</option>
            ))}
            {promotions?.ecoupon?.map((p, index) => (
              <option
                value={p.code}
                key={index}
              >{`${p.code} - ${p.description}`}</option>
            ))}
          </select>
        </div>
        <div className="order-detail-promotion">
          <span>
            Order subtotal: <b>$ {props.orderForm.subtotal}</b>
          </span>
          <span>
            Delivery fee: <b>$ {props.orderForm.delivery_fee.toFixed(2)}</b>
          </span>
          {promotionSelected && (
            <Fragment>
              <span style={{ color: "red" }}>
                Promotion code: {promotionSelected}
              </span>
            </Fragment>
          )}
          {promotionInvalid && (
            <span style={{ color: "red" }}>
              Unable to apply this promotion code
            </span>
          )}
        </div>
        <ButtonGroup
          width={90}
          float={"flex-end"}
          mgTop={20}
          gap={30}
          mgBottom={10}
        >
          <Button
            color={"white"}
            bgColor={"black"}
            justifyContent={"center"}
            gap={"10px"}
            width={140}
            fontSize={13}
            height={30}
            label={"Select promotion"}
            onClick={() => {
              if (promotionType === 1) {
                let promo = promotions.promotion.filter(
                  (item) => item.code === promotionSelected
                )[0];
                setPromotionInvalid(true);
                props.setOrderForm((prevState) => ({
                  ...prevState,
                  promotion_code: promotionSelected,
                  ecoupon_code: "",
                }));
              } else if (promotionType === 2) {
                let promo = promotions.ecoupon.filter(
                  (item) => item.code === promotionSelected
                )[0];
                setPromotionInvalid(true);
                props.setOrderForm((prevState) => ({
                  ...prevState,
                  promotion_code: "",
                  ecoupon_code: promotionSelected,
                }));
              } else {
                return;
              }
              props.closeModal();
            }}
          />
        </ButtonGroup>
      </div>
    </Fragment>
  );
}

ApplyPromotion.propTypes = {
  user: PropTypes.object.isRequired,
  getOrderPromotionDetailAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});
export default withRouter(
  connect(mapStateToProps, { getOrderPromotionDetailAPI })(ApplyPromotion)
);
