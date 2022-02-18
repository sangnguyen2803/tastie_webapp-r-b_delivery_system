import { withRouter } from "react-router-dom";
import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import NavBar from "../../Commons/Layout/NavBar/NavBar";
import Footer from "../../Commons/Layout/Footer/Footer";
import React, { Fragment, useState, useEffect } from "react";
import ToolBar from "../../Commons/Layout/Toolbar/Toolbar";
import VoucherToolBar from "../../Commons/Layout/Toolbar/VoucherToolbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import { useRef } from "react";
import {
  faHeart as faHeart2,
  faBars,
  faPlus,
} from "@fortawesome/fontawesome-free-solid";
import Modal from "components/Commons/Overlay/Popup/Modal/Modal";
import PDProductDetail from "./PDProductDetail/PDProductDetail";
import "../ProviderDetail.scss";

function PDBody(props) {
  const [products, setProducts] = useState(props.item);
  const [showProductDetail, setShowProductDetail] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  return (
    <Fragment>
      <div className="p-d-body-container">
        <div className="pd-sb-menu-category-container">
          <span className="pd-sb-menu-title">
            <FontAwesomeIcon className="pd-sb-icon" icon={faBars} />
            <span>Menu</span>
          </span>
          <div className="pd-sb-menu-category">
            {products.map((product) => (
              <Fragment>
                <span className="pd-sb-menu-item">
                  {product.menu_category_name}
                </span>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="pd-pl-product-list">
          {products.map((menu) => (
            <Fragment>
              <div className="pd-pl-title">{menu.menu_category_name}</div>
              <div className="pd-pl-product-group">
                {menu.products.map((product) => (
                  <div className="pd-pl-product-item" key={product.product_id}>
                    <div className="pd-pl-img-wrapper">
                      <img
                        className="pd-pl-product-img"
                        src={product.product_image}
                      />
                    </div>
                    <div className="pd-pl-quantity-btn">
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="inc-des-button"
                        onClick={() => setShowProductDetail(true)}
                      />
                    </div>
                    <span className="pd-pl-text">{product.product_name}</span>
                    <span className="pd-pl-sub-text">{product.price} VNĐ</span>
                  </div>
                ))}
              </div>
              <Modal
                isOpen={showProductDetail}
                title={"Product Detail"}
                width={40}
                height={500}
                close={() => {
                  setShowProductDetail(false);
                }}
              ></Modal>
            </Fragment>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default withRouter(PDBody);

/*
 {!isButtonExpanded ? (
                      <div className="pd-pl-quantity-btn">
                        <FontAwesomeIcon
                          icon={faPlus}
                          className="inc-des-button"
                          onClick={() => setIsButtonExpanded((prev) => !prev)}
                        />
                      </div>
                    ) : (
                      <div className="pd-pl-quantity-btn-open" ref={ref}>
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
                    )}*/
