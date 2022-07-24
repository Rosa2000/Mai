import React, { useState } from "react";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
const BasicTimePicker = (props) => {
  // const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TimePicker
        value={props.value}
        className="w-100"
        autoOk
        name={props.name}
        onChange={props.onChange}
      />
    </MuiPickersUtilsProvider>
  );
};

export default BasicTimePicker;
