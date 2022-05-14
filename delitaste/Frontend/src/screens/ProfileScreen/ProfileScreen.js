import React from "react";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Fragment } from "react";
import Profile from "components/Profile/Profile";
import { getAccessTokenAPI } from "store/actions/UserAction/AuthAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function ProfileScreen(props) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchAccessToken(token) {
      const res = await props.getAccessTokenAPI(refreshToken);
      return res.isAuth;
    }
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken !== null) {
      let result = fetchAccessToken(refreshToken);
      if (result) {
        setLoading(false);
        return;
      } else {
        props.history.push("/sign-in");
      }
    }
    props.history.push("/sign-in");
  }, []);
  return !loading && <Profile />;
}

ProfileScreen.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  getAccessTokenAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  connect(mapStateToProps, { getAccessTokenAPI })(ProfileScreen)
);
