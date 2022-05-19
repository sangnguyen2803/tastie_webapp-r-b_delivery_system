import "./HomeBody.scss";
import { Fragment, useState, useEffect } from "react";
import Switch from "react-switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  faAddressBook,
  faAllergies,
  faChevronDown,
  faChevronUp,
  faHeart,
  faRibbon,
  faSeedling,
  faUtensils,
} from "@fortawesome/fontawesome-free-solid";
import { faCandyCane, faCarrot } from "@fortawesome/free-solid-svg-icons";
const HOME_RENDER = 1;
const SEARCH_RENDER = 2;
function HomeBodySidebar(props) {
  const { type, totalResult, query } = props;
  const [checkedOption1, setCheckedOption1] = useState(false);
  const [checkedOption2, setCheckedOption2] = useState(false);

  const [showFunction1, setShowFunction1] = useState(true);
  const [showFunction2, setShowFunction2] = useState(true);
  const [showFunction3, setShowFunction3] = useState(true);
  const [showFunction4, setShowFunction4] = useState(true);

  const dietary = [
    { id: 1, dietary_name: "Vegetarian", dietary_icon: faCarrot },
    { id: 2, dietary_name: "Vegan", dietary_icon: faSeedling },
    { id: 3, dietary_name: "Gluten-free", dietary_icon: faCandyCane },
    { id: 4, dietary_name: "Good for health", dietary_icon: faHeart },
    { id: 5, dietary_name: "Alergy-friendly", dietary_icon: faAllergies },
  ];
  return (
    <Fragment>
      <div
        className="homebody-sb-container"
        style={{ overflowY: props.showScrollbar }}
      >
        {type === SEARCH_RENDER && query && (
          <Fragment>
            <span className="homebody-sb-header-for-query-up">{`"${query}"`}</span>
            <span className="homebody-sb-header-for-query-down">{`Results for "${query}"`}</span>
          </Fragment>
        )}
        <span
          className="homebody-sb-header-title"
          style={type === SEARCH_RENDER ? { marginTop: 0 } : {}}
        >
          All stores
        </span>
        {type === SEARCH_RENDER && totalResult ? (
          <span className="homebody-sb-header-for-result">
            {totalResult !== 0
              ? `${totalResult} Result${totalResult > 1 ? "s" : ""}`
              : "Not found"}
          </span>
        ) : (
          <Fragment></Fragment>
        )}
        {type === HOME_RENDER ? (
          <div className="address-list">
            <FontAwesomeIcon
              className="address-book-icon"
              onClick={() => setShowFunction1((prev) => !prev)}
              icon={faAddressBook}
            />
            <span className="address-book-picked">
              543, Nguyen Dinh Chieu, ward 10, district 3, Ho Chi Minh city
            </span>
            <span className="address-book-button">Change</span>
          </div>
        ) : (
          <></>
        )}
        <div className="homebody-sb-function">
          <div className="homebody-sb-function-title-wrapper">
            <span className="homebody-sb-function-title">Sort</span>
            <FontAwesomeIcon
              className="homebody-sb-function-title-icon"
              onClick={() => setShowFunction1((prev) => !prev)}
              icon={showFunction1 ? faChevronUp : faChevronDown}
            />
          </div>
          {showFunction1 && (
            <div className="homebody-sb-radio-detail-wrapper">
              <label className="hb-sb-type-wrapper radio">
                <input
                  type="radio"
                  name="sortType"
                  value={1}
                  onChange={(e) => props.setCurrentSortMode(e.target.value)}
                />
                <span className="hb-sb-label-radio">
                  Picked for you (default)
                </span>
              </label>
              <label className="hb-sb-type-wrapper radio">
                <input
                  type="radio"
                  name="sortType"
                  value={2}
                  onChange={(e) => props.setCurrentSortMode(e.target.value)}
                />
                <span className="hb-sb-label-radio">Most popular</span>
              </label>
              <label className="hb-sb-type-wrapper radio">
                <input
                  type="radio"
                  name="sortType"
                  value={3}
                  onChange={(e) => props.setCurrentSortMode(e.target.value)}
                />
                <span className="hb-sb-label-radio">Rating</span>
              </label>
              <label className="hb-sb-type-wrapper radio">
                <input
                  type="radio"
                  name="sortType"
                  value={4}
                  onChange={(e) => props.setCurrentSortMode(e.target.value)}
                />
                <span className="hb-sb-label-radio">Delivery time</span>
              </label>
            </div>
          )}
        </div>
        <div className="homebody-sb-function">
          <div className="homebody-sb-function-title-wrapper">
            <span className="homebody-sb-function-title">Just For You </span>
            <FontAwesomeIcon
              className="homebody-sb-function-title-icon"
              onClick={() => setShowFunction2((prev) => !prev)}
              icon={showFunction2 ? faChevronUp : faChevronDown}
            />
          </div>
          {showFunction2 && (
            <>
              <div className="hb-sb-switch-wrapper">
                <FontAwesomeIcon icon={faRibbon} className="hb-sb-icon-color" />
                <span className="hb-sb-switch-label">Deals</span>
                <Switch
                  onChange={() => {
                    setCheckedOption1((prev) => !prev);
                  }}
                  checked={checkedOption1}
                  onColor="#E2E2E2"
                  offColor="#E2E2E2"
                  onHandleColor="#666666"
                  handleDiameter={20}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
                  height={15}
                  width={40}
                  className="react-switch"
                  id="material-switch"
                />
              </div>
              <div className="hb-sb-switch-wrapper">
                <FontAwesomeIcon
                  icon={faUtensils}
                  className="hb-sb-icon-color"
                />
                <span className="hb-sb-switch-label">Most order</span>
                <Switch
                  onChange={() => {
                    setCheckedOption2((prev) => !prev);
                  }}
                  checked={checkedOption2}
                  onColor="#E2E2E2"
                  offColor="#E2E2E2"
                  onHandleColor="#666666"
                  handleDiameter={20}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
                  height={15}
                  width={40}
                  className="react-switch"
                  id="material-switch"
                />
              </div>
            </>
          )}
        </div>
        {type === HOME_RENDER ? (
          <div className="homebody-sb-function">
            <div className="homebody-sb-function-title-wrapper">
              <span className="homebody-sb-function-title">Price Range</span>
              <FontAwesomeIcon
                className="homebody-sb-function-title-icon"
                onClick={() => setShowFunction3((prev) => !prev)}
                icon={showFunction3 ? faChevronUp : faChevronDown}
              />
            </div>
            {showFunction3 && (
              <div id="form-wrapper">
                <div className="form1">
                  <div id="radio-slider">
                    <input
                      type="radio"
                      name="debt-amount"
                      id="1"
                      value="1"
                      required
                    />
                    <label
                      className="label-radio-slider"
                      htmlFor="1"
                      data-debt-amount="Free"
                    ></label>
                    <input
                      type="radio"
                      name="debt-amount"
                      id="2"
                      value="2"
                      required
                    />
                    <label htmlFor="2" data-debt-amount="$"></label>
                    <input
                      type="radio"
                      name="debt-amount"
                      id="3"
                      value="3"
                      required
                    />
                    <label htmlFor="3" data-debt-amount="$$"></label>
                    <input
                      type="radio"
                      name="debt-amount"
                      id="4"
                      value="4"
                      required
                    />
                    <label htmlFor="4" data-debt-amount="$$$"></label>
                    <input
                      type="radio"
                      name="debt-amount"
                      id="5"
                      value="5"
                      required
                    />
                    <label htmlFor="5" data-debt-amount="$$$$"></label>
                    <div id="debt-amount-pos"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
        {type === HOME_RENDER ? (
          <div className="homebody-sb-function">
            <div className="homebody-sb-function-title-wrapper">
              <span className="homebody-sb-function-title">Dietary</span>
              <FontAwesomeIcon
                className="homebody-sb-function-title-icon"
                onClick={() => setShowFunction4((prev) => !prev)}
                icon={showFunction4 ? faChevronUp : faChevronDown}
              />
            </div>

            {showFunction4 && (
              <div className="dietary-wrapper">
                {dietary.map((item) => (
                  <div className="dietary-item" key={item.id}>
                    <FontAwesomeIcon
                      icon={item.dietary_icon}
                      className="dietary-icon"
                    />
                    <span className="dietary-text">{item.dietary_name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </Fragment>
  );
}
HomeBodySidebar.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});
export default withRouter(connect(mapStateToProps, null)(HomeBodySidebar));
