import React from "react";

const ProgressBar = ({ bgcolor, progress, height, length, ...rest }) => {
  const Parentdiv = {
    height: height,
    backgroundColor: "white",
    borderRadius: 40,
    width: "200px",
    marginTop: 5,
    marginBottom: 10,
  };

  const Childdiv = {
    height: "100%",
    width: `${(progress / length) * 100}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: "right",
  };

  const progresstext = {
    marginLeft: 0,
    fontSize: "12px",
    color: "black",
    fontWeight: 500,
  };

  return (
    <>
      <span style={progresstext}>
        {`${progress}/${length} `} {rest.text}
      </span>
      <div style={Parentdiv}>
        <div style={Childdiv}></div>
      </div>
    </>
  );
};

export default ProgressBar;
