
//Detail page of an appointment

import { useNavigate,useLocation, Link } from "react-router-dom";
import classes from './RegistrationForm.module.css';
import { Form } from "react-router-dom";
import { useState } from "react";

const status = ["open","cancel","close"];

function AppointmentDetail(){
    const navigate = useNavigate();
    const location = useLocation();
    const patientDetail = location.state;

    //state to store status and error
    const [selectedStatus, setSelectedStatus] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // State variable for the error message

    //function to handle status change
    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
        setErrorMessage(""); // Clear the error message when the user selects a status
    };
    
    //function to navigate back
    const handleGoBack = () => {
        navigate('/my-appointment');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!selectedStatus) {
          setErrorMessage("Please select a status."); // Set the error message
          return;
        }
    
        try{
            const patientStatus = {
              AppointmentId:patientDetail.appointmentId,
              Status:selectedStatus,
            }
            //API to update the status
            const response = await fetch('https://localhost:7211/api/appointment/update-status',{
              method:'POST',
              headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(patientStatus)
            });
            return(response);
          }
          catch(error){
            return {errors:'An unexpected error occurred. Please try again later.'};
          }
        
      };

    return(
        <>
            <Form method="POST" className={classes.form} onSubmit={handleSubmit}>
                <input name="id" type='hidden'  defaultValue={patientDetail.appointmentId}/>
            <p>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" name="name" className="form-control" defaultValue={patientDetail.patientName} disabled/>
            </p>
            <p>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" className="form-control"  defaultValue={patientDetail.patientEmail} disabled />
            </p>
            <p>
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="tel" name="phone" className="form-control" defaultValue={patientDetail.patientPhone} disabled />
            </p>
            <p>
            <label>Status</label>
                <select name='status' className="form-control" onChange={handleStatusChange}>
                <option value="">select status</option>
                    {status.map((status, index) => (
                        <option key={index} value={status}>
                        {status}
                        </option>
                    ))}
                </select>
                {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
            </p>
            <div className={classes.actions}>
                <button  className="btn btn-info" onClick={handleGoBack}>Back</button>
                <button className="btn btn-warning">Save</button>
                
            </div>

            </Form>
        </>
    )
}
export default AppointmentDetail;
