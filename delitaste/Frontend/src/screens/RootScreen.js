import { Fragment } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import store from "store";
//components
import RouteWithSubRoutes from "components/Commons/RouteWithSubRoutes";
import { routes } from "config/routes";

const history = createBrowserHistory({ forceRefresh: true });

function RootScreen(props) {
  return (
    <Fragment>
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
}

export default RootScreen;
