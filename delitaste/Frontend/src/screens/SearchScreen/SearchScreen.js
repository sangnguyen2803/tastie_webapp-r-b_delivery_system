import React from "react";
import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import { withRouter } from "react-router-dom";
import { Fragment } from "react";
import Spinner from "components/Commons/Overlay/Spinner/Spinner";
import SearchResult from "components/SearchResult/SearchResult";

function HomeScreen(props) {
  return (
    <Fragment>
      <SearchResult />
    </Fragment>
  );
}

export default withRouter(withAuth(HomeScreen));
