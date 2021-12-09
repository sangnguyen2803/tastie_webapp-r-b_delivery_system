import "./DetailMerchantForm.scss";
import "style/Common.scss";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Formik, ErrorMessage, Form, Field } from "formik";
import Stepper from "components/Commons/Stepper/Stepper";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Modal from "components/Commons/Overlay/Popup/Modal/Modal";
import FormError from "components/Commons/ErrorHandlers/FormError/FormError";
import Tag from "components/Commons/Tag/Tag";
import FormHeader from "./FormHeader/FormHeader";
import CategorySelector from "components/MerchantRegistration/Forms/DetailMerchantForm/CategorySelector/CategorySelector";

import Switch from "react-switch";

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

  useEffect(() => {
    if (showRestaurantCategory || showCuisineCategory) {
      document.body.style.position = "fixed";
      return;
    }
    document.body.style.position = "unset";
    document.body.style.overflowY = "scroll";
  }, [showRestaurantCategory, showCuisineCategory]);

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

  //weekday-switchers-state
  const [checkedSunday, setCheckedSunday] = useState(true);
  const [checkedMonday, setCheckedMonday] = useState(true);
  const [checkedTuesday, setCheckedTuesday] = useState(true);
  const [checkedWednesday, setCheckedWednesday] = useState(true);
  const [checkedThursday, setCheckedThursday] = useState(true);
  const [checkedFriday, setCheckedFriday] = useState(true);
  const [checkedSaturday, setCheckedSaturday] = useState(true);

  const handleSubmitForm = (values) => {
    const { operating, rushHour, searchKeyword, description } = values;
    const formData = {
      businessInfo: {
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
        rush_hour: rushHour,
        search_key: searchKeyword,
        description: description,
      },
    };
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmitForm(values)}
    >
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        return (
          <>
            <Form className="merchant-form-container">
              <FormHeader name="Business Unit's Detail Info" />
              <div className="form-name">MERCHANT DETAIL INFORMATION:</div>
              <div className="merchant-form-wrapper">
                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-switch-label-wrapper">
                    Operation time
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
                        <>
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
                        </>
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
                  <div className="merchant-form-input-wrapper">
                    <Field
                      className="form-text-field"
                      type="text"
                      name="rushHour"
                      placeholder="Rush Hour"
                      maxLength={50}
                      autoComplete="on"
                    />
                  </div>
                </div>

                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">
                    Search Keyword
                  </div>
                  <div className="merchant-form-input-wrapper">
                    <Field
                      className="form-text-field"
                      type="text"
                      name="searchKeyword"
                      placeholder="Search Keyword"
                      maxLength={50}
                      autoComplete="on"
                    />
                  </div>
                </div>

                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">Description</div>
                  <div className="merchant-form-input-wrapper">
                    <Field
                      className="form-text-field-textarea"
                      component="textarea"
                      name="Description"
                      placeholder="Restaurant Description"
                      maxLength={200}
                    />
                  </div>
                </div>

                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">
                    Restaurant <br /> Category
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
                  {selectedRestaurantCategory.map((tag, index) => (
                    <Tag text={tag.categoryName} />
                  ))}
                </div>

                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">
                    Cuisine <br /> Category
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
                  {selectedCuisineCategory.map((tag, index) => (
                    <Tag text={tag.categoryName} />
                  ))}
                </div>

                <div className="merchant-form-field-wrapper-file">
                  <div className="merchant-form-label-wrapper-file">
                    Cover Picture
                  </div>
                  <div className="merchant-form-input-wrapper-file">
                    <div className="business-registration-browse">
                      <Field
                        className="form-file-field-2"
                        type="file"
                        name="merchant-id-card-1"
                        maxLength={50}
                        autoComplete="on"
                      />
                    </div>
                  </div>
                </div>
                <div className="merchant-form-field-wrapper-file">
                  <div className="merchant-form-label-wrapper-file">
                    Facade Photo
                  </div>
                  <div className="merchant-form-input-wrapper-file">
                    <div className="business-registration-browse">
                      <Field
                        className="form-file-field-2"
                        type="file"
                        name="merchant-id-card-1"
                        maxLength={50}
                        autoComplete="on"
                      />
                    </div>
                  </div>
                </div>
                <div className="merchant-form-field-wrapper-file">
                  <div className="merchant-form-label-wrapper-file">Avatar</div>
                  <div className="merchant-form-input-wrapper-file">
                    <div className="business-registration-browse">
                      <Field
                        className="form-file-field-2"
                        type="file"
                        name="merchant-id-card-1"
                        maxLength={50}
                        autoComplete="on"
                      />
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
              isOpen={showRestaurantCategory}
              title={"Restaurant Category"}
              width={60}
              height={500}
              close={() => setShowRestaurantCategory(false)}
            >
              <CategorySelector
                close={() => setShowRestaurantCategory(false)}
                list={selectedRestaurantCategory}
                title={"Select categories for restaurant's dishes (maximum: 3)"}
                required={3}
              />
            </Modal>
            <Modal
              isOpen={showCuisineCategory}
              title={"Cuisine Category"}
              width={60}
              height={500}
              close={() => setShowCuisineCategory(false)}
            >
              <CategorySelector
                close={() => setShowCuisineCategory(false)}
                list={selectedCuisineCategory}
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

export default BusinessUnitForm;
