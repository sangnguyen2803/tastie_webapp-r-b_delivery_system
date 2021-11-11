import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/fontawesome-free-solid";
import "./LanguageSettingPanel.scss";
import "style/Common.scss";
import { useTranslation } from "react-i18next";
import { browserHistory } from "react-router";

const LanguageSettingPanel = (props) => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const languages = [
    { key: "vi", title: "Tiếng Việt" },
    { key: "en", title: "English" },
    { key: "fr", title: "Français" },
  ];
  const languagePanelHandler = async () => {
    i18n.changeLanguage(selectedLanguage);
  };
  return (
    <div className="language-panel">
      <div className="panel-title">Language Settings:</div>
      <span className="panel-description">
        Select the language you prefer for browsing, shopping, and
        communications.
      </span>
      <div className="language-select-container">
        <div className="language-select panel-label">Language:</div>
        <select
          onChange={(e) => {
            setSelectedLanguage(e.target.value);
          }}
          className="language-select-wrapper panel-text-field"
        >
          <option defaultValue={i18n.language} hidden>
            {languages
              .filter((language) => language.key === i18n.language)
              .map((currentLanguage) => currentLanguage.title)}
          </option>
          {languages.map((language) => (
            <option key={language.key} value={language.key}>
              {language.title}
            </option>
          ))}
        </select>
      </div>
      {selectedLanguage}
      <div
        onClick={languagePanelHandler}
        className="btn-panel btn-language-panel-position"
      >
        Save
      </div>
    </div>
  );
};

export default LanguageSettingPanel;
