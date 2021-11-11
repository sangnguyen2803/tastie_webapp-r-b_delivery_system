import { Fragment } from "react";
import styled from "styled-components";

const ErrorAlert = styled.div`
  color: red;
  font-size: 14px;
  text-align: left;
`;

function FormError(props) {
  return (
    <Fragment>
      <ErrorAlert>This field required</ErrorAlert>
    </Fragment>
  );
}

export default FormError;
