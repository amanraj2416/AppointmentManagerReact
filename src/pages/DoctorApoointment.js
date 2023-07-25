import { useState, useEffect } from "react";
import AppointmentList from "../components/AppointmentList";

function MyAppointments() {
  
  //Get the user data from session storage as stored after log in

  const data = sessionStorage.getItem("loggedInUser");
  const loggedInUser = JSON.parse(data);
  const userId = loggedInUser.userId;

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // state to store date and API response
  const [selectedDate, setNewDate] = useState(getCurrentDate());
  const [response, setResponse] = useState([]);

  const handleDateChange = (event) => {
    setNewDate(event.target.value);
  };

  // API to fetch list of appointments of a doctor on a particular date
  useEffect(() => {
    const API = `https://localhost:7211/api/appointment/${userId}/appointments/${selectedDate}`;

    const fetchData = async (url) => {
      try {
        const res = await fetch(url);
        const jsonRes = await res.json();
        setResponse(jsonRes);
        console.log(jsonRes);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData(API);
  }, [selectedDate, userId]); 

  return (
    <>
      <div style={{ marginLeft: "64px", marginRight: "64px",marginTop:'16px' }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <label htmlFor="selectDate">Select Date: </label>
          <input
            type="date"
            name="selectDate"
            className="form-control"
            defaultValue={getCurrentDate()}
            onChange={handleDateChange}
            style={{ width: "30%" }}
          />
        </div>
        <AppointmentList appointmentData={response}/>
      </div>
    </>
  );
}

export default MyAppointments;
