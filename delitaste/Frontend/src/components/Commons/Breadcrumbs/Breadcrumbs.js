import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/fontawesome-free-solid";
import "./Breadcrumbs.css";
import { routeConfig } from "screens/routeConfig";
import { noAuto } from "@fortawesome/fontawesome-svg-core";
const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs(routeConfig);
  const isLast = (ci) => {
    return ci === breadcrumbs.length - 1;
  };
  return (
    <>
      <div className="breadcrumb">
        {breadcrumbs.map(({ match, breadcrumb }, index) =>
          breadcrumbs.length > 1 && breadcrumbs.length <= 6 ? (
            <li>
              <Link className="prev-crumbs" to={match.url}>
                <span>{breadcrumb}</span>
              </Link>
            </li>
          ) : (
            <></>
          )
        )}
      </div>
    </>
  );
};

export default Breadcrumbs;
