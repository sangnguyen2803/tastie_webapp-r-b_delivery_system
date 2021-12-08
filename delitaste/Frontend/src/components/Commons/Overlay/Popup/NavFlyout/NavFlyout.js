import { withRouter } from "react-router-dom";
import NavFlyoutAnchor from "./NavFlyoutAnchor";
import "./NavFlyout.scss";

const NavFlyout = (props) => {
  return (
    <>
      <NavFlyoutAnchor />
      <div
        className="nav-fly-out-container"
        style={{
          width: props.width,
          height: props.height,
          margin: props.margin,
        }}
      >
        {props.components}
      </div>
    </>
  );
};

export default withRouter(NavFlyout);
