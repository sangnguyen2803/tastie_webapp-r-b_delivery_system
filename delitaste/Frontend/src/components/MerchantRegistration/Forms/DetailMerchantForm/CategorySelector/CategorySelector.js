import { Fragment } from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCheck } from "@fortawesome/fontawesome-free-solid";
import Tag from "components/Commons/Tag/Tag";
import Checkbox from "react-custom-checkbox";

import "./CategorySelector.scss";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";

import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons";

function CategorySelector(props) {
  const [categoryList, setCategoryList] = useState(props.list);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const updateSearchTerms = (e) => setSearchTerm(e.target.value);

  useEffect(() => {
    if (searchTerm) {
      const results =
        searchTerm.length > 1
          ? props.list.filter((item) => item.categoryName.includes(searchTerm))
          : props.list.filter((item) =>
              item.categoryName.startsWith(searchTerm)
            );

      if (results.length !== 0) setCategoryList(results);
      return;
    }
    setCategoryList(props.list);
  }, [searchTerm]);
  return (
    <Fragment>
      <div className="category-search-container">
        <input
          name="term"
          className="category-search-term"
          type="text"
          placeholder="Search category..."
          onChange={(e) => updateSearchTerms(e)}
        />
        <FontAwesomeIcon className="category-search-icon" icon={faSearch} />
      </div>
      <div className="category-selection-wrapper">
        <span className="category-selection-title">{props.title}</span>
        <div className="option-container">
          {categoryList.map((category) => (
            <div className="option-row" key={category.id}>
              <Checkbox
                checked={
                  selectedCategory.indexOf(category.id) !== -1 ? true : false
                }
                disabled={
                  selectedCategory.length < props.required ||
                  selectedCategory.indexOf(category.id) !== -1
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
                    setSelectedCategory([...selectedCategory, category.id]);
                    return;
                  } else {
                    let index = selectedCategory.indexOf(category.id);
                    if (index != -1) {
                      var array = [...selectedCategory];
                      array.splice(index, 1);
                      setSelectedCategory(array);
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
                label={category.categoryName}
              />
            </div>
          ))}
        </div>
      </div>
      <ButtonGroup float={"flex-end"} direction={"row"} gap={20} mgTop={25}>
        <Button
          label="Cancel"
          type="secondary"
          onClick={props.close}
          width={100}
        />
        <Button label="Save" type="primary" width={100} />
      </ButtonGroup>
    </Fragment>
  );
}

export default CategorySelector;
