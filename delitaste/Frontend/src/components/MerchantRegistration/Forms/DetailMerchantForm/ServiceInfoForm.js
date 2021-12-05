import "./DetailMerchantForm.scss";
import "style/Common.scss";
import { useState, useEffect } from "react";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { validateMerchantForm1 } from "utils/FormUtils/MerchantFormValidate";
import locations from "assets/json_location/locations";

import FormError from "components/Commons/ErrorHandlers/FormError/FormError";
import FormHeader from "./FormHeader/FormHeader";

const initialValues = {
  name: "",
  phone: "",
  city: "",
  district: "",
  ward: "",
  road: "",
};

function ServiceInfoForm(props) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const getFullAddress = (road, city_id, district_id, ward_id) => {
    const address = [];
    locations
      .filter((city) => city.code == city_id)
      .map((selectedCity) => {
        address.unshift(selectedCity.name);
        selectedCity.districts
          .filter((district) => district.code == district_id)
          .map((selectedDistrict) => {
            address.unshift(selectedDistrict.name);
            selectedDistrict.wards
              .filter((ward) => ward.code == ward_id)
              .map((selectedWard) => {
                address.unshift(selectedWard.name);
              });
          });
      });
    address.unshift(road);
    return address.join(", ");
  };
  const handleSubmitForm = (values) => {
    const { name, phone, city, district, ward, road } = values;
    const formData = {
      basicInfo: {
        address: getFullAddress(road, city, district, ward),
        name,
        phone,
        city,
        district,
        ward,
        road,
        latitude: 0,
        longitude: 0,
      },
    };
    console.log(formData);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateMerchantForm1}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values) => handleSubmitForm(values)}
    >
      {(formikProps) => {
        const { values, errors, touched } = formikProps;

        return (
          <>
            <Form className="merchant-form-container">
              <FormHeader name="Service Provider's Info" />
              <div className="merchant-form-wrapper">
                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">
                    Merchant name
                  </div>
                  <div className="merchant-form-input-wrapper">
                    <Field
                      className={
                        errors.name
                          ? "form-text-field error"
                          : "form-text-field"
                      }
                      type="text"
                      name="name"
                      placeholder="Name"
                    />
                    <Field
                      className={
                        errors.name
                          ? "form-text-field error"
                          : "form-text-field"
                      }
                      type="text"
                      name="type"
                      placeholder="Street"
                    />
                  </div>
                </div>
                <div className="field-bottom-side-wrapper">
                  <FormError
                    err={errors.name && touched.name ? errors.name : ""}
                    spaceBetween={0}
                    fontSize={14}
                    fontWeight={"bold"}
                  />
                  <span className="field-description">
                    Merchant name displays in the following the format e.g :
                    'Whirling Beef - Baker Street'
                  </span>
                </div>
                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">
                    Phone number
                  </div>
                  <div className="merchant-form-input-wrapper">
                    <Field
                      className={
                        errors.phone
                          ? "form-text-field error"
                          : "form-text-field"
                      }
                      type="text"
                      name="phone"
                      placeholder="Phone or Mobile number"
                    />
                  </div>
                </div>
                <div className="field-bottom-side-wrapper">
                  <FormError
                    err={errors.phone && touched.phone ? errors.phone : ""}
                    spaceBetween={0}
                    fontSize={14}
                    fontWeight={"bold"}
                  />
                  <span className="field-description"></span>
                </div>
                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">
                    City / province
                  </div>
                  <div className="merchant-form-input-wrapper">
                    <Field
                      className="form-text-field-select"
                      style={{ width: "100%", height: "35px" }}
                      as="select"
                      name="city"
                    >
                      <option value="" selected disabled hidden>
                        Select a city...
                      </option>
                      {locations.map((city) => (
                        <option
                          key={city.code}
                          value={city.code}
                          label={city.name}
                        />
                      ))}
                    </Field>
                  </div>
                </div>
                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">District</div>
                  <div className="merchant-form-input-wrapper">
                    <Field
                      className="form-text-field-select"
                      style={{ width: "100%", height: "35px" }}
                      as="select"
                      name="district"
                    >
                      <option value="" selected disabled hidden>
                        Select a district...
                      </option>
                      {locations
                        .filter((city) => city.code == values.city)
                        .map((selectedCity) =>
                          selectedCity.districts.map((district) => (
                            <option
                              key={district.code}
                              value={district.code}
                              label={district.name}
                            />
                          ))
                        )}
                    </Field>
                  </div>
                </div>
                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">Ward / town</div>
                  <div className="merchant-form-input-wrapper">
                    <Field
                      className="form-text-field-select"
                      style={{ width: "100%", height: "35px" }}
                      as="select"
                      name="ward"
                    >
                      <option value="" selected disabled hidden>
                        Select a ward...
                      </option>
                      {locations
                        .filter((city) => city.code == values.city)
                        .map((selectedCity) =>
                          selectedCity.districts
                            .filter(
                              (district) => district.code == values.district
                            )
                            .map((selectedDistrict) =>
                              selectedDistrict.wards.map((ward) => (
                                <option
                                  key={ward.code}
                                  value={ward.code}
                                  label={ward.name}
                                />
                              ))
                            )
                        )}
                    </Field>
                  </div>
                </div>
                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">
                    Address line
                  </div>
                  <div className="merchant-form-input-wrapper">
                    <Field
                      className={
                        errors.road
                          ? "form-text-field error"
                          : "form-text-field"
                      }
                      type="text"
                      name="road"
                      placeholder="House number - Road"
                    />
                  </div>
                </div>
                <div className="field-bottom-side-wrapper">
                  <FormError
                    err={errors.road && touched.road ? errors.road : ""}
                    spaceBetween={0}
                    fontSize={14}
                    fontWeight={"bold"}
                  />
                  <span className="field-description">
                    Address displays in the following the format e.g : '543B
                    Ansterdam'
                  </span>
                </div>
                <div className="merchant-form-button-wrapper">
                  <div>
                    <button className="btn-check-on-map">Check on map</button>
                  </div>
                </div>
                <div className="field-bottom-side-wrapper">
                  <FormError
                    err={errors.road && touched.road ? errors.road : ""}
                    spaceBetween={0}
                    fontSize={14}
                    fontWeight={"bold"}
                  />
                  <span className="field-description">
                    Click the above button to locate the exact address on Google
                    Map.
                  </span>
                </div>
                <div className="merchant-form-button-wrapper">
                  <iframe
                    width={580}
                    height={300}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin"
                  ></iframe>{" "}
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

export default withRouter(ServiceInfoForm);
