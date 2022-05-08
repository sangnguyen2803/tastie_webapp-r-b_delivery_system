import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAccessTokenAPI } from "store/actions/UserAction/AuthAction";
import { getCart } from "store/actions/CartAction/CartAction";
import {
  getUserProfileAPI,
  setLoading,
} from "store/actions/UserAction/UserAction";
import { setDialogBox } from "store/actions/UIComponentAction/DialogBoxAction";

export default function (WrappedComponent) {
  class Authentication extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoader: true,
        cart: {},
      };
    }
    async componentDidMount() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      const refreshToken =
        localStorage.getItem("refreshToken") || this.props.user.refreshToken;
      if (refreshToken) {
        this.setState({ isLoader: false });
        const result = await this.props.getAccessTokenAPI(refreshToken);
        if (typeof result === undefined || !result) {
          this.setState({ isLoader: true });
          return;
        }
        await this.props.getUserProfileAPI(result?.accessToken);
        if (this.props.user.profile?.user_id)
          await this.props.getCart(this.props.user.profile?.user_id);
        this.setState({ isLoader: true });
      }
      if (!this.props.user.isUserAuthenticated) {
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
    getCart: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    setDialogBox: PropTypes.func.isRequired,
  };
  const mapStateToProps = (state) => ({
    user: state.UserReducer,
  });

  return connect(mapStateToProps, {
    getAccessTokenAPI,
    getUserProfileAPI,
    getCart,
    setLoading,
    setDialogBox,
  })(Authentication);
}
