import React from 'react';
import { NavLink } from 'react-router-dom';
import errorImg from '../images/error.png'

const NotFound = () => {
  return (
    <div className="my-5" style={{display:'flex',justifyContent:'center'}}>
        <div className="card" style={{width:'40%'}}>
            <img src={errorImg} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h1>404 - Page Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>
                <NavLink to='/' className="btn btn-info">Home</NavLink>
            </div>9
        </div>
    </div>
  );
};

export default NotFound;
