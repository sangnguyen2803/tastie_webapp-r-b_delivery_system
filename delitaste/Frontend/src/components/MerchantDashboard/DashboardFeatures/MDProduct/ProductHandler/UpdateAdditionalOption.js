import { Fragment } from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSave,
  faTrashAlt,
} from "@fortawesome/fontawesome-free-solid";
import Tag from "components/Commons/Tag/Tag";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import "./AdditionalOption.scss";
import "./ProductHandler.scss";
import "style/Common.scss";
import Checkbox from "react-custom-checkbox";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import AddAdditionalOption from "./AddAdditionalOption";

function UpdateAdditionalOption(props) {
  const [currentId, setCurrentId] = useState(0);
  const [choices, setChoices] = useState([]);
  const [filteredAdditionalOption, setFilteredAdditionalOption] = useState([]);
  useEffect(() => {
    setChoices([]);
    const selectedOption = props.additionalOption.filter(
      (item) => item.name === props.selectedOption
    )[0].optionList;
    console.log(selectedOption);
    setCurrentId(selectedOption.length);
    selectedOption.forEach((item) =>
      setChoices((state) => [
        ...state,
        {
          id: item.id,
          value: item.optionName,
          price: item.additionalPrice,
        },
      ])
    );
    console.log(choices);
  }, [props.selectedOption]);

  return (
    <Fragment>
      {props.additionalOption
        .filter((item) => item.name === props.selectedOption)
        .map((option) => (
          <>
            <div className="ao-head-wrapper">
              <span className="ao-head-title">{props.title}</span>
              <span className="ao-form-input-label-update">
                <span className="ao-form-input-label-update">
                  {option.name}{" "}
                  <span className="sub-text-label">(required)</span>
                </span>
              </span>
              <div className="box-choice-container">
                {choices?.map((choice, index) => (
                  <div className="box-choice" key={choice.id}>
                    <span className="ao-choice-name">Choice {index + 1}</span>
                    <input
                      className="ao-choice-text-field"
                      name={choice.id}
                      type="text"
                      defaultValue={choice.value || ""}
                      placeholder="Option name"
                      style={{ borderRight: "1px solid black" }}
                    />
                    <span className="ao-choice-name">Price</span>
                    <input
                      style={{
                        width: "100px",
                        textAlign: "center",
                        textIndent: "0px",
                      }}
                      className="ao-choice-text-field"
                      name={choice.id}
                      defaultValue={choice.price || ""}
                      type="text"
                    />
                  </div>
                ))}
              </div>
              <div className="ao-add-more-choice">
                <ButtonGroup
                  gap={20}
                  float="flex-start"
                  mgTop={10}
                  mgBottom={5}
                >
                  <Button
                    color={"black"}
                    bglight={true}
                    border={"#5d5d5d 1.5px solid"}
                    width={100}
                    height={35}
                    label="Remove"
                    justifyContent={"center"}
                    prefix={
                      <FontAwesomeIcon
                        className="button-icon"
                        icon={faTrashAlt}
                      />
                    }
                    onClick={() => {
                      if (currentId > 0) {
                        setChoices(
                          choices.filter(
                            (item) => parseInt(item.id) !== currentId - 1
                          )
                        );
                        setCurrentId(currentId - 1);
                      }
                    }}
                  />
                  <Button
                    color={"black"}
                    bglight={true}
                    border={"#5d5d5d 1.5px solid"}
                    width={100}
                    height={35}
                    label="Add"
                    justifyContent={"center"}
                    prefix={
                      <FontAwesomeIcon className="button-icon" icon={faPlus} />
                    }
                    onClick={() => {
                      setChoices((state) => [
                        ...state,
                        {
                          id: currentId,
                          value: "",
                          price: "0",
                        },
                      ]);
                      setCurrentId(currentId + 1);
                    }}
                  />
                </ButtonGroup>
              </div>
            </div>
            <div className="ao-footer">
              <Checkbox
                checked={false}
                icon={
                  <div className="check-icon">
                    <FontAwesomeIcon
                      style={{
                        fontSize: "15px",
                        color: "#2c2c2c",
                      }}
                      icon={faCheck}
                    />
                  </div>
                }
                size={20}
                borderColor={"black"}
                borderRadius={0}
                name="required"
                style={{
                  backgroundColor: "white",
                  cursor: "pointer",
                  border: "1px solid black",
                }}
                labelStyle={{
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#2e2e2e",
                  marginLeft: 15,
                  userSelect: "none",
                }}
                label={"Required"}
              />
              <ButtonGroup
                float={"flex-end"}
                direction={"row"}
                gap={20}
                mgTop={5}
              >
                <Button
                  label="Save"
                  justifyContent={"center"}
                  prefix={
                    <FontAwesomeIcon icon={faSave} style={{ color: "white" }} />
                  }
                  buttonType="primary"
                  width={100}
                />
              </ButtonGroup>
            </div>
          </>
        ))}
    </Fragment>
  );
}

export default UpdateAdditionalOption;
