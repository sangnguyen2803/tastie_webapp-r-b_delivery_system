import React, { Fragment, useState, useEffect } from "react";
import "./ScheduleOrder.scss";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProviderScheduleTime } from "store/actions/OrderAction/OrderAction";

function ScheduleOrder(props) {
  const { user, getProviderScheduleTime } = props;
  const [schedule, setSchedule] = useState([]);
  const [scheduleDate, setScheduleDate] = useState([]);
  const [scheduleTime, setScheduleTime] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchScheduleDateTime(id) {
      const result = await getProviderScheduleTime(id);
      console.log(result);
      if (result) setSchedule(result);
      setScheduleDate(result[0]?.day);
      setScheduleTime(result[0]?.schedule_time[0]);
    }
    fetchScheduleDateTime(user?.userCart?.provider_id);
  }, []);

  const submitScheduleTime = () => {
    var dateFormatted = `${scheduleDate} ${scheduleTime}`;
    /*
    var dateFormatted = `${pickedDay.getFullYear()}-${(
      "0" +
      (pickedDay.getMonth() + 1)
    ).slice(-2)}-${("0" + pickedDay.getDate()).slice(-2)} ${scheduleTime}`;
    const sameDate = pickedDay.getDate() === current.getDate();
    if (sameDate) {
      var startTime = scheduleTime?.split(" - ")[0];
      var currentTime = `${current.getHours()}:${current.getMinutes()}`;

      if (
        startTime.split(":")[0] < current.getHours &&
        startTime.split(":")[1] < current.getMinutes
      ) {
        setErrorMessage(
          "Picked schedule time cannot be lesser or equal to the current date time"
        );
        return;
      }
    } else setErrorMessage("");
    const scheduleOnFormat = `${pickedDay.getFullYear()}-${pickedDay.getMonth()}-${pickedDay.getDate()} ${scheduleTime?.replace(
      /\s/g,
      ""
    )}`;
    */
    props.setOrderScheduleTime(dateFormatted);
    props.closeModal();
  };
  return (
    <Fragment>
      <div className="schedule-order-container">
        <span className="sch-o-head-text">Pick a time</span>
        <div className="sch-o-dropdown-date-container">
          <div className="sch-o-select-label">Date:</div>
          <select
            className="sch-o-select-container"
            onChange={(e) => {
              setScheduleDate(e.target.value);
            }}
          >
            <option value="" disabled hidden>
              Select a date...
            </option>
            {schedule.map((sch) => (
              <option key={sch.day} value={sch.day}>
                {sch.day}
              </option>
            ))}
          </select>
        </div>
        <div className="sch-o-dropdown-date-container">
          <div className="sch-o-select-label">Time:</div>
          <select
            className="sch-o-select-container"
            disabled={!scheduleDate}
            onChange={(e) => setScheduleTime(e.target.value)}
          >
            <option value="" disabled hidden>
              Select a time...
            </option>
            {schedule
              .filter((sch) => sch.day === scheduleDate)
              .map((time) =>
                time?.schedule_time?.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))
              )}
          </select>
        </div>
        <span className="validate-schedule-time">{errorMessage}</span>
        <ButtonGroup
          width={90}
          float={"flex-end"}
          mgTop={20}
          gap={30}
          mgBottom={10}
        >
          <Button
            color={"white"}
            bgColor={"black"}
            justifyContent={"center"}
            gap={"10px"}
            width={100}
            fontSize={13}
            height={30}
            label={"Schedule"}
            onClick={() => submitScheduleTime()}
          />
        </ButtonGroup>
      </div>
    </Fragment>
  );
}

ScheduleOrder.propTypes = {
  user: PropTypes.object.isRequired,
  getProviderScheduleTime: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});
export default withRouter(
  connect(mapStateToProps, { getProviderScheduleTime })(ScheduleOrder)
);
/*
const SCHEDULE_DATE = 10;
const SCHEDULE_TIME = 48;
const day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
*/
/*useEffect(() => {
    let scheduleDate = [];
    let scheduleTime = [];
    for (let i = 0; i < SCHEDULE_DATE; i++) {
      var current = new Date();
      current.setDate(new Date().getDate() + i);
      scheduleDate.push(
        `${i === 0 ? "Today, " : ""}${day[current.getDay()]}, ${
          month[current.getMonth()]
        } ${current.getDate()}`
      );
    }
    setScheduleDate(scheduleDate);
    for (let i = 1; i < SCHEDULE_TIME; i++) {
      let time1 = `${("0" + current.getHours()).slice(-2)}:${(
        "0" + current.getMinutes()
      ).slice(-2)} ${current.getHours >= 12 ? "PM" : "AM"}`;
      var current = new Date();
      current.setTime(i * 1800000);
      let time2 = `${("0" + current.getHours()).slice(-2)}:${(
        "0" + current.getMinutes()
      ).slice(-2)} ${current.getHours >= 12 ? "PM" : "AM"}`;
      scheduleTime.push(time1 + " - " + time2);
    }
    setScheduleTime(scheduleTime);
  }, []);*/
