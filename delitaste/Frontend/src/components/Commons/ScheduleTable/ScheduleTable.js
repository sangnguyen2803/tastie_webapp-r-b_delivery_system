import { Link } from "react-router-dom";
import ProfilePhoto from "assets/avatar.jpg";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Fragment, useState } from "react";
import "style/Common.scss";

const ScheduleTable = (props) => {
  return (
    <Fragment>
      <div className="schedule-table-wrapper">
        <div className="st-title">Pick a time</div>
        <select className="form-text-field-select" name="date">
          <option value="" disabled hidden>
            Select a date
          </option>
        </select>
      </div>
    </Fragment>
  );
};

ScheduleTable.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

export default withRouter(connect(mapStateToProps, null)(ScheduleTable));
