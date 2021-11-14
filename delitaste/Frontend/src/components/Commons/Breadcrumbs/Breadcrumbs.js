import { Link } from "react-router-dom";
import { useState } from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faAngleDoubleLeft,
} from "@fortawesome/fontawesome-free-solid";
import "./Breadcrumbs.scss";
import { routes } from "config/routes";
import { noAuto } from "@fortawesome/fontawesome-svg-core";
import BreadcrumbIcon from "assets/Icon/BreadcrumbIcon.jpg";
const Breadcrumbs = (props) => {
  const breadcrumbs = useBreadcrumbs(routes);
  const isLast = (ci) => {
    return ci === breadcrumbs.length - 1;
  };
  const [breadcrumbVisibility, setBreadcrumbVisibility] = useState(false);
  return (
    <>
      <FontAwesomeIcon
        className="breadcrumb-icon"
        icon={!breadcrumbVisibility ? faAngleDoubleRight : faAngleDoubleLeft}
        onClick={() => {
          setBreadcrumbVisibility((prev) => !prev);
        }}
      />
      {breadcrumbVisibility ? (
        <div className="breadcrumb">
          {breadcrumbs.map(({ match, breadcrumb }, index) =>
            breadcrumbs.length > 0 && breadcrumbs.length <= 6 ? (
              <li key={match.url}>
                <Link className="prev-crumbs" to={match.url}>
                  <span>{breadcrumb}</span>
                </Link>
              </li>
            ) : (
              <></>
            )
          )}
        </div>
      ) : null}
    </>
  );
};

export default Breadcrumbs;
