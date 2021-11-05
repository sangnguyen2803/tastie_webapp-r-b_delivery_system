import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import "./Breadcrumbs.css";
const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <>
      <div className="breadcrumb">
        {breadcrumbs.map(({ match, breadcrumb }) => (
          <Link to={match.url}>{breadcrumb} /</Link>
        ))}
      </div>
    </>
  );
};

export default Breadcrumbs;
