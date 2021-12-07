import "./DetailMerchantForm.scss";
import "style/Common.scss";
import { useState } from "react";
import PropTypes from "prop-types";
import { Formik, ErrorMessage, Form, Field } from "formik";
import Stepper from "components/Commons/Stepper/Stepper";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import FormError from "components/Commons/ErrorHandlers/FormError/FormError";
import Tag from "components/Commons/Tag/Tag";
import FormHeader from "./FormHeader/FormHeader";
import Switch from "react-switch";
import { faToggleOff } from "@fortawesome/fontawesome-free-solid";

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
  const selectedCuisineCategory = [
    "Milk tea",
    "Coffee",
    "Fastfood & StreetFood",
    "ThaiFood",
    "Pizza",
    "Fried",
    "Dessert",
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
    console.log("abc");
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
    console.log(formData);
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
                      <button className="btn-category">Select category</button>
                    </div>
                  </div>
                </div>
                <div className="tag-container">
                  {selectedCuisineCategory.map((tag, index) => (
                    <Tag text={tag} />
                  ))}
                </div>

                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">
                    Cuisine <br /> Category
                  </div>
                  <div className="merchant-form-input-wrapper">
                    <div className="select-category-button-wrapper">
                      <button className="btn-category">Select category</button>
                    </div>
                  </div>
                </div>
                <div className="tag-container">
                  {selectedCuisineCategory.map((tag, index) => (
                    <Tag text={tag} />
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
          </>
        );
      }}
    </Formik>
  );
}

export default BusinessUnitForm;
