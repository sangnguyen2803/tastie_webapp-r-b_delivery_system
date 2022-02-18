import React from "react";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import { withRouter } from "react-router-dom";
import ProviderDetail from "components/ProviderDetail/ProviderDetail";
import { Fragment } from "react";
import Spinner from "components/Commons/Overlay/Spinner/Spinner";

function ProviderDetailScreen(props) {
  return (
    <Fragment>
      {props.isLoader ? (
        <ProviderDetail />
      ) : (
        <Fragment>
          <ProviderDetail />
          <Spinner visibility={true} />
        </Fragment>
      )}
    </Fragment>
  );
}

export default withRouter(withAuth(ProviderDetailScreen));
