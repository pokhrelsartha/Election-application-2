import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import "../CSS/Table5.css";
export default function Range4() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count,setCount] = useState(0);
  
  useEffect(() => {
    fetchrange4(10000,50000);
  },[]);

  const fetchrange4 = (start,end) => {
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
  const range4Style = {
    borderCollapse: 'collapse',
    width: '100%',
  };

  const range4HeaderStyle = {
    border: '1px solid black',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
  };

  const range4CellStyle = {
    border: '1px solid black',
    padding: '5px',
    textAlign: 'center',
  };

  return (
    <div>
      <center>
        <br/>
        <h1 >Constituency won with margin Range 10000-50000</h1>
        <h2 style={{ marginTop: '0.2rem' }}>({count} {count > 1 ? 'candidates' : 'candidate'})</h2>
        {isLoading ? ( // Render loading button if isLoading is true
          // <button disabled>Loading...</button>
          <FontAwesomeIcon icon={faSpinner} spin size="3x" /> // Display loader icon while loading
        ) : (
        <range4 style={range4Style}>
        <thead>
              <tr>
                <th style={range4HeaderStyle}>Sno</th>
                <th style={range4HeaderStyle}>Constituency Key</th>
                <th style={range4HeaderStyle}>Constituency Name</th>
                <th style={range4HeaderStyle}>Party Name</th>
                <th style={range4HeaderStyle}>Winner</th>
                <th style={range4HeaderStyle}>Runner</th>
                <th style={range4HeaderStyle}>Total Votes</th>
                <th style={range4HeaderStyle}>Difference</th>
              </tr>
            </thead>
            <tbody>
              {data.map((rowData, index) => (
                <tr key={rowData.sno}>
                  <td style={range4CellStyle}>{index + 1}</td>
                  <td style={range4CellStyle}>{rowData.constkey}</td>
                  <td style={range4CellStyle}>{rowData.constname}</td>
                  <td style={range4CellStyle}>{rowData.pname}</td>
                  <td style={range4CellStyle}>{rowData.winner}</td>
                  <td style={range4CellStyle}>{rowData.runner}</td>
                  <td style={range4CellStyle}>{rowData.totvotes}</td>
                  <td style={range4CellStyle}>{rowData.difference}</td>
                </tr>
                
              )
              )}
            </tbody>
      </range4>
    )}
  </center>
  </div>
  )
}
