import { Fragment } from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCheck } from "@fortawesome/fontawesome-free-solid";
import Tag from "components/Commons/Tag/Tag";
import Checkbox from "react-custom-checkbox";

import "components/MerchantRegistration/Forms/DetailMerchantForm/CategorySelector/CategorySelector.scss";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";

function SelectMenuCategory(props) {
  const [categoryList, setCategoryList] = useState(props.list);
  useEffect(() => {
    console.log(categoryList);
  }, [categoryList]);
  return (
    <Fragment>
      <div className="category-selection-wrapper">
        <span className="category-selection-title">{props.title}</span>
        <div className="option-container">
          {props.list?.map((category) => (
            <div className="option-row" key={category.menu_id}>
              <Checkbox
                checked={
                  props.selectedCategory.indexOf(category.menu_id) !== -1
                    ? true
                    : false
                }
                disabled={
                  props.selectedCategory.length < props.required ||
                  props.selectedCategory.indexOf(category.menu_id) !== -1
                    ? false
                    : true
                }
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
                borderColor={"#ffffff"}
                borderRadius={5}
                name="category"
                onChange={(value) => {
                  if (value) {
                    props.setSelectedCategory([
                      ...props.selectedCategory,
                      category.menu_id,
                    ]);
                    return;
                  } else {
                    let index = props.selectedCategory.indexOf(
                      category.menu_id
                    );
                    if (index != -1) {
                      var array = [...props.selectedCategory];
                      array.splice(index, 1);
                      props.setSelectedCategory(array);
                    }
                  }
                }}
                style={{
                  backgroundColor: "white",
                  cursor: "pointer",
                  border: "none",
                }}
                labelStyle={{
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#2e2e2e",
                  marginLeft: 15,
                  userSelect: "none",
                }}
                label={category.name}
              />
            </div>
          ))}
        </div>
      </div>
      <ButtonGroup float={"flex-end"} direction={"row"} gap={20} mgTop={25}>
        <Button
          label="Cancel"
          buttonType="secondary"
          onClick={props.close}
          width={100}
        />
        <Button
          onClick={props.save}
          label="Save"
          buttonType="primary"
          width={100}
        />
      </ButtonGroup>
    </Fragment>
  );
}

export default SelectMenuCategory;
