import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/fontawesome-free-solid";
import "./BubbleSpeech.css";
const BubbleSpeechAnchor = (props) => {
  return (
    <>
      <div className="bubble-speech-anchor-container">
        <span>.</span>
      </div>
    </>
  );
};

export default BubbleSpeechAnchor;
