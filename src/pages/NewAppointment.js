// Page to add new appointment

import react from 'react';
import { useLoaderData,redirect,useNavigate } from 'react-router-dom';
import AppointmentForm from '../components/AppointmentForm';
import { useState } from 'react';
import docImg from '../images/doctorImgForm.png';

function NewAppointment(){
    const navigate = useNavigate();
    const doctor = useLoaderData();

    // state to store errors

    const [error, setError] = useState([]);
    const handleFormSubmit = async (formData) => {
      //Create an object to pass data 
      const newAppointment = {
        PatientName : formData.name,
        PatientEmail : formData.email,
        PatientPhone : formData.phone,
        DoctorIdFk : parseInt(formData.doctor),
        AppointmentDate : formData.date,
        AppointmentTime : formData.interval,


      }
      try {
            //API to add new appointment
            const response = await fetch('https://localhost:7211/api/appointment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAppointment),
          });
  
        if (!response.ok) {
          if (response.status === 400) {
            const errorResponse = await response.json();
            setError(errorResponse);
          } else {
            console.log('Unexpected error occurred.');
          }
        };
        return navigate('/summaryreport');


  
      } catch (error) {
        return {errors:'An unexpected error occurred. Please try again later.'};
  
      }
    };
    return(
        <>
          <div className='row mx-4 my-4'>
            <div className='col'>
              <div>
                <img src={docImg}/>
              </div>
            </div>
            <div className='col'>
              <AppointmentForm doctors={doctor} onSubmit={handleFormSubmit} error={error}/>
            </div>
          </div>
            
        </>
    )
}
export default NewAppointment;


// function to get list of doctors
export async function loader()

{
  try{
    const response = await fetch('https://localhost:7211/api/doctors');

    if(!response.ok){
      throw new Error('Failed to fetch doctors');
    }
    const resData = await response.json();
    return resData;
  }
  catch(error){
    return [];
  }
}
