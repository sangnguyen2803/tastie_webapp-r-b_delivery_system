import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/fontawesome-free-solid";
import "./Tag.scss";
const Tag = (props) => {
  return (
    <>
      <div className="tag-wrapper">
        <FontAwesomeIcon className="tag-icon" icon={props.icon || faTag} />
        <span className="tag-text">{props.text}</span>
      </div>
    </>
  );
};

export default Tag;
