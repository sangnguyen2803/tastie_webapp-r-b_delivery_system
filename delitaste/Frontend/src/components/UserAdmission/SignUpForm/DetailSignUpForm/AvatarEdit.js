import React, { useState } from "react";
import "./AvatarEdit.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/fontawesome-free-solid";
import AvatarEditor from "react-avatar-editor";

function AvatarEdit({
  userProfilePic,
  setUserProfilePic,
  avatarState,
  setAvatarState,
}) {
  const [editor, setEditor] = useState(null);
  const [scaleValue, setScaleValue] = useState(1);

  const onCrop = () => {
    console.log(editor);
    if (editor !== null) {
      console.log(editor.getImageScaledToCanvas().toDataURL());
      setUserProfilePic(editor.getImageScaledToCanvas().toDataURL());
    }
  };
  const onScaleChange = (e) => {
    setScaleValue(parseFloat(e.target.value));
  };

  return (
    <>
      {avatarState === "editting" ? (
        <div className="avatar-edit-background">
          <div className="avatar-edit-wrapper">
            <div className="avatar-edit-components">
              <div className="title-avatar-edit-wrapper">
                <span className="avatar-edit-title">Style your avatar</span>
                <FontAwesomeIcon
                  onClick={() => setAvatarState("edit")}
                  className="form-icon"
                  icon={faTimes}
                />
              </div>
              <div className="avatar-editor-wrapper">
                <div className="avatar-editor-section">
                  <AvatarEditor
                    image={userProfilePic}
                    width={250}
                    height={250}
                    border={20}
                    color={[255, 255, 255, 0.6]} // RGBA
                    scale={scaleValue}
                    ref={(e) => setEditor(e)}
                    rotate={0}
                  />
                  <input
                    style={{ width: "30%" }}
                    type="range"
                    value={scaleValue}
                    name="points"
                    min="1"
                    max="40"
                    onChange={(e) => onScaleChange(e)}
                  />
                </div>
              </div>
              <div className="avatar-edit-options">
                <button className="avatar-edit-cancel">cancel</button>
                <button className="avatar-edit-save" onClick={onCrop}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default AvatarEdit;
