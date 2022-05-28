import { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./MDBusinessInsight.scss";
import PropTypes from "prop-types";
import MDHeader from "components/MerchantDashboard/MDHeader/MDHeader";

function MDBusinessInsight(props) {
  return (
    <Fragment>
      <div
        className="panel-detail-wrapper"
        style={{ height: "auto", marginTop: "0px" }}
      >
        <MDHeader />
        Statistics
      </div>
    </Fragment>
  );
}

MDBusinessInsight.propTypes = {
  user: PropTypes.object.isRequired,
  provider: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  provider: state.ProviderReducer,
});

export default withRouter(connect(mapStateToProps, {})(MDBusinessInsight));
