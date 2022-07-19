import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAccessTokenAPI } from "store/actions/UserAction/AuthAction";

export default function (WrappedComponent) {
  class ProviderAuthentication extends Component {
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
        localStorage.getItem("refreshToken") || this.props.user.refreshToken;
      if (refreshToken) {
        this.setState({ isLoader: false });
        const result = await this.props.getAccessTokenAPI(refreshToken);
        if (typeof result === undefined || !result) {
          this.setState({ isLoader: true });
          return;
        }
        await this.props.getUserProfileAPI(result?.accessToken);
        this.setState({ isLoader: true });
      }
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
  ProviderAuthentication.propTypes = {
    user: PropTypes.object.isRequired,
    provider: PropTypes.object.isRequired,
    getAccessTokenAPI: PropTypes.func.isRequired,
  };
  const mapStateToProps = (state) => ({
    user: state.UserReducer,
    provider: state.ProviderReducer,
  });

  return connect(mapStateToProps, {
    getAccessTokenAPI,
  })(ProviderAuthentication);
}
