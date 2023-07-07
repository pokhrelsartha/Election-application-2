
import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Range2() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count,setCount] = useState(0);
  

  useEffect(() => {
    fetchrange2(100,1000);
  },[]);

  const fetchrange2 = (start,end) => {
    
    // setIsLoading(true); 
    axios.get(`http://52.42.106.142:8001/electionfinal/election/constrange/${start}/${end}`).then((response) => {
      const responseData = response.data;
      setData(responseData);
      const a = responseData.length;
      setCount(a);
    } )
    .finally(() => {
      setIsLoading(false); // Set loading state to false after the request is completed
    });
  }

  const range2Style = {
    borderCollapse: 'collapse',
    width: '100%',
  };

  const range2HeaderStyle = {
    border: '1px solid black',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
  };

  const range2CellStyle = {
    border: '1px solid black',
    padding: '5px',
    textAlign: 'center',
  };

  return (
    
    <div>
      <center>
        <br/>
        {/* <h1>Constituency won with margin Range 100-1000</h1>
        <br/>
        <h1> ({count} {count > 1 ? ('candidates'):('candidate')})</h1> */}
        <h1>Constituency won with margin Range 100-1000</h1>
        <h2 style={{ marginTop: '0.2rem' }}>({count} {count > 1 ? 'candidates' : 'candidate'})</h2>

        {isLoading ? ( // Render loading button if isLoading is true
          // <button disabled>Loading...</button>
          <FontAwesomeIcon icon={faSpinner} spin size="3x" /> // Display loader icon while loading
        ) : (
        <range2 style={range2Style}>
        <thead>
              <tr>
                <th style={range2HeaderStyle}>Sno</th>
                <th style={range2HeaderStyle}>Constituency Key</th>
                <th style={range2HeaderStyle}>Constituency Name</th>
                <th style={range2HeaderStyle}>Party Name</th>
                <th style={range2HeaderStyle}>Winner</th>
                <th style={range2HeaderStyle}>Runner</th>
                <th style={range2HeaderStyle}>Total Votes</th>
                <th style={range2HeaderStyle}>Difference</th>
              </tr>
            </thead>
            <tbody>
              {data.map((rowData, index) => (
                <tr key={rowData.sno}>
                  <td style={range2CellStyle}>{index + 1}</td>
                  <td style={range2CellStyle}>{rowData.constkey}</td>
                  <td style={range2CellStyle}>{rowData.constname}</td>
                  <td style={range2CellStyle}>{rowData.pname}</td>
                  <td style={range2CellStyle}>{rowData.winner}</td>
                  <td style={range2CellStyle}>{rowData.runner}</td>
                  <td style={range2CellStyle}>{rowData.totvotes}</td>
                  <td style={range2CellStyle}>{rowData.difference}</td>
                </tr>
                
              )
              )}
            </tbody>

      </range2>
      )}
        </center>
        </div>
  )
}
