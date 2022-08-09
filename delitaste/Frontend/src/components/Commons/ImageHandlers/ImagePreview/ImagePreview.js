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

  return (
    <img
      height={100}
      width={100}
      style={{
        objectFit: "cover",
        borderRadius: 10,
        border: "2px solid #E6E6E6",
      }}
      src={preview}
      className="file-image-preview"
      alt="preview"
    />
  );
};

export default ImagePreview;
