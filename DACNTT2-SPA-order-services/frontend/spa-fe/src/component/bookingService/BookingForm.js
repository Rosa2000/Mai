import React, { useState, Fragment, useEffect } from "react";
// import BasicTimePicker from "../datePicker/BasicTimePicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { setHours, setMinutes } from "date-fns";
import axios from "axios";
import authHeader from "../../services/auth-header";
import CustomClearIndicator from "../plugins/multi-select/MultiSelect";

const baseServiceURL = process.env.REACT_APP_URL_SERVICES_API;

// import "../datePicker/datepicker.scss";
const BookingForm = () => {
  // const [now, setNow] = useState(setHours(setMinutes(new Date(), 0), 9));
  const [date, setDate] = useState(new Date());
  const [services, setServices] = useState();
  const [selectedServices, setSelectedServices] = useState([]);
  const [note, setNote] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    getServiceData();
  }, []);
  if (services) {
    options = services.map((service) => {
      return { value: service.service_ID, label: service.serviceName };
    });
  }
  let options;
  const getServiceData = async () => {
    axios
      .get(`${baseServiceURL}/get-service-name`, {
        headers: { "x-access-token": authHeader() },
      })
      .then((res) => {
        console.log("DATA: ", res.data);
        setServices(res.data);
      });
  };

  console.log("DATE: ", date.getTime());
  console.log("SELECTED: ", selectedServices);
  console.log("NOTE: ", note);

  const submitHandler = () => {};

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const form = (
    <form onSubmit={submitHandler}>
      {errorMsg && (
        <div className="text-center text-danger fs-12">{errorMsg}</div>
      )}
      <div className="form-group">
        <label>Ngày đặt hẹn</label>
        <DatePicker
          selected={date}
          className="w-100"
          value={date}
          onChange={(date) => setDate(date)}
          showTimeSelect
          minTime={setHours(setMinutes(date, 0), 9)}
          maxTime={setHours(setMinutes(date, 0), 20)}
          filterTime={filterPassedTime}
          minDate={startDate}
          dateFormat="dd/MM/yyyy h:mm aa"
        />
      </div>

      <div className="form-group ">
        <label>Chọn dịch vụ</label>
        <CustomClearIndicator
          onChange={(selectedOpts) => setSelectedServices({ selectedOpts })}
          options={options}
        />
      </div>

      <div className="form-group ">
        <label>Ghi chú</label>
        <textarea
          onChange={(e) => setNote(e.target.value)}
          name="note"
          className="form-control"
          rows="3"
        ></textarea>
      </div>
      <div className="row justify-content-center">
        <button
          type="submit"
          className="btn btn-primary mx-auto col-12 col-md-5 "
        >
          Đặt lịch
        </button>
      </div>
    </form>
  );
  return (
    <Fragment>
      <div className="authincation h-100 p-meddle">
        <div className="container h-100">
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-md-9">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form">
                      <h4 className="text-center mb-4 ">Đặt lịch</h4>
                      {form}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BookingForm;
