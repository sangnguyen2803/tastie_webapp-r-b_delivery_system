import { Fragment, useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSave,
  faPlus,
  faEye,
} from "@fortawesome/fontawesome-free-solid";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import DialogBox from "components/Commons/Overlay/DialogBox/DialogBox";
import { getProductListAPI } from "store/actions/ProductAction/ProductAction";
import { addMenuCategoryAPI } from "store/actions/ProviderAction/ProviderAction";
function MenuCategoryDetail(props) {
  const { user, getProductListAPI, addMenuCategoryAPI } = props;
  const [categoryName, setCategoryName] = useState("");
  const [menuCategory, setMenuCategory] = useState();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    header: "Add menu category",
    text1: " Are you sure you want to add this menu category?",
    text2:
      "This menu category will be appended at the end of the menu. You can't undo this action.",
  });
  useEffect(() => {
    async function fetchMenuCategory(id) {
      if (id !== -1) {
        var result = await getProductListAPI(id);
        setMenuCategory(result);
      }
    }
    fetchMenuCategory(user.provider_id);
  }, [user.provider_id]);

  const addMenuCategory = async (name) => {
    await addMenuCategoryAPI(user.provider_id, categoryName);
  };
  return (
    <Fragment>
      <div className="panel-detail-wrapper">
        <div className="panel-detail-title">Menu category</div>
        <div className="search-product-container">
          <input
            className="search-product-term"
            type="text"
            name="search"
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Menu category name"
          />

          <Button
            left={10}
            buttonType="primary"
            width={100}
            height={36}
            radius={"0px"}
            label={"Add"}
            prefix={
              <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
            }
            onClick={() => setShowAddDialog(true)}
          />
        </div>
        {menuCategory ? (
          <table border={2} className="table table-wrapper">
            <tbody>
              <tr className="table-row-wrapper">
                <th>Menu category name</th>
                <th>Number of products</th>
                <th>Visible</th>
              </tr>
              {menuCategory?.map((item, index) => (
                <tr className="table-row-wrapper" key={index}>
                  <td
                    className="product-name"
                    style={{
                      textAlign: "left",
                      width: "70%",
                    }}
                  >
                    {item.menu_category_name}
                  </td>
                  <td
                    className="product-name"
                    style={{
                      textAlign: "center",
                      width: "15%",
                    }}
                  >
                    {item.products.length}
                  </td>
                  <td
                    className="product-name"
                    style={{
                      textAlign: "center",
                      width: "15%",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faEye}
                      style={{ color: "#CCCCCC", fontSize: 16, marginRight: 5 }}
                    />
                    Show
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div
            className="menu-table"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: 600,
              fontSize: 14,
              border: "2px solid #E6E6E6",
              textAlign: "center",
            }}
          >
            Your restaurant has 0 menu at the moment.
            <br />
            Please create add your first menu.
          </div>
        )}
      </div>
      <DialogBox
        visibility={showAddDialog}
        headerText={dialogContent.header}
        close={() => setShowAddDialog(false)}
      >
        <div className="dialog-detail-wrapper">
          <div className="dialogbox-content">
            <span className="dialogbox-content-detail-main">
              {dialogContent.text1}
            </span>
            <span className="dialogbox-content-detail-sub">
              {dialogContent.text2}
            </span>
          </div>
          <div className="dialogbox-action">
            <ButtonGroup gap={5} mgRight={5}>
              <Button
                color={"white"}
                bgColor={"#800000"}
                justifyContent={"center"}
                gap={"10px"}
                width={80}
                height={30}
                label={"Cancel"}
                onClick={() => setShowAddDialog(false)}
              />
              <Button
                color={"white"}
                bgColor={"#800000"}
                justifyContent={"center"}
                gap={"10px"}
                width={80}
                height={30}
                label={"OK"}
                onClick={() => {
                  addMenuCategory();
                  setShowAddDialog(false);
                }}
              />
            </ButtonGroup>
          </div>
        </div>
      </DialogBox>
    </Fragment>
  );
}

MenuCategoryDetail.propTypes = {
  user: PropTypes.object.isRequired,
  provider: PropTypes.object.isRequired,
  getProductListAPI: PropTypes.func.isRequired,
  addMenuCategoryAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  provider: state.ProviderReducer,
});

export default withRouter(
  connect(mapStateToProps, { getProductListAPI, addMenuCategoryAPI })(
    MenuCategoryDetail
  )
);
