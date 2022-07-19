import { Fragment, useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/fontawesome-free-solid";
import Button from "components/Commons/Button/Button";
import Picture5 from "assets/FoodImg/picture5.jpg";
import Picture6 from "assets/FoodImg/picture6.jpg";
import Picture7 from "assets/FoodImg/picture7.jpg";
import Picture8 from "assets/FoodImg/picture8.jpg";
import Picture9 from "assets/FoodImg/picture9.jpg";
import Picture10 from "assets/FoodImg/picture10.jpg";
import Picture11 from "assets/FoodImg/picture11.jpg";
import Picture12 from "assets/FoodImg/picture12.jpg";
import AddProduct from "./ProductHandler/AddProduct";
import EditProduct from "./ProductHandler/EditProduct";
import ProductForMenu from "components/MerchantDashboard/DashboardFeatures/MDProduct/ProductForMenu";
import { getProductListAPI } from "store/actions/ProductAction/ProductAction";
import { getAllPromotionAPI } from "store/actions/ProviderAction/ProviderAction";
import "../Panel.scss";

function ProductDetail(props) {
  const { user, product, getProductListAPI } = props;
  const [discountList, setDiscountList] = useState([]);
  const [items, setItems] = useState(product.productList || []);
  const [showHandlerPanel, setShowHandlerPanel] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [productForEdit, setProductForEdit] = useState();
  // product handler panel - 0: add_product - 1: edit_product
  useEffect(() => {
    async function fetchPromotion(id) {
      const promotion = await props.getAllPromotionAPI(id);
      if (promotion) setDiscountList(promotion.discount);
    }
    if (user.provider_id !== -1) fetchPromotion(user.provider_id);
  }, [user.provider_id]);

  useEffect(() => {
    async function fetchingData() {
      if (user.provider_id !== -1 && user.provider_id !== null) {
        const productList = await getProductListAPI(user.provider_id);
        setItems(productList);
      }
    }
    fetchingData();
  }, []);

  useEffect(() => {
    if (items && selectedProduct[0] && selectedProduct[1]) {
      const result = items
        .filter((item) => item.menu_category_id === selectedProduct[1])[0]
        .products?.filter((p) => p.product_id === selectedProduct[0])[0];
      setProductForEdit(result);
    }
  }, [selectedProduct]);

  const grid = 8;
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    display: "flex",
    flexDirection: "row",
    width: "100%",
    userSelect: "none",
    background: isDragging ? "lightgrey" : "white",
    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "white",
  });

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    if (result.type === "droppableItem") {
      const resultItems = reorder(
        items,
        result.source.index,
        result.destination.index
      );
      setItems(resultItems);
    } else if (result.type.includes("droppableSubItem")) {
      const parentId = result.type.split("-")[1];
      const itemSubItemMap = items.reduce((acc, item) => {
        acc[item.menu_category_id] = item.products;
        return acc;
      }, {});
      const subItemsForCorrespondingParent = itemSubItemMap[parentId];
      const reorderedSubItems = reorder(
        subItemsForCorrespondingParent,
        result.source.index,
        result.destination.index
      );

      let newItems = [...items];
      newItems = newItems.map((item) => {
        if (String(item.menu_category_id) === parentId) {
          item.products = reorderedSubItems;
        }
        return item;
      });
      setItems(newItems);
    }
  };
  return (
    <Fragment>
      <div className="double-panel-container">
        <div className="main-detail-panel-wrapper">
          <div className="panel-detail-head-wrapper">
            <div className="panel-detail-title">Product Menu</div>
            <Button
              buttonType="primary"
              justifyContent={"center"}
              onClick={() => {
                setShowHandlerPanel(0);
                setSelectedProduct([]);
              }}
              width={160}
              height={32}
              radius={"0px"}
              label={"Add product"}
              prefix={
                <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
              }
            />
          </div>
          <div className="menu-table">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable" type="droppableItem">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {items.map((item, index) => (
                      <Draggable
                        key={String(item.menu_category_id)}
                        draggableId={String(item.menu_category_id)}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div>
                            <div
                              className="menu-category-row-container"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <div className="menu-category-wrapper">
                                <span
                                  className="menu-category-drag-icon"
                                  {...provided.dragHandleProps}
                                >
                                  <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                                    />
                                  </svg>{" "}
                                </span>
                                <span className="menu-category-name">
                                  {" "}
                                  {item.menu_category_name}
                                </span>
                              </div>
                              <ProductForMenu
                                items={items}
                                setItems={setItems}
                                setShowHandlerPanel={setShowHandlerPanel}
                                selectedProduct={selectedProduct}
                                setSelectedProduct={setSelectedProduct}
                                setProductForEdit={setProductForEdit}
                                discounts={discountList}
                                subItems={item.products}
                                type={item.menu_category_id}
                              />
                            </div>
                            {provided.placeholder}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
        <div className="sub-detail-panel-wrapper">
          {showHandlerPanel === 0 ? (
            <AddProduct />
          ) : (
            <EditProduct
              productForEdit={productForEdit}
              setProductForEdit={setProductForEdit}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
}

ProductDetail.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  getProductListAPI: PropTypes.func.isRequired,
  getAllPromotionAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  connect(mapStateToProps, { getProductListAPI, getAllPromotionAPI })(
    ProductDetail
  )
);

const data = [
  {
    id: "1",
    name: "Picked for you",
    products: [
      {
        id: "101",
        productName: "Waffle Fries",
        description:
          "Waffle fries seasoned in Sam's New Orleans style spice and serverd with you choice of sauce",
        price: "$4.50",
        picture: Picture6,
        lastUpdated: "2021-12-14",
      },
      {
        id: "102",
        productName: "Sam's Tenders",
        description:
          "Five piece southern fried and hand breaded chicken breasts seasoned in our signature Sam's New Orleans style spice served your choice of one sauce.",
        price: "$11.50",
        picture: Picture7,
        lastUpdated: "2021-12-14",
      },
      {
        id: "103",
        productName: "Loaded Waffle Fries",
        description:
          "Waffle fries seasoned in Sam's New Orleans style spice, topped with Cheese Sauce, Bacon Crumbles, and Scallions and served with your choice of 1 sauce.",
        price: "$5.50",
        picture: Picture8,
        lastUpdated: "2021-12-14",
      },
    ],
  },
  {
    id: "2",
    name: "Appetizers",
    products: [
      {
        id: "201",
        productName: "Sam's Bacon Mac n' Cheese",
        description:
          "Macaroni in a 3 cheese blended sauce, topped with parmesan and bacon crumbles.              ",
        price: "$5.50",
        picture: Picture9,
        lastUpdated: "2021-12-14",
      },
      {
        id: "202",
        productName: "Sam's Chik'n Wings",
        description:
          "Your choice of either 6 piece or 12 piece Meatless Quorn Chik'n wings tossed in your choice of buffalo or bbq, served with your choice of one sauce.",
        price: "$14.00",
        picture: Picture10,
        lastUpdated: "2021-12-14",
      },
    ],
  },
  {
    id: "3",
    name: "Sandwiches",
    products: [
      {
        id: "301",
        productName: "The Classic Sandwich",
        description:
          "Two southern fried and hand breaded chicken tenders seasoned in our signature Sam's New Orleans style spice in between a toasted brioche bun with pickles, and classic sauce.",
        price: "$14.50",
        picture: Picture11,
        lastUpdated: "2021-12-14",
      },
      {
        id: "302",
        productName: "The BBQ Sandwich",
        description:
          "Two southern fried and hand breaded chicken tenders seasoned in our signature Sam's New Orleans style spice, tossed in BBQ sauce, in between a toasted brioche bun with pickles, shredded romaine, and mayo.",
        price: "$10.50",
        picture: Picture12,
        lastUpdated: "2021-12-14",
      },
    ],
  },
  {
    id: "4",
    name: "Sides",
    products: [
      {
        id: "401",
        productName: "Sam's Cole Slaw",
        description:
          "Shredded carrots, shredded red cabbage, shredded green cabbage, classic sauce.",
        price: "$4.50",
        picture: Picture5,
        lastUpdated: "2021-12-14",
      },
    ],
  },
];
