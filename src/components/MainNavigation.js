
//Page to display Top Navigation

import classes from './MainNavigation.module.css';
import { Link, NavLink,redirect,useNavigate} from 'react-router-dom';



function MainNavigation() {
  //get user details from session

  const user = sessionStorage.getItem('loggedInUser');
  const userDetails = JSON.parse(user);
  const isLoggedIn = sessionStorage.getItem('loggedInUser') !== null;
  const navigate = useNavigate();

  //function to handle logout
  const handleLogout = ()=>{
    sessionStorage.removeItem("loggedInUser");
    navigate('/');
  }

  return (
        
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <span className='navbar-brand'>AppointMent Manager</span>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${classes.list}`}>
            <li className="nav-item">
              <NavLink to="/appointment" className={({isActive}) => isActive?classes.active : undefined}>New Appointment</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className={({isActive}) => isActive?classes.active : undefined}>Register</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/summaryreport" className={({isActive}) => isActive?classes.active : undefined}>Summary report</NavLink>
            </li>
            {isLoggedIn && <li>
              <NavLink to="/my-appointment" className={({isActive}) => isActive?classes.active : undefined}>My Appointments</NavLink>
            </li>}
          </ul>
          {isLoggedIn ? (
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          ) : (
            <NavLink to="/login" className='btn btn-warning'>Log In</NavLink>
          )}
        </div>
      </div>
    </nav>
    
  );
}

export default MainNavigation;
