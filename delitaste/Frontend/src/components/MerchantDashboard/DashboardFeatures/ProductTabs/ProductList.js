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
const productList = [
  {
    id: 1,
    name: "Menu BBQ Cheese & Bacon",

    price: "2.50$",
    category: "Fast food",
    status: "In stock",
    lastUpdated: "2021-05-13",
    picture: Picture1,
    description: "mfsaef",
  },
  {
    id: 2,
    name: "Pepperoni Pizza - Authentique Raclette (DE RETOUR)",
    price: "10.00$",
    category: "Fast food",
    status: "In stock",
    lastUpdated: "2021-05-13",
    picture: Picture2,
    description: "mfsaef",
  },
  {
    id: 3,
    name: "P333 Authent",
    price: "5.00$",
    category: "Fast food",
    status: "In stock",
    lastUpdated: "2021-05-13",
    picture: Picture3,
  },
  {
    id: 4,
    name: "Macha Shake",
    price: "10.00$",
    status: "In stock",
    lastUpdated: "2021-05-13",
    picture: Picture4,
    description: "mfsaef",
  },
  {
    id: 5,
    name: "Fried Milk Chicken - Honey Butter",
    price: "12.00$",
    category: "Fast food",
    status: "In stock",
    lastUpdated: "2021-05-13",
    picture: Picture5,
    description: "mfsaef",
  },
];
function ProductList(props) {
  const [products, setProducts] = useState(productList);
  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let temp = Array.from(products);
    let [sourceData] = temp.splice(e.source.index, 1);
    temp.splice(e.destination.index, 0, sourceData);
    setProducts(temp);
  };

  return (
    <Fragment>
      <div className="panel-detail-wrapper">
        <div className="panel-detail-title">Product Overview</div>
        <div className="search-product-container">
          <input
            className="search-product-term"
            type="text"
            placeholder="Search a product"
          />
          <Button
            width={50}
            height={36}
            radius={"0px"}
            label={<FontAwesomeIcon icon={faSearch} />}
          />
          <Button
            left={20}
            type="primary"
            width={120}
            height={36}
            radius={"0px"}
            label={"Add"}
            prefix={
              <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
            }
          />
        </div>
        <div className="product-list-info-row">
          <div className="product-list-info">
            <div className="product-stock-quantity">
              {productList.length} Products
            </div>
            <div className="product-stock-quantity-description">
              Upload {`${100 - productList.length}`} more products.
            </div>
            <div className="product-progress-bar">
              <ProgressBar
                bgcolor="#940000"
                progress={`${productList.length}`}
                height="6px"
                length={100}
              />
            </div>
          </div>
          <Metric width={"20%"} radius={5}>
            <span className="metric-title">
              Ranking by sales
              <FontAwesomeIcon
                className="question-icon"
                icon={faQuestionCircle}
              />
            </span>
          </Metric>
          <Metric width={"20%"} radius={5}>
            <span className="metric-title">Ranking by sales</span>
          </Metric>
          <Metric width={"20%"} radius={5}>
            <span className="metric-title">Ranking by sales</span>
          </Metric>
        </div>
        <div className="panel-detail-title">Product Details</div>
        <div className="product-table">
          <DragDropContext onDragEnd={handleDragEnd}>
            <table className="table table-wrapper">
              <thead className="table-head">
                <tr>
                  <th colspan="3" style={{ width: "25%" }}>
                    Products (Dishes)
                    <FontAwesomeIcon
                      icon={faSort}
                      className="table-sort-icon"
                    />
                  </th>
                  <th style={{ width: "15%" }}>Description</th>
                  <th style={{ width: "7.5%" }}>
                    Categories
                    <FontAwesomeIcon
                      icon={faSort}
                      className="table-sort-icon"
                    />
                  </th>

                  <th style={{ width: "7.5%" }}>Status</th>
                  <th style={{ width: "7.5%" }}>Price</th>
                  <th style={{ width: "5%" }}>Last updated</th>
                </tr>
              </thead>
              <Droppable droppableId="droppable-1">
                {(provider) => (
                  <tbody
                    className="text-capitalize"
                    ref={provider.innerRef}
                    {...provider.droppableProps}
                  >
                    {products?.map((product, index) => (
                      <Draggable
                        key={product.name}
                        draggableId={product.name}
                        index={index}
                      >
                        {(provider) => (
                          <tr
                            className="table-row-wrapper"
                            {...provider.draggableProps}
                            ref={provider.innerRef}
                          >
                            <td
                              className="product-drag-icon"
                              {...provider.dragHandleProps}
                            >
                              <svg width="24" height="24" viewBox="0 0 24 24">
                                <path
                                  fill="currentColor"
                                  d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                                />
                              </svg>{" "}
                            </td>
                            <td className="product-img">
                              <img
                                src={product.picture}
                                height={50}
                                width={50}
                              />
                            </td>
                            <td className="product-name">{product.name}</td>
                            <td>{product.description || "—"}</td>
                            <td>{product.category || "—"}</td>
                            <td>{product.status || "—"}</td>
                            <td>{product.price || "—"}</td>
                            <td>{product.lastUpdated || "—"}</td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provider.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
          </DragDropContext>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductList;
