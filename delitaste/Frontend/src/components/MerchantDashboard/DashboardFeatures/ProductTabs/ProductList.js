import { Fragment, useEffect } from "react";
import { Redirect, useSearchParams } from "react-router-dom";

function ProductList(props) {
  if (props.current === 0)
    return <div className="panel-detail-wrapper">Số 1</div>;
  if (props.current === 1)
    return <div className="panel-detail-wrapper">Numero 2</div>;
  if (props.current === 2)
    return <div className="panel-detail-wrapper">Number 3</div>;
  return <></>;
}

export default ProductList;
