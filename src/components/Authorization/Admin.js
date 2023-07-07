import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  },[]);

  const getData = () => {
    axios.get(`http://52.42.106.142:8001/electionfinal/signup/all`).then((respo) => {
      const responseData = respo.data;
      setUsers(responseData);
      console.log(responseData);
  })
  .catch((error) => {
    console.error('Axios error:', error);
  });
  }

  const table2Style = {
    borderCollapse: 'collapse',
    width: '95%',
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

  const deleteUser = (id) => {
    axios.delete(`http://52.42.106.142:8001/electionfinal/signup/delete/${id}`).then((respo) => {
        const responseData = respo.data;
        // setUsers(responseData);
        console.log(responseData);
        getData();
      })
      .catch((error) => {
        console.error('Axios error:', error);
      });
  };

  return (
    <div>
    <h2 style={{paddingTop:'20px'}}>User List</h2>
    <center>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={table2HeaderStyle}>Sno</th>
            <th style={table2HeaderStyle}>Username</th>
            <th style={table2HeaderStyle}>Password</th>
            <th style={table2HeaderStyle}>Email i.d</th>
            <th style={table2HeaderStyle}>Phone number</th>
            <th style={table2HeaderStyle}>OTP</th>
            <th style={table2HeaderStyle}>Delete User</th>
          </tr>
        </thead>
        <tbody>
          {users.map((data, index) => (
            <tr key={data.sno}>
              <td style={table2CellStyle}>{index + 1}</td>
              <td style={table2CellStyle}>{data.username}</td>
              <td style={table2CellStyle}>{data.password}</td>
              <td style={table2CellStyle}>{data.email}</td>
              <td style={table2CellStyle}>{data.number}</td>
              <td style={table2CellStyle}>{data.otp}</td>
              <td style={table2CellStyle}>
                <button onClick={() => deleteUser(data.username)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </center>
  </div>
  );
};

export default Admin;
