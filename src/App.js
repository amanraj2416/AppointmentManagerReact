
import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import RegistrationPage from './pages/RegistrationPage';
import Home  from './pages/Home';
import NewAppointment ,{loader as doctorLoader} from './pages/NewAppointment';

import SummaryReportTable from './pages/SummaryReportTable';
import Login from './pages/Login';
import AppointmentDetail from './components/AppointmentDetail';
import MyAppointments from './pages/DoctorApoointment';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NotFound from './pages/NotFound';


// Initialize path route to diff components

const router = createBrowserRouter(
  
  [
    {path:'/',element:<RootLayout/>,errorElement:<NotFound/>,
    children:[
      {index:true,element:<Home/>},
      {path:'register',element:<RegistrationPage/>},
      {path:'appointment',element:<NewAppointment/>,loader:doctorLoader},
      {path:'summaryreport',element:<SummaryReportTable/>},
      {path:'login',element:<Login/>},
      {path:'my-appointment',element:<MyAppointments/>},
      
      {path:'my-appointment/:patientId',element:<AppointmentDetail/>},
      
    ]}
  ]
)
function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
