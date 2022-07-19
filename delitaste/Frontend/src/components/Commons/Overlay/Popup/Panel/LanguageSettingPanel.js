import { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";
//scss
import "./LanguageSettingPanel.scss";
import "style/Common.scss";
//i18next
import { useTranslation } from "react-i18next";

const LanguageSettingPanel = (props) => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const languages = [
    { key: "vi", name: "Tiếng Việt" },
    { key: "en", name: "English" },
    { key: "fr", name: "Français" },
  ];
  const languagePanelHandler = () => {
    i18n.changeLanguage(selectedLanguage);
    const url = `/${selectedLanguage}`;
    props.history.push(url);
  };
  return (
    <Fragment>
      <div className="language-panel">
        <div className="panel-title">Language Settings:</div>
        <span className="panel-description">
          Select the language right below to change current web context.
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
                .map((currentLanguage) => currentLanguage.name)}
            </option>
            {languages.map((language) => (
              <option key={language.key} value={language.key}>
                {language.name}
              </option>
            ))}
          </select>
        </div>
        <div
          onClick={languagePanelHandler}
          className="btn-panel btn-language-panel-position"
        >
          Save
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(LanguageSettingPanel);
