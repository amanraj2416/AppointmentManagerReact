import React, { useState } from 'react';
import { Form, useActionData } from 'react-router-dom';
import classes from './RegistrationForm.module.css';

const LoginForm = ({onSubmit,error}) => {
  const errorList = error?.errors;
  
  // State to store form data and validation errors
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // State to store validation errors
  const [validationErrors, setValidationErrors] = useState({});

  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform form validation
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {

      errors.email = 'Invalid email address';
    }
    console.log('Email:', formData.email);
    console.log('Email regex test result:', emailRegex.test(formData.email));
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }

    // If there are validation errors, set them in the state and prevent form submission
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Form is valid, continue with form submission 
    onSubmit(formData);
  };

  return (
    <Form method='POST' className={classes.form} onSubmit={handleSubmit}>
      <p>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className={`form-control ${validationErrors.email || errorList?.Email ? classes.inputError : ''}`}
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <span style={{ color: 'red' }}>{validationErrors.email || errorList?.Email || ''}</span>
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className={`form-control ${validationErrors.password || errorList?.Password ? classes.inputError : ''}`}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <span style={{ color: 'red' }}>{validationErrors.password || errorList?.Password || ''}</span>
      </p>
      <div className={classes.actions}>
        <button className='btn btn-warning'>Log in</button>
      </div>
    </Form>
  );
};

export default LoginForm;
