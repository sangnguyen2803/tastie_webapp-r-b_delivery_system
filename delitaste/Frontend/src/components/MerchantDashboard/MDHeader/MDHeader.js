import { Fragment, useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faSearch, faStar } from "@fortawesome/fontawesome-free-solid";
import PropTypes from "prop-types";
import { getProviderByIdAPI } from "store/actions/ProviderAction/ProviderAction";
import "./MDHeader.scss";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";

const dayOfWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function MDHeader(props) {
  const [provider, setProvider] = useState();
  const [operationDescription, setOperationDescription] = useState("");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  useEffect(() => {
    async function fetchingDataAPI() {
      console.log(props.user.provider_id);
      const result = await props.getProviderByIdAPI(props.user.provider_id, 2); //type = 2'
      console.log(result);
      setProvider(result?.data);
      var today = new Date();
      const operation = result.operation_time[dayOfWeek[today.getDay()]];
      if (!operation.is_day_off) {
        setOperationDescription(
          `Open until ${operation.close_time?.slice(0, 5)} PM`
        );
      } else {
        setOperationDescription(`Service is not available today`);
      }
    }
    if (props.user.provider_id !== -1) fetchingDataAPI();
  }, [props.user?.provider_id]);

  return (
    <Fragment>
      {provider && (
        <div className="md-pro-gen-head-container">
          <div className="md-head-image-wrapper">
            <img
              src={provider.avatar}
              alt="provider_pics"
              className="md-head-image"
            />
          </div>
          <div className="md-head-content-wrapper">
            <span className="md-head-main-text-large">
              {provider.merchant_name}
            </span>
            <span className="md-head-sub-text-large">
              <FontAwesomeIcon icon={faMapMarkedAlt} className="md-text-icon" />
              277, Nguyen Van Cu, ward Nguyen Cu Trinh, district 5, Ho Chi Minh
              city
            </span>

            {!provider.description && (
              <span className="md-head-sub-text-medium md-head-description">{`${provider.merchant_name} began chickens and burgers and selling them to restaurants and his neighbors out of a small kitchen at the corner of Hudson and North Moore St. in Tribeca. Today, NYC’s beloved restaurant and pie shop celebrates 27 years of classic, made from scratch American cooking.`}</span>
            )}
            <span className="md-head-sub-text-large">
              {[...Array(provider.rating || 5)].map((e, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className="md-text-icon"
                  style={{ color: "rgb(255, 221, 0)", fontSize: 16 }}
                />
              ))}
              {[...Array(5 - (provider.rating || 5))].map((e, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className="md-text-icon"
                  style={{ color: "rgb(200, 200, 200)", fontSize: 16 }}
                />
              ))}{" "}
              {`${provider.rating || "5.0"} (${
                provider.total_review || " 10 ratings "
              }) • Cooking time: ${provider.estimated_cooking_time} mins`}
            </span>
            <span className="md-head-sub-text-medium">
              <FontAwesomeIcon icon={faPhone} className="md-text-icon" />
              {provider.hotline}
            </span>
            <span
              className="md-head-sub-text-large"
              style={{ fontWeight: 700, color: "#101010" }}
            >
              {operationDescription}
            </span>
          </div>
        </div>
      )}
    </Fragment>
  );
}

MDHeader.propTypes = {
  user: PropTypes.object.isRequired,
  provider: PropTypes.object.isRequired,
  getProviderByIdAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  provider: state.ProviderReducer,
});

export default withRouter(
  connect(mapStateToProps, {
    getProviderByIdAPI,
  })(MDHeader)
);
