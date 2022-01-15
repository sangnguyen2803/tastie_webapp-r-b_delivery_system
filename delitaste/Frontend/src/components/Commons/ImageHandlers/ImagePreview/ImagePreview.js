import { Fragment, useState, useEffect, useRef } from "react";
import "style/Common.scss";
import DefaultImage from "assets/image-preview-default.png";
const ImagePreview = ({ file }) => {
  const [preview, setPreview] = useState();
  useEffect(() => {
    if (!file) {
      setPreview(DefaultImage);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return <img src={preview} className="file-image-preview" alt="preview" />;
};

export default ImagePreview;
