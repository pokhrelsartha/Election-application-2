import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


export default function Cabinet() {
    const [arr, setArr] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetchDatas();
      }, []);
    const fetchDatas = () =>  {
        setIsLoading(true);
        axios.get(`http://52.42.106.142:8001/electionfinal/cabinet/ministers`)
        .then((response) => {
            const k = response.data;
            setArr(k);
        })
        .finally(() => {
            setIsLoading(false); // Set loading state to false after the request is completed
          });

        }
        const table2Style = {
            borderCollapse: 'collapse',
            width: '80%', // Adjust the width here
            height: '100px', // Adjust the height here
          };
        
          const table2HeaderStyle = {
            border: '1px solid black',
            padding: '8px',
            backgroundColor: '#f2f2f2',
            textAlign: 'center',
          };
        
          const table2CellStyle = {
            border: '1px solid black',
            padding: '8px',
            textAlign: 'center',
          };
    return (
        <div style={{marginTop:'25px'}}>
            <center>
                <h1>Cabinet Ministers of Karnataka</h1>
                {isLoading ? ( // Render loading button if isLoading is true
                // <button disabled>Loading...</button>
                <FontAwesomeIcon icon={faSpinner} spin size="3x" /> // Display loader icon while loading
                ) : (
            <table style={table2Style}>
                <thead>
                <tr>
                    <th style={table2HeaderStyle}>Sno</th>
                    <th style={table2HeaderStyle}>Minister Name</th>
                    <th style={table2HeaderStyle}>Portfolios</th>
                </tr>
                </thead>
                <tbody>
                {arr.map((data,index) => (
                    <tr key={data.sno}>
                    <td style={table2CellStyle}>{index+1}</td>
                    <td style={table2CellStyle}>{data.ministername}</td>
                    <td style={table2CellStyle}>{data.portfolio}</td>
                    </tr>
                ))}
                </tbody>
            </table>
             )}
            </center>
        </div>
    )
}
