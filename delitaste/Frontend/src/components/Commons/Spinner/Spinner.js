import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import "./Spinner.scss";
import Loader from "react-spinners/ScaleLoader";

const override = css`
  display: block;
  left: 45%;
  top: 35%;
  font-size: 14px;
  color: white;
  z-index: 101;
`;

const Spinner = (props) => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#FFD400");
  if (props.visibility === true)
    return (
      <div className="spinner-wrapper">
        <Loader
          color={color}
          loading={loading}
          css={override}
          margin={10}
          size={90}
          margin={5}
          height={50}
          width={10}
          speedMultiplier={0.8}
          radius={3}
        />
        <span className="spinner-text">Please wait for a while...</span>
      </div>
    );
};

export default Spinner;
