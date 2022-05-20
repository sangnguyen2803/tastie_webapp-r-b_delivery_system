import "./Sidebar.scss";
import ProfilePhoto from "assets/avatar.jpg";
import ProviderImage from "assets/provider_avatar.jpg";
import { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  faShoppingBag,
  faUtensils,
  faShippingFast,
  faBullhorn,
  faChartLine,
  faChevronDown,
  faChevronUp,
  faDollarSign,
  faCog,
  faHome,
  faCaretRight,
} from "@fortawesome/fontawesome-free-solid";
import Logo from "assets/logo.png";
import {
  faFunnelDollar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import { faBlackberry } from "@fortawesome/free-brands-svg-icons";

const sidebarFeatures = [
  {
    id: 0,
    icon: faHome,
    title: "Home",
    subFeatures: [
      { id: 1, title: "General Information", link: "provider/general" },
      { id: 2, title: "My Restaurant", link: "provider/my-restaurant" },
    ],
  },
  {
    id: 1,
    icon: faShoppingBag,
    title: "Orders",
    subFeatures: [
      { id: 1, title: "My Order", link: "order/my-order" },
      { id: 2, title: "Order History", link: "order/order-history" },
    ],
  },
  {
    id: 2,
    icon: faUtensils,
    title: "Products",
    subFeatures: [{ id: 1, title: "My Products", link: "product/my-product" }],
  },
  {
    id: 3,
    icon: faDollarSign,
    title: "Revenue",
    subFeatures: [
      { id: 1, title: "Revenue Management", link: "revenue?type=1" },
    ],
  },
  {
    id: 4,
    icon: faShippingFast,
    title: "Shipments",
    subFeatures: [],
  },
  {
    id: 5,
    icon: faChartLine,
    title: "Business Insights",
    subFeatures: [
      { id: 1, title: "Key Metrics", link: "businessInsight?type=1" },
      { id: 2, title: "Business Analytics", link: "businessInsight?type=2" },
      // Orders trend is a line chart showing the performance of your show over time (real-time, yesterday, 7 days, 30 days)
      //{ id: 3, title: "Product Rankings", link: "businessInsight?type=3" },
      // Product rankings including Sales, Units Sold and Page Views
      // Sales: Top 10 products according to total sales value of confirmed orders
      // Units Sold: Top 10 products according to total number of units sold in confirmed orders
      // Page Views: Top 10 products according to total number of product views
    ],
  },
  {
    id: 6,
    icon: faBullhorn,
    title: "Marketing",
    subFeatures: [
      { id: 1, title: "Discount Promotions", link: "/marketing?type=1" },
    ],
  },
];

function Sidebar(props) {
  const [selectedFeature, setSelectedFeature] = useState([0, 1]);
  const [showFeatures, setShowFeatures] = useState({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
  });

  const handleSelectFeature = (id) => (e) => {
    e.preventDefault();
    setShowFeatures((state) => ({
      ...state,
      [id]: !state[id],
    }));
  };

  const { match } = props;
  const mappingDashboard = (destination) => {
    console.log(`${match.path}/${destination}`);
    props.history.push(`${match.path}/${destination}`);
  };
  return (
    <div className="sb-wrapper">
      <div className="sb-header-wrapper">
        <img
          src={ProviderImage}
          className="sb-header-avatar"
          alt="header_img"
        />
        <span className="sb-header-text">Phuc Long - Coffee & Tea</span>
      </div>
      {sidebarFeatures.map((feature) => (
        <div className="sb-detail-wrapper" key={feature.id}>
          <div className="sb-feature-row">
            <FontAwesomeIcon className="sb-icon" icon={feature.icon} />
            <span className="sb-feature-text">{feature.title}</span>
            <FontAwesomeIcon
              className="sb-dropdown-icon"
              onClick={handleSelectFeature(feature.id)}
              icon={showFeatures[feature.id] ? faChevronDown : faChevronUp}
            />
          </div>
          {showFeatures[feature.id] ? (
            feature.subFeatures.map((item) => (
              <div
                className="sb-sub-feature-row"
                onClick={() => {
                  setSelectedFeature([feature.id, item.id]);
                  mappingDashboard(`${item.link}/${props.user.providerId}`);
                }}
                style={
                  selectedFeature[0] === feature.id &&
                  selectedFeature[1] === item.id
                    ? {
                        fontWeight: "bold",
                        color: "rgb(136, 0, 0)",
                      }
                    : { fontWeight: "normal" }
                }
                key={item.id}
              >
                <span className="sidebar-feature-text" key={item.id}>
                  {item.title}
                </span>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
}

Sidebar.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

export default withRouter(connect(mapStateToProps, null)(Sidebar));

/*

      <div className="sb-feature-row">
        <FontAwesomeIcon className="sb-icon" icon={faUtensils} />
        <span className="sb-feature-text">My Products</span>
      </div>
      <div className="sb-feature-row">
        <FontAwesomeIcon className="sb-icon" icon={faShippingFast} />
        <span className="sb-feature-text">Shipment</span>
      </div>
      <div className="sb-feature-row">
        <FontAwesomeIcon className="sb-icon" icon={faChartLine} />
        <span className="sb-feature-text">Business Insights</span>
      </div>
      <div className="sb-feature-row">
        <FontAwesomeIcon className="sb-icon" icon={faStarHalfAlt} />
        <span className="sb-feature-text">Ratings</span>
      </div>
      <div className="sb-feature-row">
        <FontAwesomeIcon className="sb-icon" icon={faBullhorn} />
        <span className="sb-feature-text">Marketing</span>
      </div>
      <div className="sb-feature-row">
        <FontAwesomeIcon className="sb-icon" icon={faFunnelDollar} />
        <span className="sb-feature-text">Revenue</span>
      </div>

      <div className="sb-feature-row" style={{ marginTop: "150px" }}>
        <FontAwesomeIcon className="sb-icon" icon={faUserCog} />
        <span className="sb-feature-text">Settings</span>
      </div>
*/
