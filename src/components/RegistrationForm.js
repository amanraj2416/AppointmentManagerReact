
import { useState } from 'react';
import { Form} from 'react-router-dom';
import classes from './RegistrationForm.module.css';

function RegistrationForm({onSubmit,error}) {
  
  const errorList = error?.errors;

  // State to store form data and validation errors
  const [formData, setFormData] = useState({
    name: '',
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
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }

    // If there are validation errors, set them in the state and prevent form submission
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
      onSubmit(formData);

    };

  return (
    <>
      <Form method="post" className={classes.form} onSubmit={handleSubmit}>
        <h1>Doctor Registration</h1>
        <p>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            className={`form-control ${validationErrors.name || errorList?.Name ? classes.inputError : ''}`}
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <span style={{ color: 'red' }}>{validationErrors.name || errorList?.Name || ''}</span>
        </p>
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
          <button className="btn btn-warning">Save</button>
        </div>
      </Form>
    </>
  );
}

export default RegistrationForm;
