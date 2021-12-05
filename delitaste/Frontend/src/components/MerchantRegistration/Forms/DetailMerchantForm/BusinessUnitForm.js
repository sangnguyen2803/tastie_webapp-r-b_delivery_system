import "./DetailMerchantForm.scss";
import "style/Common.scss";
import { useState } from "react";
import PropTypes from "prop-types";
import { Formik, ErrorMessage, Form, Field } from "formik";
import Stepper from "components/Commons/Stepper/Stepper";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FormError from "components/Commons/ErrorHandlers/FormError/FormError";
import FormHeader from "./FormHeader/FormHeader";
import Switch from "react-switch";
import { faToggleOff } from "@fortawesome/fontawesome-free-solid";

const initialValues = {
  merchantName: "",
  merchantType: "",
  street: "",
  phone: "",
  country_id: "",
  city_id: "",
  district_id: "",
  address: [],
};

function BusinessUnitForm(props) {
  //weekday-switchers-state
  const [checkedSunday, setCheckedSunday] = useState(true);
  const [checkedMonday, setCheckedMonday] = useState(true);
  const [checkedTuesday, setCheckedTuesday] = useState(true);
  const [checkedWednesday, setCheckedWednesday] = useState(true);
  const [checkedThursday, setCheckedThursday] = useState(true);
  const [checkedFriday, setCheckedFriday] = useState(true);
  const [checkedSaturday, setCheckedSaturday] = useState(true);

  return (
    <Formik initialValues={initialValues}>
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        return (
          <>
            <FormHeader name="Business Unit's Detail Info" />
            <div className="merchant-form-wrapper">
              <div className="merchant-form-field-wrapper">
                <div className="merchant-form-switch-label-wrapper">
                  Operation Time
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
                          name="opened-time-sunday"
                          placeholder="00:00"
                          maxLength={50}
                          autoComplete="on"
                        />
                        <Field
                          className="form-text-field"
                          type="text"
                          name="closed-time-sunday"
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
                          name="opened-time-monday"
                          placeholder="00:00"
                          maxLength={50}
                          autoComplete="on"
                        />
                        <Field
                          className="form-text-field"
                          type="text"
                          name="closed-time-monday"
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
                          name="opened-time-tuesday"
                          placeholder="00:00"
                          maxLength={50}
                          autoComplete="on"
                        />
                        <Field
                          className="form-text-field"
                          type="text"
                          name="closed-time-tuesday"
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
                          name="opened-time-wednesday"
                          placeholder="00:00"
                          maxLength={50}
                          autoComplete="on"
                        />
                        <Field
                          className="form-text-field"
                          type="text"
                          name="closed-time-wednesday"
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
                          name="opened-time-thursday"
                          placeholder="00:00"
                          maxLength={50}
                          autoComplete="on"
                        />
                        <Field
                          className="form-text-field"
                          type="text"
                          name="closed-time-thursday"
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
                          name="opened-time-friday"
                          placeholder="00:00"
                          maxLength={50}
                          autoComplete="on"
                        />
                        <Field
                          className="form-text-field"
                          type="text"
                          name="closed-time-friday"
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
                          name="opened-time-saturday"
                          placeholder="00:00"
                          maxLength={50}
                          autoComplete="on"
                        />
                        <Field
                          className="form-text-field"
                          type="text"
                          name="closed-time-saturday"
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
                    name="rush-hour"
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
                    name="search-keyword"
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
                    name="description"
                    placeholder="Restaurant Description"
                    maxLength={200}
                  />
                </div>
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
              <Link to="/merchant-registration">
                <button className="btn-merchant-registration-back">Back</button>
              </Link>
              <Link to="/merchant-registration/create-shop">
                <button className="btn-merchant-registration-next">
                  Save and Next
                </button>
              </Link>
            </div>
          </>
        );
      }}
    </Formik>
  );
}

export default BusinessUnitForm;
