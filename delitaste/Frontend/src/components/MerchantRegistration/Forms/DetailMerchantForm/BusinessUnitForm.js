import "./DetailMerchantForm.scss";
import "style/Common.scss";
import { useEffect, useState, Fragment } from "react";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "components/Commons/Overlay/Popup/Modal/Modal";
import { validateMerchantForm3 } from "utils/FormUtils/MerchantFormValidate";
import FormError from "components/Commons/ErrorHandlers/FormError/FormError";
import Tag from "components/Commons/Tag/Tag";
import FormHeader from "./FormHeader/FormHeader";
import CategorySelector from "components/MerchantRegistration/Forms/DetailMerchantForm/CategorySelector/CategorySelector";
import {
  getCategoryAPI,
  updateBusinessUnitInfoFormAPI,
} from "store/actions/ProviderAction/ProviderAction";
import { setDialogBox } from "store/actions/UIComponentAction/DialogBoxAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk, faImage } from "@fortawesome/fontawesome-free-solid";
import Switch from "react-switch";
import axios from "axios";
const formHeaderText = {
  title: "3. Business unit information",
  headerText:
    "Set up your restaurant's information to attract and get more customers.",
  bodyText:
    "Make your business unit more accessible to the customers by providing as detailed information regarding your product as possible in the following format.",
};

const initialValues = {
  operating: {
    sunday: {
      openTime: "00:00",
      closeTime: "23:59",
    },
    monday: {
      openTime: "00:00",
      closeTime: "23:59",
    },
    tuesday: {
      openTime: "00:00",
      closeTime: "23:59",
    },
    wednesday: {
      openTime: "00:00",
      closeTime: "23:59",
    },
    thursday: {
      openTime: "00:00",
      closeTime: "23:59",
    },
    friday: {
      openTime: "00:00",
      closeTime: "23:59",
    },
    saturday: {
      openTime: "00:00",
      closeTime: "23:59",
    },
  },
  rushHour: "",
  searchKeyword: "",
  description: "",
};

function BusinessUnitForm(props) {
  const [showRestaurantCategory, setShowRestaurantCategory] = useState(false);
  const [showCuisineCategory, setShowCuisineCategory] = useState(false);
  const [restaurantCategory, setRestaurantCategory] = useState([]);
  const [cuisineCategory, setCuisineCategory] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState([]);

  useEffect(async () => {
    try {
      let restaurantCategory = await props.getCategoryAPI("provider");
      let cuisineCategory = await props.getCategoryAPI("cuisine");
      setRestaurantCategory(restaurantCategory);
      setCuisineCategory(cuisineCategory);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (showRestaurantCategory || showCuisineCategory) {
      document.body.style.position = "fixed";
      return;
    }
    document.body.style.position = "unset";
    document.body.style.overflowY = "scroll";
  }, [showRestaurantCategory, showCuisineCategory]);
  /*
  const selectedCuisineCategory = [
    { id: 1, categoryName: "Milk tea" },
    { id: 2, categoryName: "Coffee" },
    { id: 3, categoryName: "Fastfood & StreetFood" },
    { id: 4, categoryName: "ThaiFood" },
    { id: 5, categoryName: "Dessert" },
  ];

  const selectedRestaurantCategory = [
    { id: 1, categoryName: "Milk tea" },
    { id: 2, categoryName: "Coffee" },
    { id: 3, categoryName: "Fastfood & StreetFood" },
    { id: 4, categoryName: "ThaiFood" },
    { id: 5, categoryName: "Dessert" },
    { id: 6, categoryName: "Bubble Tea" },
    { id: 7, categoryName: "Macaroni" },
    { id: 8, categoryName: "Icecream" },
    { id: 9, categoryName: "Candy" },
    { id: 10, categoryName: "Cake" },
    { id: 11, categoryName: "Chewy Chewy" },
    { id: 12, categoryName: "Hotpot" },
    { id: 13, categoryName: "Fried Chicken" },
    { id: 14, categoryName: "Pizza" },
    { id: 15, categoryName: "Dessert" },
    { id: 16, categoryName: "Milk tea" },
    { id: 17, categoryName: "Coffee" },
    { id: 18, categoryName: "Takoyaki" },
    { id: 19, categoryName: "Spicy Food" },
    { id: 20, categoryName: "Beefsteak" },
    { id: 28, categoryName: "Sushi & Sashimi" },
    { id: 29, categoryName: "Noodle" },
    { id: 30, categoryName: "Korean Food" },
    { id: 31, categoryName: "Machiato" },
    { id: 32, categoryName: "Coffee" },
    { id: 33, categoryName: "Fastfood & StreetFood" },
    { id: 34, categoryName: "ThaiFood" },
    { id: 35, categoryName: "Dessert" },
    { id: 36, categoryName: "Milk tea" },
    { id: 37, categoryName: "Coffee" },
    { id: 38, categoryName: "Fastfood & StreetFood" },
    { id: 39, categoryName: "ThaiFood" },
    { id: 40, categoryName: "Dessert" },
  ];
*/
  //weekday-switchers-state
  const [checkedSunday, setCheckedSunday] = useState(true);
  const [checkedMonday, setCheckedMonday] = useState(true);
  const [checkedTuesday, setCheckedTuesday] = useState(true);
  const [checkedWednesday, setCheckedWednesday] = useState(true);
  const [checkedThursday, setCheckedThursday] = useState(true);
  const [checkedFriday, setCheckedFriday] = useState(true);
  const [checkedSaturday, setCheckedSaturday] = useState(true);
  const [providerImage, setProviderImage] = useState(null);
  const [providerReview, setProviderReview] = useState(null);
  const [facadeReview, setFacadeReview] = useState(null);
  const [coverReview, setCoverReview] = useState(null);
  const handleSubmitForm = async (values) => {
    const { operating, rushHour, searchKeyword, description } = values;
    if (!rushHour || !searchKeyword || !description) {
      await props.setDialogBox(
        "Please fill in required fields.",
        "Fail to submit this form",
        3000
      );
      return;
    }
    const formData = {
      keyword: searchKeyword,
      description: description,
      avatar: "",
      cover_picture: "",
      facade_photo: "",
      provider_category_id: selectedRestaurant,
      cuisine_category_id: selectedCuisine,
      rush_hour: rushHour,
      operating: {
        sunday: {
          is_day_off: checkedSunday,
          open_time: operating.sunday.openTime,
          close_time: operating.sunday.closeTime,
        },
        monday: {
          is_day_off: checkedMonday,
          open_time: operating.monday.openTime,
          close_time: operating.monday.closeTime,
        },
        tuesday: {
          is_day_off: checkedTuesday,
          open_time: operating.tuesday.openTime,
          close_time: operating.tuesday.closeTime,
        },
        wednesday: {
          is_day_off: checkedWednesday,
          open_time: operating.wednesday.openTime,
          close_time: operating.wednesday.closeTime,
        },
        thursday: {
          is_day_off: checkedThursday,
          open_time: operating.thursday.openTime,
          close_time: operating.thursday.closeTime,
        },
        friday: {
          is_day_off: checkedFriday,
          open_time: operating.friday.openTime,
          close_time: operating.friday.closeTime,
        },
        saturday: {
          is_day_off: checkedSaturday,
          open_time: operating.saturday.openTime,
          close_time: operating.saturday.closeTime,
        },
      },
    };
    if (!props.match.params.id) return;
    const updateStatus = await props.updateBusinessUnitInfoFormAPI(
      props.match.params.id,
      formData
    );
    const uploadImageConfig = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    const image_upload_endpoint = `https://tastie18vp.com/upload/provider/avatar`;
    let image_data = new FormData();
    image_data.append("provider_id", props.match.params.id);
    image_data.append("upload", providerImage);
    const response = await axios.post(
      image_upload_endpoint,
      image_data,
      uploadImageConfig
    );
    if (!response.data.status) return;
    if (updateStatus) props.history.push("product-detail");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateMerchantForm3}
      validateOnChange={false}
      onSubmit={(values) => handleSubmitForm(values)}
    >
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        return (
          <>
            <Form className="merchant-form-container">
              <FormHeader
                title={formHeaderText.title}
                headerText={formHeaderText.headerText}
                bodyText={formHeaderText.bodyText}
              />{" "}
              <div className="merchant-form-wrapper">
                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-switch-label-wrapper">
                    Operation time{" "}
                    <FontAwesomeIcon className="asterisk" icon={faAsterisk} />
                  </div>
                  <div className="field-bottom-side-wrapper">
                    <span className="field-description">
                      Once set operation time, your restaurant must be open at
                      these times. <br />
                      Operation time can be changed right after merchant
                      registration is completed.
                    </span>
                  </div>
                  <div className="merchant-form-switch-wrapper">
                    <div className="operation-time-wrapper">
                      <Switch
                        onChange={() => {
                          setCheckedSunday((prev) => !prev);
                        }}
                        checked={checkedSunday}
                        onColor={"#9C1818"}
                      />
                      <span className="weekday-label">Sunday</span>
                      <span className="weekday-status-label">
                        {checkedSunday ? "Open" : "Closed"}
                      </span>
                      {checkedSunday === true ? (
                        <>
                          <Field
                            className="form-text-field"
                            type="text"
                            name="operating.sunday.openTime"
                            placeholder="00:00"
                            maxLength={50}
                            autoComplete="on"
                          />
                          <Field
                            className="form-text-field"
                            type="text"
                            name="operating.sunday.closeTime"
                            placeholder="00:00"
                            maxLength={50}
                            autoComplete="on"
                          />
                        </>
                      ) : null}
                    </div>

                    <div className="operation-time-wrapper">
                      <Switch
                        onChange={() => {
                          setCheckedMonday((prev) => !prev);
                        }}
                        checked={checkedMonday}
                        onColor={"#9C1818"}
                      />
                      <span className="weekday-label">Monday</span>
                      <span className="weekday-status-label">
                        {checkedMonday ? "Open" : "Closed"}
                      </span>
                      {checkedMonday === true ? (
                        <Fragment>
                          <Field
                            className="form-text-field"
                            type="text"
                            name="operating.monday.openTime"
                            placeholder="00:00"
                            maxLength={50}
                            autoComplete="on"
                          />
                          <Field
                            className="form-text-field"
                            type="text"
                            name="operating.monday.closeTime"
                            placeholder="00:00"
                            maxLength={50}
                            autoComplete="on"
                          />
                        </Fragment>
                      ) : null}
                    </div>

                    <div className="operation-time-wrapper">
                      <Switch
                        onChange={() => {
                          setCheckedTuesday((prev) => !prev);
                        }}
                        checked={checkedTuesday}
                        onColor={"#9C1818"}
                      />
                      <span className="weekday-label">Tuesday</span>
                      <span className="weekday-status-label">
                        {checkedTuesday ? "Open" : "Closed"}
                      </span>
                      {checkedTuesday === true ? (
                        <>
                          <Field
                            className="form-text-field"
                            type="text"
                            name="operating.tuesday.openTime"
                            placeholder="00:00"
                            maxLength={50}
                            autoComplete="on"
                          />
                          <Field
                            className="form-text-field"
                            type="text"
                            name="operating.tuesday.closeTime"
                            placeholder="00:00"
                            maxLength={50}
                            autoComplete="on"
                          />
                        </>
                      ) : null}
                    </div>

                    <div className="operation-time-wrapper">
                      <Switch
                        onChange={() => {
                          setCheckedWednesday((prev) => !prev);
                        }}
                        checked={checkedWednesday}
                        onColor={"#9C1818"}
                      />
                      <span className="weekday-label">Wednesday</span>
                      <span className="weekday-status-label">
                        {checkedWednesday ? "Open" : "Closed"}
                      </span>
                      {checkedWednesday === true ? (
                        <>
                          <Field
                            className="form-text-field"
                            type="text"
                            name="operating.wednesday.openTime"
                            placeholder="00:00"
                            maxLength={50}
                            autoComplete="on"
                          />
                          <Field
                            className="form-text-field"
                            type="text"
                            name="operating.wednesday.closeTime"
                            placeholder="00:00"
                            maxLength={50}
                            autoComplete="on"
                          />
                        </>
                      ) : null}
                    </div>

                    <div className="operation-time-wrapper">
                      <Switch
                        onChange={() => {
                          setCheckedThursday((prev) => !prev);
                        }}
                        checked={checkedThursday}
                        onColor={"#9C1818"}
                      />
                      <span className="weekday-label">Thursday</span>
                      <span className="weekday-status-label">
                        {checkedThursday ? "Open" : "Closed"}
                      </span>
                      {checkedThursday === true ? (
                        <>
                          <Field
                            className="form-text-field"
                            type="text"
                            name="operating.thursday.openTime"
                            placeholder="00:00"
                            maxLength={50}
                            autoComplete="on"
                          />
                          <Field
                            className="form-text-field"
                            type="text"
                            name="operating.thursday.closeTime"
                            placeholder="00:00"
                            maxLength={50}
                            autoComplete="on"
                          />
                        </>
                      ) : null}
                    </div>

                    <div className="operation-time-wrapper">
                      <Switch
                        onChange={() => {
                          setCheckedFriday((prev) => !prev);
                        }}
                        checked={checkedFriday}
                        onColor={"#9C1818"}
                      />
                      <span className="weekday-label">Friday</span>
                      <span className="weekday-status-label">
                        {checkedFriday ? "Open" : "Closed"}
                      </span>
                      {checkedFriday === true ? (
                        <>
                          <Field
                            className="form-text-field"
                            type="text"
                            name="operating.friday.openTime"
                            placeholder="00:00"
                            maxLength={50}
                            autoComplete="on"
                          />
                          <Field
                            className="form-text-field"
                            type="text"
                            name="operating.friday.closeTime"
                            placeholder="00:00"
                            maxLength={50}
                            autoComplete="on"
                          />
                        </>
                      ) : null}
                    </div>

                    <div className="operation-time-wrapper">
                      <Switch
                        onChange={() => {
                          setCheckedSaturday((prev) => !prev);
                        }}
                        checked={checkedSaturday}
                        onColor={"#9C1818"}
                      />
                      <span className="weekday-label">Saturday</span>
                      <span className="weekday-status-label">
                        {checkedSaturday ? "Open" : "Closed"}
                      </span>
                      {checkedSaturday === true ? (
                        <>
                          <Field
                            className="form-text-field"
                            type="text"
                            name="operating.saturday.openTime"
                            placeholder="00:00"
                            maxLength={50}
                            autoComplete="on"
                          />
                          <Field
                            className="form-text-field"
                            type="text"
                            name="operating.saturday.closeTime"
                            placeholder="00:00"
                            maxLength={50}
                            autoComplete="on"
                          />
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">Rush hour</div>
                  <div className="merchant-form-input-wrapper form-input-small">
                    <Field
                      className="form-text-field"
                      type="text"
                      name="rushHour"
                      placeholder="Rush hour"
                      maxLength={50}
                      autoComplete="on"
                    />
                  </div>
                </div>
                <div className="field-bottom-side-wrapper">
                  <FormError
                    err={
                      errors.rushHour && touched.rushHour ? errors.rushHour : ""
                    }
                    spaceBetween={0}
                    fontSize={12}
                    fontWeight={"bold"}
                  />
                </div>
                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">
                    Search keywords
                  </div>
                  <div className="field-bottom-side-wrapper">
                    <span className="field-description">
                      Keywords separated by commas. Max. 25 characters.
                    </span>
                  </div>
                  <div className="merchant-form-input-wrapper">
                    <Field
                      className="form-text-field"
                      type="text"
                      name="searchKeyword"
                      placeholder="Search Keyword"
                      maxLength={25}
                      autoComplete="on"
                    />
                  </div>
                </div>

                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">Description</div>
                  <div className="field-bottom-side-wrapper">
                    <span className="field-description">
                      Max. 150 characters.
                    </span>
                  </div>
                  <div className="merchant-form-input-wrapper">
                    <Field
                      className="form-text-field-textarea"
                      component="textarea"
                      name="description"
                      placeholder="Restaurant Description"
                      maxLength={200}
                    />
                  </div>
                </div>

                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">
                    Restaurant category
                  </div>
                  <div className="field-bottom-side-wrapper">
                    <span className="field-description">
                      Select at least 1 category and maximum 3 categories.
                    </span>
                  </div>
                  <div className="merchant-form-input-wrapper">
                    <div className="select-category-button-wrapper">
                      <button
                        type="button"
                        className="btn-category"
                        onClick={() => setShowRestaurantCategory(true)}
                      >
                        Select category
                      </button>
                    </div>
                  </div>
                </div>
                <div className="tag-container">
                  {restaurantCategory?.map((tag, index) =>
                    selectedRestaurant.includes(tag.category_id) ? (
                      <Tag key={tag.category_id} text={tag.category_name} />
                    ) : (
                      <></>
                    )
                  )}
                </div>

                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">
                    Cuisine category
                  </div>
                  <div className="field-bottom-side-wrapper">
                    <span className="field-description">
                      Select at least 1 category and maximum 2 categories.
                    </span>
                  </div>
                  <div className="merchant-form-input-wrapper">
                    <div className="select-category-button-wrapper">
                      <button
                        type="button"
                        className="btn-category"
                        onClick={() => setShowCuisineCategory(true)}
                      >
                        Select category
                      </button>
                    </div>
                  </div>
                </div>
                <div className="tag-container">
                  {cuisineCategory?.map((tag, index) =>
                    selectedCuisine.includes(tag.category_id) ? (
                      <Tag key={tag.category_id} text={tag.category_name} />
                    ) : (
                      <></>
                    )
                  )}
                </div>
                <div className="field-group-title">
                  Required rstaurant photo:
                </div>
                <div className="field-group-wrapper">
                  <div className="field-bottom-side-wrapper">
                    <span className="field-description">
                      Please use popular dish or logo of your shop to attract
                      more customers <br />
                      <FontAwesomeIcon className="asterisk" icon={faAsterisk} />
                      Note: If pictures provided don't satisfy our requirements,
                      Tastie will replace them with Tastie logo so that your
                      shop can start to sell as soon as possible. You can still
                      change those photos later.
                    </span>
                  </div>
                  <div className="merchant-form-field-wrapper-file">
                    <div className="merchant-form-label-wrapper-file">
                      Cover Picture
                    </div>
                    <div className="merchant-form-input-wrapper-file">
                      <div className="business-registration-browse">
                        <label className="form-file-field-2" for="upload">
                          <FontAwesomeIcon
                            className="upload-icon"
                            icon={faImage}
                          />
                          <span>Choose a file to upload</span>
                          <input
                            type="file"
                            id="upload"
                            onChange={(event) => {
                              const objectUrl = URL.createObjectURL(
                                event.target.files[0]
                              );
                              setCoverReview(objectUrl);
                            }}
                          />
                        </label>
                      </div>
                      {coverReview && (
                        <img
                          src={coverReview}
                          height={100}
                          width={100}
                          style={{
                            objectFit: "cover",
                            borderRadius: 10,
                            border: "2px solid #E6E6E6",
                          }}
                          alt="review"
                        />
                      )}
                    </div>
                  </div>
                  <div className="merchant-form-field-wrapper-file">
                    <div className="merchant-form-label-wrapper-file">
                      Facade Photo
                    </div>
                    <div className="merchant-form-input-wrapper-file">
                      <div className="business-registration-browse">
                        <label className="form-file-field-2" for="upload">
                          <FontAwesomeIcon
                            className="upload-icon"
                            icon={faImage}
                          />
                          <span>Choose a file to upload</span>
                          <input
                            type="file"
                            id="upload"
                            onChange={(event) => {
                              const objectUrl = URL.createObjectURL(
                                event.target.files[0]
                              );
                              setFacadeReview(objectUrl);
                            }}
                          />
                        </label>
                      </div>{" "}
                      {facadeReview && (
                        <img
                          src={facadeReview}
                          height={100}
                          width={100}
                          style={{
                            objectFit: "cover",
                            borderRadius: 10,
                            border: "2px solid #E6E6E6",
                          }}
                          alt="review"
                        />
                      )}
                    </div>
                  </div>
                  <div className="merchant-form-field-wrapper-file">
                    <div className="merchant-form-label-wrapper-file">
                      Provider Image:
                    </div>
                    <div className="merchant-form-input-wrapper-file">
                      <div className="business-registration-browse">
                        <label className="form-file-field-2" for="upload">
                          <FontAwesomeIcon
                            className="upload-icon"
                            icon={faImage}
                          />
                          <span>Choose a file to upload</span>
                          <input
                            type="file"
                            id="upload"
                            onChange={(event) => {
                              setProviderImage(event.target.files[0]);
                              const objectUrl = URL.createObjectURL(
                                event.target.files[0]
                              );
                              setProviderReview(objectUrl);
                            }}
                          />
                        </label>
                      </div>
                      {providerReview && (
                        <img
                          src={providerReview}
                          height={100}
                          width={100}
                          style={{
                            objectFit: "cover",
                            borderRadius: 10,
                            border: "2px solid #E6E6E6",
                          }}
                          alt="review"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="btn-merchant-registration-wrapper">
                <button className="btn-merchant-registration-back">Back</button>
                <button
                  className="btn-merchant-registration-next"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </Form>
            <Modal
              openModal={showRestaurantCategory}
              title={"Restaurant Category"}
              width={60}
              height={500}
              closeModal={() => {
                setShowRestaurantCategory(false);
              }}
            >
              <CategorySelector
                save={() => setShowRestaurantCategory(false)}
                selectedCategory={selectedRestaurant}
                setSelectedCategory={setSelectedRestaurant}
                list={restaurantCategory}
                title={"Select categories for restaurant's dishes (maximum: 3)"}
                required={3}
              />
            </Modal>
            <Modal
              openModal={showCuisineCategory}
              title={"Cuisine Category"}
              width={60}
              height={500}
              closeModal={() => {
                setShowCuisineCategory(false);
              }}
            >
              <CategorySelector
                save={() => {
                  setShowCuisineCategory(false);
                }}
                selectedCategory={selectedCuisine}
                setSelectedCategory={setSelectedCuisine}
                list={cuisineCategory}
                title={"Select categories for your restaurant (maximum: 2)"}
                required={2}
              />
            </Modal>
          </>
        );
      }}
    </Formik>
  );
}

BusinessUnitForm.propTypes = {
  getCategoryAPI: PropTypes.func.isRequired,
  updateBusinessUnitInfoFormAPI: PropTypes.func.isRequired,
  setDialogBox: PropTypes.func.isRequired,
};

export default withRouter(
  connect(null, {
    getCategoryAPI,
    updateBusinessUnitInfoFormAPI,
    setDialogBox,
  })(BusinessUnitForm)
);
