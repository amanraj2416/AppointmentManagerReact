//Page to display list of appointments of a particular doctor

import { Link } from "react-router-dom";

function AppointmentList({appointmentData}){
    
    if(appointmentData.length === 0){
        return (
            <>
                <div style={{textAlign:'center',marginTop:'16px'}}><h1>No Appointments</h1></div>
            </>
        )
    }
    return(
        <>
            <div style={{marginTop:'16px'}}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointmentData.map((item,index) => (
                            <tr key={index}>
                                <td>{item.appointmentDate.split("T")[0]}</td>
                                <td>{item.patientName}</td>
                                <td>{item.patientEmail}</td>
                                <td>{item.patientPhone}</td>
                                <td>{item.status}</td>
                                <td>
                                    <Link to={`/my-appointment/${item.appointmentId}`} state={item} className="btn btn-warning">Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default AppointmentList;