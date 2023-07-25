//Pgae to display list of appointmnets of a particular month

import DetailSummaryReport from "../components/DetailSummaryReport";
import { useEffect,useState } from "react";


// Months array
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  
  function SummaryReportTable() {
    const currentMonthIndex = new Date().getMonth();

    // state to store month and response data
    const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex+1);
    const [data,setData] = useState([]);

    const handleSelectMonth = (event) => {
      setSelectedMonth(event.target.value);
    };

    const API = 'https://localhost:7211/api/appointment/'+selectedMonth+'/appointment-summary';

    // API to get list of appointments of a particular month
    const fetchData = async (url) =>{
        try{
            const res = await fetch(url);
            const data = await res.json();
            setData(data);
        }
        catch(e){
            console.error(e);
        }
    }     
    useEffect(()=>{
        fetchData(API);
    },[selectedMonth])

    return (
      <>
      <div style={{marginLeft:'64px',marginRight:'64px',marginTop:'16px'}}>
        <div style={{ display: 'flex', alignItems: 'center',justifyContent:'flex-end' }}>
          <label htmlFor="selectMonth">Select Month: </label>
          <select id="selectMonth" value={selectedMonth} className="form-control" onChange={handleSelectMonth} style={{width:'30%'}}>
          <option value="">Select a month</option>
          {months.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
        </div>
        <DetailSummaryReport data={data} />
      </div>
      
      </>
    )
  }
  
  export default SummaryReportTable;
  