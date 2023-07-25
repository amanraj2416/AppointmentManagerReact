
// Appointment form to add new appointment 

import { useEffect, useState,useMemo } from 'react';
import { Form } from 'react-router-dom';
import classes from './RegistrationForm.module.css';
import moment from 'moment';

function AppointmentForm({ doctors,onSubmit,error }) {
  const errorList = error?.errors;

  // State to store form data and validation errors
  const [availableInterval, setInterval] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    doctor: '',
    interval: '',
    date: '',
  });
  const [validationErrors, setValidationErrors] = useState({});

  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform form validation
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone is required';
    }
    if (!formData.doctor) {
      errors.doctor = 'Please select a doctor';
    }
    if (!formData.interval) {
      errors.interval = 'Please select an appointment slot';
    }
    if (!formData.date) {
      errors.date = 'Please select an appointment date';
    }

    // If there are validation errors, set them in the state and prevent form submission
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    // Form is valid, continue with form submission 
    onSubmit(formData);
  };

  // Generate time intervals
  const startTime = doctors?.length ? doctors[0].dayStartTime : '';
  const endTime = doctors?.length ? doctors[0].dayEndTime : '';
  const interval = doctors?.length ? doctors[0].appointmentSlotTime : '';

  const today = new Date().toISOString().split('T')[0];
  const generateTimeIntervals = () => {
    const intervals = [];
    const start = moment(startTime, 'HH:mm:ss');
    const end = moment(endTime, 'HH:mm:ss');

    while (start.isBefore(end)) {
      intervals.push(start.format('HH:mm') + ' to ' + start.add(interval, 'minutes').format('HH:mm'));
    }

    return intervals;
  };

  // API to fetch booked slots of a doctor on a particular date
  const fetchData = async () => {
    const API = `https://localhost:7211/api/appointment/${formData.doctor}/bookedslots/${formData.date}`;
    try {
      const res = await fetch(API);
      const jsonRes = await res.json();
      const valuesArray = jsonRes.map(item => item.appointmentTime);
      const totalInterval = generateTimeIntervals();
      const timeIntervals = totalInterval.filter(item => !valuesArray.includes(item));
      setInterval(timeIntervals);
      
    } catch (e) {
      console.error(e);
    }
  };
  useMemo(() => {
    if (formData.doctor && formData.date) {
      fetchData();
    }
  }, [formData.doctor, formData.date]);

  return (
    <>
      <Form method="post" className={classes.form} onSubmit={handleSubmit}>
        <h1>New Appointment</h1>
        <p>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            className={`form-control ${validationErrors.name || errorList?.PatientName ? classes.inputError : ''}`}
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <span style={{ color: 'red' }}>{validationErrors.name || errorList?.PatientName || ''}</span>
        </p>
        <p>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className={`form-control ${validationErrors.email || errorList?.PatientEmail ? classes.inputError : ''}`}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <span style={{ color: 'red' }}>{validationErrors.email || errorList?.PatientEmail || ''}</span>
        </p>
        <p>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            className={`form-control ${validationErrors.phone || errorList?.PatientPhone ? classes.inputError : ''}`}
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            max="10"
          />
          <span style={{ color: 'red' }}>{validationErrors.phone || errorList?.PatientPhone || ''}</span>
        </p>
        <p>
          <label>Select Doctor:</label>
          <select
            name="doctor"
            className={`form-control ${validationErrors.doctor || errorList?.DoctorIdFk ? classes.inputError : ''}`}
            value={formData.doctor}
            onChange={handleInputChange}
          >
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.doctorId} value={doctor.doctorId}>
                {doctor.doctorName}
              </option>
            ))}
          </select>
          <span style={{ color: 'red' }}>{validationErrors.doctor || errorList?.DoctorIdFk || ''}</span>
        </p>
        <p>
          <label>Select Appointment Date:</label>
          <input
            id="date"
            type="date"
            className={`form-control ${validationErrors.date || errorList?.AppointmentDate ? classes.inputError : ''}`}
            name="date"
            min={today}
            value={formData.date}
            onChange={handleInputChange}
          />
          <span style={{ color: 'red' }}>{validationErrors.date || errorList?.AppointmentDate || ''}</span>
        </p>
        <p>
          <label>Select Appointment Slot:</label>
          <select
            name="interval"
            className={`form-control ${validationErrors.interval || errorList?.AppointmentTime ? classes.inputError : ''}`}
            value={formData.interval}
            onChange={handleInputChange}
          >
            <option value="">Select an appointment slot</option>
            {availableInterval.map((interval, index) => (
              <option key={index} value={interval}>
                {interval}
              </option>
            ))}
          </select>
          <span style={{ color: 'red' }}>{validationErrors.interval || errorList?.AppointmentTime || ''}</span>
        </p>
        
        <div className={classes.actions}>
          <button className="btn btn-warning">Save</button>
        </div>
      </Form>
    </>
  );
}

export default AppointmentForm;
