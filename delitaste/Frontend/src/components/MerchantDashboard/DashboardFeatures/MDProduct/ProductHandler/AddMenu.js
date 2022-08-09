import { Fragment } from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCheck, faPlus } from "@fortawesome/fontawesome-free-solid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "components/MerchantRegistration/Forms/DetailMerchantForm/CategorySelector/CategorySelector.scss";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import { addMenuCategoryAPI } from "store/actions/ProviderAction/ProviderAction";
import { getMenuCategoryAPI } from "store/actions/ProductAction/ProductAction";
function AddMenu(props) {
  const [menuName, setMenuName] = useState("");

  const handleAddMenuCategory = async () => {
    const result = await props.addMenuCategoryAPI(
      props.user.provider_id,
      menuName
    );
    if (result) {
      setMenuName("");
      if (props.user.provider_id) {
        var items = await props.getMenuCategoryAPI(props.user.provider_id);
      }
      props.setMenuCategory(items);
    }
  };
  return (
    <Fragment>
      <span className="category-selection-title" style={{ marginBottom: 5 }}>
        Add menu category
      </span>
      <div className="search-product-container" style={{ width: "unset" }}>
        <input
          className="search-product-term"
          type="text"
          name="search"
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
          placeholder="Menu category name"
        />
        <Button
          left={10}
          buttonType="primary"
          width={100}
          height={36}
          radius={"0px"}
          label={"Add"}
          prefix={<FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />}
          onClick={handleAddMenuCategory}
        />
      </div>
      <div className="category-selection-wrapper">
        <div className="option-container" style={{ gap: 10, marginTop: 20 }}>
          {props.menuCategory?.map((category, index) => (
            <div
              style={{
                fontWeight: 500,
                gap: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              key={category.menu_id}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 20,
                  height: 20,
                  color: "#F6F6F6",
                  backgroundColor: "#810000",
                  borderRadius: 50,
                  listStyleType: "none",
                }}
              >
                {index + 1}
              </div>
              <span>{category.name}</span>
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

AddMenu.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  addMenuCategoryAPI: PropTypes.func.isRequired,
  getMenuCategoryAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  connect(mapStateToProps, { addMenuCategoryAPI, getMenuCategoryAPI })(AddMenu)
);
