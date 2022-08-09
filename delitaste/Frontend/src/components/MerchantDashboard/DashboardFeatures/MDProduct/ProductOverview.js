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
import { faScroll } from "@fortawesome/free-solid-svg-icons";
import { faStickyNote } from "@fortawesome/free-regular-svg-icons";

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
function ProductOverview(props) {
  const [currentTab, setCurrentTab] = useState(0);
  const [products, setProducts] = useState([]);
  const [searchResult, setSearchResult] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const { user, provider, getProductListAPI } = props;
  useEffect(() => {
    async function fetchProductList(id) {
      if (user.provider_id !== -1) {
        const res = await getProductListAPI(id);
        const temp = [];
        for (let item in res) {
          for (let x in res[item].products) {
            temp.push(res[item].products[x]);
          }
        }
        setProducts(temp);
        setSearchResult(temp);
      }
    }
    fetchProductList(user.provider_id);
  }, [user.provider_id]);

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let temp = Array.from(products);
    let [sourceData] = temp.splice(e.source.index, 1);
    temp.splice(e.destination.index, 0, sourceData);
    setProducts(temp);
  };
  const filterSearchResult = (searchTerm) => {
    setCurrentTab(4);
    let result = [];
    if (searchTerm.length !== 0) {
      result = searchResult.filter((item) =>
        item.product_name.includes(searchTerm)
      );
      setSearchResult(result);
    } else {
      setCurrentTab(0);
      setSearchResult(products);
    }
  };
  const handleSelectTab = (value) => {
    setCurrentTab(value);
    let result = {};
    switch (value) {
      case 0:
        result = products;
        break;
      case 1:
        result = products.filter((item) => item.product_status === 1);
        break;
      case 2:
        result = products.filter((item) => item.product_status === 2);
        break;
      case 3:
        result = products.filter((item) => item.product_status === 3);
        break;
      default:
        result = products;
    }
    setSearchResult(result);
  };

  return (
    <Fragment>
      <div className="panel-detail-wrapper">
        <div className="panel-detail-title">Product Overview</div>

        <div className="product-list-info-row">
          <div className="product-list-info">
            <div className="product-stock-quantity">
              {products?.length} Products
            </div>
            <div className="product-stock-quantity-description">
              Upload {`${200 - products?.length}`} more products.
            </div>
            <div className="product-progress-bar">
              <ProgressBar
                bgcolor="#940000"
                progress={`${products.length}`}
                height="6px"
                length={200}
              />
            </div>
          </div>
        </div>
        <div className="panel-detail-title">Product Details</div>
        <div className="search-product-container">
          <input
            className="search-product-term"
            type="text"
            name="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search a product"
          />
          <Button
            width={60}
            height={36}
            radius={"0px"}
            onClick={() => filterSearchResult(searchTerm)}
            label={<FontAwesomeIcon icon={faSearch} />}
          />
          <Button
            left={20}
            buttonType="primary"
            width={140}
            height={36}
            radius={"0px"}
            label={"Add product"}
            prefix={
              <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
            }
            onClick={() => props.setCurrentTab(1)}
          />
          <Button
            left={20}
            buttonType="primary"
            width={140}
            height={36}
            radius={"0px"}
            label={"Add Survey"}
            prefix={
              <FontAwesomeIcon icon={faStickyNote} style={{ color: "white" }} />
            }
            onClick={() => props.setCurrentTab(2)}
          />
        </div>

        <div className="product-table-container">
          <Tabs
            tabs={ProductFilterTab.filterTabs}
            boxWidth={"8%"}
            secondaryTabGroup={true}
            borderTop={true}
            fixed={false}
            current={currentTab}
            selectItem={handleSelectTab}
          />
          {products?.length !== 0 ? (
            <div className="product-table">
              <table className="table table-wrapper">
                <tbody className="text-capitalize">
                  {searchResult?.map((product, index) => (
                    <tr
                      className="table-row-wrapper"
                      style={{ cursor: "pointer" }}
                      key={index}
                    >
                      <td className="product-img">
                        <img
                          src={product.product_image}
                          height={50}
                          width={50}
                          alt=""
                        />
                      </td>
                      <td
                        className="product-name"
                        style={{
                          textAlign: "left",
                          width: 200,
                        }}
                      >
                        {product.product_name || "—"}
                      </td>
                      <td
                        className="field-hidden"
                        style={{
                          textAlign: "left",
                          width: 400,
                        }}
                      >
                        {product.description || "—"}
                      </td>

                      <td style={{ width: 60 }}>
                        $ {product?.price?.toFixed(2) || "—"}
                      </td>
                      <td>{product.update_at || "—"}</td>
                      <td>Stock: {product.quantity || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div
              style={{
                height: 300,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid #E6E6E6",
              }}
            >
              <tr className="table-row-wrapper">
                <td className="product-img"></td>
                <td
                  className="field-hidden"
                  style={{
                    textAlign: "center",
                    width: 600,
                    fontSize: 14,
                  }}
                >
                  Your restaurant has no products at the moment. <br />
                  Please add a new product.{" "}
                </td>
                <td
                  className="product-name"
                  style={{
                    textAlign: "left",
                    width: 0,
                  }}
                ></td>

                <td style={{ width: 60 }}></td>
                <td></td>
                <td></td>
              </tr>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

ProductOverview.propTypes = {
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
  })(ProductOverview)
);
