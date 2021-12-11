import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAccessTokenAPI } from "store/actions/UserAdmission/AuthActions";
import {
  getUserProfileAPI,
  setLoading,
} from "store/actions/UserAdmission/UserActions";
import { setDialogBox } from "store/actions/UIComponents/DialogBoxAction";

export default function (WrappedComponent) {
  class Authentication extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoader: true,
      };
    }

    async componentDidMount() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      const refreshToken =
        localStorage.getItem("refresh_token") || this.props.user.refreshToken;
      if (!refreshToken) return;
      this.setState({ isLoader: false });
      const result = await this.props.getAccessTokenAPI(refreshToken);
      if (typeof result === undefined || !result) {
        this.setState({ isLoader: true });
        return;
      }
      await this.props.getUserProfileAPI(result?.accessToken);
      this.setState({ isLoader: true });
      if (!this.props.user.isUserAuthenticated) {
        this.props.history.push("/");
        return;
      }
    }

    render() {
      return (
        <WrappedComponent isLoader={this.state.isLoader} {...this.props} />
      );
    }
  }
  Authentication.propTypes = {
    user: PropTypes.object.isRequired,
    getAccessTokenAPI: PropTypes.func.isRequired,
    getUserProfileAPI: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    setDialogBox: PropTypes.func.isRequired,
  };
  const mapStateToProps = (state) => ({
    user: state.UserReducers,
  });

  return connect(mapStateToProps, {
    getAccessTokenAPI,
    getUserProfileAPI,
    setLoading,
    setDialogBox,
  })(Authentication);
}
