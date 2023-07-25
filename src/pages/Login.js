import { redirect,useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useState } from "react";

function Login(){
    const navigate = useNavigate();

    //state to store error
    const [error, setError] = useState([]);

    const handleFormSubmit = async (formData) => {
        try {

            //API call to verify user , after success store the info in session storage
            const response = await fetch('https://localhost:7211/api/doctors/login', {
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

        const resData = await response.json();
        const loggedInUser = {
        userId: resData.id,
        doctorName: resData.name,
        };

        sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

        navigate("/my-appointment");

        } catch (error) {
        return {errors:'An unexpected error occurred. Please try again later.'};

        }
    };
    return<>
        <LoginForm onSubmit={handleFormSubmit} error={error}/>
    </>
}
export default Login;
