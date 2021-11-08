import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/fontawesome-free-solid";
import "./BubbleSpeech.css";

const BubbleSpeech = (props) => {
  const [bubbleSpeechProperty, setBubbleSpeechProperty] = useState("");
  return (
    <>
      <div className="bubble-speech-container">
        <span>ABCDEF</span>
      </div>
    </>
  );
};

export default BubbleSpeech;
