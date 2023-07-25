
//Page to register new doctor

import RegistrationForm from '../components/RegistrationForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import newDoc from '../images/docReg.png';
function RegistrationPage() {

  // state to store errors
  const [error, setError] = useState([]);

  const navigate = useNavigate();

  const handleFormSubmit = async (formData) => {
    try {
          // Add new doctor 
          const response = await fetch('https://localhost:7211/api/registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

      if (!response.ok) {
        if (response.status === 400) {
          const errorResponse = await response.json();
          setError(errorResponse);
        } else {
          console.log('Unexpected error occurred.');
        }
      };
      return navigate('/login');

    } catch (error) {
      return {errors:'An unexpected error occurred. Please try again later.'};

    }
  };

  return (
    <>
      <div className='row mx-4 my-4'>
        <div className='col'>
          <div>
            <img src={newDoc}></img>
          </div>
        </div>
        <div className='col'>
          <RegistrationForm onSubmit={handleFormSubmit} error={error} />
        </div>
      </div>
    </>
  )
}

export default RegistrationPage;