import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAccessTokenAPI } from "store/actions/UserAction/AuthAction";
import { getCart } from "store/actions/CartAction/CartAction";
import {
  getUserProfileAPI,
  setLoading,
  getAddressBookAPI,
} from "store/actions/UserAction/UserAction";
import { setDialogBox } from "store/actions/UIComponentAction/DialogBoxAction";

export default function (WrappedComponent) {
  class Authentication extends Component {
    constructor(props) {
      super(props);
      this.state = {
        userId: -1,
        isLoading: true,
        isAuth: false,
      };
    }
    async componentDidMount() {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const result = await this.props.getAccessTokenAPI(refreshToken);
        if (result?.isAuth && result?.accessToken) {
          this.setState({ isLoading: false });
          this.setState({ isAuth: true });
          const id = await this.props.getUserProfileAPI(result.accessToken);
          this.setState({ userId: id });
        }
        return;
      }
    }
    componentDidUpdate(prevProps, prevState) {
      if (prevState.userId !== this.state.userId && this.state.userId !== -1) {
        this.props.getAddressBookAPI(this.state.userId);
        this.props.getCart(this.state.userId);
      }
    }
    render() {
      return (
        <WrappedComponent
          isLoading={this.state.isLoading}
          isAuth={this.state.isAuth}
          {...this.props}
        />
      );
    }
  }
  Authentication.propTypes = {
    user: PropTypes.object.isRequired,
    getAccessTokenAPI: PropTypes.func.isRequired,
    getUserProfileAPI: PropTypes.func.isRequired,
    getAddressBookAPI: PropTypes.func.isRequired,
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
    getAddressBookAPI,
    getCart,
    setLoading,
    setDialogBox,
  })(Authentication);
}
