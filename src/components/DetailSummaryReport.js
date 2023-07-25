import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
const DetailSummaryReport = ({ data }) => {
  const [expandedRows, setExpandedRows] = useState([]);

  const handleRowToggle = (rowIndex) => {
    if (expandedRows.includes(rowIndex)) {
      setExpandedRows(expandedRows.filter((index) => index !== rowIndex));
    } else {
      setExpandedRows([...expandedRows, rowIndex]);
    }
  };
  const renderToggleIcon = (rowIndex) => {
    return expandedRows.includes(rowIndex) ? <FaMinus /> : <FaPlus />;
  };
  return (
    <table className='table'>
      <thead>
        <tr>
          <th></th>
          <th>Date</th>
          <th>Appointments</th>
          <th>Closed Appointments</th>
          <th>Cancelled Appointments</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <tr onClick={() => handleRowToggle(index)}>
              <td>{renderToggleIcon(index)}</td>
              <td>{item.date.split("T")[0]}</td>
              <td>{item.numAppointments}</td>
              <td>{item.numClosedAppointments}</td>
              <td>{item.numCancelledAppointments}</td>
              
            </tr>
            {expandedRows.includes(index) && (
              <tr>
                <td colSpan="6">
                  <table className='table table-borderless table-warning'>
                    <thead>
                      <tr>
                        <th>Patient Name</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.patients.map((patient, idx) => (
                        <tr key={idx}>
                          <td>{patient.patientName}</td>
                          <td>{patient.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default DetailSummaryReport;
