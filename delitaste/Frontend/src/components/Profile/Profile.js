import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import NavBar from "../Commons/Layout/NavBar/NavBar";
import Footer from "../Commons/Layout/Footer/Footer";
import React, { Fragment, useState, useEffect } from "react";
import ToolBar from "../Commons/Layout/Toolbar/Toolbar";
import "./Profile.scss";
import {
  useLocation,
  withRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProfileDetail from "components/Profile/ProfileDetail/ProfileDetail";
import MyAccount from "./AccountSetting/AccountSetting";
import OrderHistory from "./OrderHistory/OrderHistory";
import ProfileSidebar from "./ProfileSidebar/ProfileSidebar";

function Profile(props) {
  const { match, location, user } = props;
  useEffect(() => {
    console.log(location);
  }, [location]);
  return (
    <Fragment>
      <NavBar fixed={true} hideBreadcrumb={true} />
      <div className="profile-container">
        <div className="profile-sidebar-wrapper">
          <ProfileSidebar />
        </div>
        <div className="profile-content-wrapper">
          <Switch>
            <Route exact path={match.path}>
              <Redirect to={`${match.path}/edit`} />
            </Route>
            <Route
              exact
              path={`${match.path}/edit`}
              component={ProfileDetail}
            />
            <Route
              exact
              path={`${match.path}/account-settings`}
              component={MyAccount}
            />
            <Route
              exact
              path={`${match.path}/e-wallet`}
              component={MyAccount}
            />
            <Route
              exact
              path={`${match.path}/promotion`}
              component={OrderHistory}
            />
            <Route
              exact
              path={`${match.path}/order-history/:id`}
              component={OrderHistory}
            />
          </Switch>
        </div>
      </div>
    </Fragment>
  );
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(connect(mapStateToProps, null)(Profile));
