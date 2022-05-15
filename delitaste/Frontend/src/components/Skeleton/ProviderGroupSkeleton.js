import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "style/SkeletonCommon.scss";
import { Fragment } from "react";

function ProductGroupSkeleton(props) {
  const { col } = props;
  return (
    <Fragment>
      <div className="skeleton-row">
        {[...Array(col)].map((element, index) => (
          <div className="skeleton-box-vertical" key={index}>
            <Skeleton width={250} height={135} />
            <Skeleton width={250} height={22} />
            <Skeleton width={250} height={12} />
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default ProductGroupSkeleton;
