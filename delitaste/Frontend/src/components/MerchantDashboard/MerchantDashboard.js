import "./MerchantDashboard.scss";
import NavBar from "components/Commons/Layout/NavBar/NavBar";
import Sidebar from "components/MerchantDashboard/Sidebar/Sidebar";
import { useEffect } from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import MerchantBanner from "assets/merchant-form-banner.png";
import ProductPanel from "components/MerchantDashboard/DashboardFeatures/MDProduct/ProductPanel";
import OrderPanel from "components/MerchantDashboard/DashboardFeatures/MDOrder/OrderPanel";
import HomePanel from "./DashboardFeatures/MDHome/HomePanel";
const backgroundStyling = {
  background: `url(${MerchantBanner})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};
function MerchantDashboard(props) {
  const { match, location } = props;
  useEffect(() => {});
  return (
    <div className="merchant-dashboard-container">
      <NavBar hideBreadcrumb={true} merchant={true} fixed={true} />
      <div className="main-dashboard-wrapper">
        <div className="dashboard-side-bar">
          <Sidebar />
        </div>
        <div className="dashboard-panel">
          <Switch>
            <Route exact path={`${match.path}/provider`} component={HomePanel}>
              <Redirect to={`${match.path}/provider/my-restaurant`} />
            </Route>
            <Route exact path={`${match.path}/order`} component={OrderPanel}>
              <Redirect to={`${match.path}/product/my-product`} />
            </Route>

            <Route
              exact
              path={`${match.path}/product`}
              component={ProductPanel}
            >
              <Redirect to={`${match.path}/product/my-product`} />
            </Route>

            <Route exact path={`${match.path}`}>
              <Redirect to={`${match.path}/provider/my-restaurant`} />
            </Route>
            <Route exact path={`${match.path}/provider`}>
              <Redirect to={`${match.path}/provider/my-restaurant`} />
            </Route>
            <Route exact path={`${match.path}/order`}>
              <Redirect to={`${match.path}/order/my-order`} />
            </Route>

            <Route
              exact
              path={`${match.path}/order/:name`}
              component={OrderPanel}
            />
            <Route
              exact
              path={`${match.path}/product/:name`}
              component={ProductPanel}
            />
            <Route
              exact
              path={`${match.path}/provider/:name`}
              component={HomePanel}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default withRouter(MerchantDashboard);
