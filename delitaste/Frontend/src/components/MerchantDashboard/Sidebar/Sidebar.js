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
  faChartLine,
  faDollarSign,
  faHome,
  faCaretDown,
  faCaretUp,
  faCaretRight,
  faStore,
  faBullhorn,
} from "@fortawesome/fontawesome-free-solid";
import { useLocation, withRouter } from "react-router-dom";
import { faSpeakerDeck } from "@fortawesome/free-brands-svg-icons";

const sidebarFeatures = [
  {
    id: 0,
    icon: faStore,
    title: "Store",
    name: "provider",
    subFeatures: [
      {
        id: 1,
        name: "general",
        title: "My restaurant",
        link: "provider/general",
      },
    ],
  },
  {
    id: 1,
    icon: faShoppingBag,
    name: "order",
    title: "Orders",
    subFeatures: [
      {
        id: 1,
        name: "my-order",
        title: "My Order",
        link: "order/my-order",
      },
      {
        id: 2,
        name: "order-history",
        title: "Order History",
        link: "order/order-history",
      },
    ],
  },
  {
    id: 2,
    icon: faUtensils,
    name: "product",
    title: "Products",
    subFeatures: [
      {
        id: 1,
        name: "my-product",
        title: "My Products",
        link: "product/my-product",
      },
    ],
  },
  {
    id: 3,
    icon: faDollarSign,
    name: "revenue",
    title: "Revenue",
    subFeatures: [
      {
        id: 1,
        name: "business-revenue",
        title: "Revenue Management",
        link: "revenue/business-revenue",
      },
    ],
  },
  {
    id: 4,
    icon: faBullhorn,
    name: "marketing",
    title: "Marketing",
    subFeatures: [
      {
        id: 1,
        name: "promotion",
        title: "Promotions & Vouchers",
        link: "marketing/promotion",
      },
    ],
  },
  {
    id: 5,
    icon: faChartLine,
    name: "business-insight",
    title: "Insights",
    subFeatures: [
      {
        id: 1,
        name: "business-insight",
        title: "Business Insight",
        link: "insights/business-insight",
      },
      // Orders trend is a line chart showing the performance of your show over time (real-time, yesterday, 7 days, 30 days)
      //{ id: 3, title: "Product Rankings", link: "businessInsight?type=3" },
      // Product rankings including Sales, Units Sold and Page Views
      // Sales: Top 10 products according to total sales value of confirmed orders
      // Units Sold: Top 10 products according to total number of units sold in confirmed orders
      // Page Views: Top 10 products according to total number of product views
    ],
  },
];

function Sidebar(props) {
  const location = useLocation();
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
    props.history.push(`${match.path}/${destination}`);
  };
  return (
    <div className="sb-wrapper">
      <div className="u-pf-sb-header">
        <img
          src={`https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly9kMXJhbHNvZ25qbmczNy5jbG91ZGZyb250Lm5ldC8yMGIyYjVhYi0yZGIwLTQ2ZTQtYWIxNC03MmJmYjExMWQ3YWEuanBlZw==`}
          alt="provider_profile_image"
          className="pro-sb-profile-image"
        />
        <div className="u-pf-sb-profile-text-wrapper">
          <span className="u-pf-sb-pt-main-text">The Dirty South</span>
          <span className="u-pf-sb-pt-sub-text">150+ products</span>
          <span className="u-pf-sb-pt-sub-text">27 orders</span>
        </div>
      </div>
      {sidebarFeatures.map((feature) => (
        <div className="sb-detail-wrapper" key={feature.id}>
          <div
            className="sb-feature-row"
            style={
              location.pathname.split("/")[2] === feature.name &&
              showFeatures[feature.id]
                ? { backgroundColor: "#E6E6E6" }
                : {}
            }
          >
            <FontAwesomeIcon className="sb-icon" icon={feature.icon} />
            <span className="sb-feature-text">{feature.title}</span>
            <FontAwesomeIcon
              className="sb-dropdown-icon"
              onClick={handleSelectFeature(feature.id)}
              icon={showFeatures[feature.id] ? faCaretDown : faCaretUp}
            />
          </div>
          {showFeatures[feature.id] ? (
            feature.subFeatures.map((item) => (
              <div
                className="sb-sub-feature-row"
                onClick={() => {
                  setSelectedFeature([feature.id, item.id]);
                  mappingDashboard(`${item.link}`);
                }}
                style={
                  location.pathname.split("/")[3] === item.name
                    ? {
                        backgroundColor: "#F4F4F4",
                      }
                    : {}
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
