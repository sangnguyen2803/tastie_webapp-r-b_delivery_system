import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/fontawesome-free-solid";
import "./Tag.scss";

const Tag = (props) => {
  const tagOuterStyle = {
    margin: props.margin || "2% 0.5% 0% 0.5%",
    height: props.height || "20px",
  };
  const textInnerStyle = {
    fontSize: props.tFontSize || "12px",
  };
  return (
    <>
      <div className="tag-wrapper" style={tagOuterStyle}>
        <FontAwesomeIcon className="tag-icon" icon={props.icon || faTag} />
        <span className="tag-text" style={textInnerStyle}>
          {props.text}
        </span>
      </div>
    </>
  );
};

export default Tag;
