import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


export default function Table4() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetchTable4();
  },[]);

  


  const fetchTable4 = () => {
    setIsLoading(true);
    axios.get('http://52.42.106.142:8001/electionfinal/election/highestnota').then((respon) => {
      const response = respon.data;
      setData(response);
    } )
    .finally(() => {
      setIsLoading(false); // Set loading state to false after the request is completed
    });
  }

  const table4Style = {
        borderCollapse: 'collapse',
        width: '100%',
      };
    
      const table4HeaderStyle = {
        border: '1px solid black',
        padding: '8px',
        backgroundColor: '#f2f2f2',
        textAlign: 'center',
      };
    
      const table4CellStyle = {
        border: '1px solid black',
        padding: '8px',
        textAlign: 'center',
      };


    return (
      <>
      <br/>
      <Link to="/reports">
          <button className="btn btn-secondary mx-2">
              Back
          </button>
      </Link>
      <br/>
      <br/>
      <div>
          <center>
              <h2>Top-5 Constituencies with highest NOTA notes</h2>
          </center>
      </div>
      <br/>
      {/* <button onClick={fetchTable4()}>click here!</button> */}
      <center>
      {isLoading ? ( // Render loading button if isLoading is true
          // <button disabled>Loading...</button>
          <FontAwesomeIcon icon={faSpinner} spin size="3x" /> // Display loader icon while loading
        ) : (
      <table4 style={table4Style}>
        <thead>
          <tr>
            <th style={table4HeaderStyle}>Sno</th>
            <th style={table4HeaderStyle}>Constituency Name</th>
            <th style={table4HeaderStyle}>Constituency key</th>
            <th style={table4HeaderStyle}>Total NOTA Votes</th>
            <th style={table4HeaderStyle}>Percentage of Votes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data,index) => (
            <tr key={data.sno}>
              <td style={table4CellStyle}>{index+1}</td>
              <td style={table4CellStyle}>{data.constname}</td>
              <td style={table4CellStyle}>{data.constkey}</td>
              <td style={table4CellStyle}>{data.totvotes}</td>
              <td style={table4CellStyle}>{data.percentofvotes}</td>
            </tr>
          ))}
        </tbody>
      </table4>
        )}
      </ center>
      </>
    );
}