import React from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import moment from "moment";
import "./datePickerStyle.css";

const DatePicker = (props) => {
  let fd = props.value
    ? [
        moment(props.value[0], moment.defaultFormat).toDate(),
        moment(props.value[1], moment.defaultFormat).toDate(),
      ]
    : null;
  return (
    <div>
      <DateRangePicker
        onChange={props.handleChange}
        value={fd}
        className="date-picker-custom"
      />
    </div>
  );
};
export default DatePicker;
