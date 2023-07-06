import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Range1() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count,setCount] = useState(0);
  
  useEffect(() => {
    fetchRange1(1, 100);
  }, []);

  const fetchRange1 = (start, end) => {
    setIsLoading(true);

    axios.get(`http://localhost:8080/election/constrange/${start}/${end}`)
      .then((response) => {
        const responseData = response.data;
        setData(responseData);
        const a = responseData.length;
        setCount(a);
      })
      .finally(() => {
        setIsLoading(false); // Set loading state to false after the request is completed
      });
  };

  const range1Style = {
    borderCollapse: 'collapse',
    width: '100%',
  };

  const range1HeaderStyle = {
    border: '1px solid black',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
  };

  const range1CellStyle = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
  };

  return (
    
    <div>
      <br/>
      <center>
        <h1>Constituency won with margin Range 1-100</h1>
        <h2 style={{ marginTop: '0.2rem' }}>({count} {count > 1 ? 'candidates' : 'candidate'})</h2>
        {isLoading ? ( // Render loading button if isLoading is true
          // <button disabled>Loading...</button>
          <FontAwesomeIcon icon={faSpinner} spin size="3x" /> // Display loader icon while loading
        ) : (
        <center>
          <table style={range1Style}>
            <thead>
              <tr>
                <th style={range1HeaderStyle}>Sno</th>
                <th style={range1HeaderStyle}>Constituency Key</th>
                <th style={range1HeaderStyle}>Constituency Name</th>
                <th style={range1HeaderStyle}>Party Name</th>
                <th style={range1HeaderStyle}>Winner</th>
                <th style={range1HeaderStyle}>Runner</th>
                <th style={range1HeaderStyle}>Total Votes</th>
                <th style={range1HeaderStyle}>Difference</th>
              </tr>
            </thead>
            <tbody>
              {data.map((rowData, index) => (
                <tr key={rowData.sno}>
                  <td style={range1CellStyle}>{index + 1}</td>
                  <td style={range1CellStyle}>{rowData.constkey}</td>
                  <td style={range1CellStyle}>{rowData.constname}</td>
                  <td style={range1CellStyle}>{rowData.pname}</td>
                  <td style={range1CellStyle}>{rowData.winner}</td>
                  <td style={range1CellStyle}>{rowData.runner}</td>
                  <td style={range1CellStyle}>{rowData.totvotes}</td>
                  <td style={range1CellStyle}>{rowData.difference}</td>
                </tr>
                
              )
              )}
            </tbody>
          </table>
          </center>
        ) 
        }
      </center>
    </div>
  );
}

