
import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Range5() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count,setCount] = useState(0);
  

  useEffect(() => {
    fetchrange5(50000,100000);
  },[]);

  

  const fetchrange5 = (start,end) => {
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
  const range5Style = {
    borderCollapse: 'collapse',
    width: '100%',
  };

  const range5HeaderStyle = {
    border: '1px solid black',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
  };

  const range5CellStyle = {
    border: '1px solid black',
    padding: '5px',
    textAlign: 'center',
  };

  return (
    
    <div>
      <center>
        <br/>
        <h1>Constituency won with margin Range 50000-100000</h1>
        <h2 style={{ marginTop: '0.2rem' }}>({count} {count > 1 ? 'candidates' : 'candidate'})</h2>
        {isLoading ? ( // Render loading button if isLoading is true
          // <button disabled>Loading...</button>
          <FontAwesomeIcon icon={faSpinner} spin size="3x" /> // Display loader icon while loading
        ) : (
        <range5 style={range5Style}>
        <thead>
              <tr>
                <th style={range5HeaderStyle}>Sno</th>
                <th style={range5HeaderStyle}>Constituency Key</th>
                <th style={range5HeaderStyle}>Constituency Name</th>
                <th style={range5HeaderStyle}>Party Name</th>
                <th style={range5HeaderStyle}>Winner</th>
                <th style={range5HeaderStyle}>Runner</th>
                <th style={range5HeaderStyle}>Total Votes</th>
                <th style={range5HeaderStyle}>Difference</th>
              </tr>
            </thead>
            <tbody>
              {data.map((rowData, index) => (
                <tr key={rowData.sno}>
                  <td style={range5CellStyle}>{index + 1}</td>
                  <td style={range5CellStyle}>{rowData.constkey}</td>
                  <td style={range5CellStyle}>{rowData.constname}</td>
                  <td style={range5CellStyle}>{rowData.pname}</td>
                  <td style={range5CellStyle}>{rowData.winner}</td>
                  <td style={range5CellStyle}>{rowData.runner}</td>
                  <td style={range5CellStyle}>{rowData.totvotes}</td>
                  <td style={range5CellStyle}>{rowData.difference}</td>
                </tr>
                
              )
              )}
            </tbody>
      </range5>
    )}
        
  </center>
  </div>
  )
}
