
import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Range6() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count,setCount] = useState(0);
  

  useEffect(() => {
    fetchrange6(100000);
  },[]);


  const fetchrange6 = (start,end) => {
    axios.get(`http://52.42.106.142:8001/electionfinal/election/constrange/${start}`).then((response) => {
      const responseData = response.data;
      setData(responseData);
      const a = responseData.length;
      setCount(a);
     

    } )
    .finally(() => {
      setIsLoading(false); // Set loading state to false after the request is completed
    });
  }
  const range6Style = {
    borderCollapse: 'collapse',
    width: '100%',
  };

  const range6HeaderStyle = {
    border: '1px solid black',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
  };

  const range6CellStyle = {
    border: '1px solid black',
    padding: '5px',
    textAlign: 'center',
  };

  return (
    
    <div>
      <center>
        <br/>
        <h1>Constituency won with margin Range 100000 And Above</h1>
        <h2 style={{ marginTop: '0.2rem' }}>({count} {count > 1 ? 'candidates' : 'candidate'})</h2>
        {isLoading ? ( // Render loading button if isLoading is true
          // <button disabled>Loading...</button>
          <FontAwesomeIcon icon={faSpinner} spin size="3x" /> // Display loader icon while loading
        ) : (
        <range6 style={range6Style}>
        <thead>
              <tr>
                <th style={range6HeaderStyle}>Sno</th>
                <th style={range6HeaderStyle}>Constituency Key</th>
                <th style={range6HeaderStyle}>Constituency Name</th>
                <th style={range6HeaderStyle}>Party Name</th>
                <th style={range6HeaderStyle}>Winner</th>
                <th style={range6HeaderStyle}>Runner</th>
                <th style={range6HeaderStyle}>Total Votes</th>
                <th style={range6HeaderStyle}>Difference</th>
              </tr>
            </thead>
            <tbody>
              {data.map((rowData, index) => (
                <tr key={rowData.sno}>
                  <td style={range6CellStyle}>{index + 1}</td>
                  <td style={range6CellStyle}>{rowData.constkey}</td>
                  <td style={range6CellStyle}>{rowData.constname}</td>
                  <td style={range6CellStyle}>{rowData.pname}</td>
                  <td style={range6CellStyle}>{rowData.winner}</td>
                  <td style={range6CellStyle}>{rowData.runner}</td>
                  <td style={range6CellStyle}>{rowData.totvotes}</td>
                  <td style={range6CellStyle}>{rowData.difference}</td>
                </tr>
                
              )
              )}
            </tbody>
      </range6>
        )}
        </center>
        </div>
  )
}
