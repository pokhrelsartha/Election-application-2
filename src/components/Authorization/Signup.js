// Signup.js
import React, { useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const history = useHistory();

  const validateEmail = (email) => {
    // Regular expression pattern for email validation
    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  }

  const validateNumber = (number) => {
    return (number.length === 10)
  }

  const post = () => {
    const signupData = {
      username: username,
      password: password,
      email: email,
      number: '+91'+number,
    };
  
    axios.post('http://52.42.106.142:8001/electionfinal/signup/save', signupData)
      .then(response => {
        // alert('User Added');
        setTimeout(() => {
          toast.success('User Added',{
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
        }, 300);
        history.push('/');
      })
      .catch(error => {
        console.error('Error:', error);
      });


    // Reset form fields 
    setUsername('');
    setPassword('');
    setEmail('');
    setConfirmPassword('');
    setNumber('');

  }

  const handleSubmit = (event) => {

      event.preventDefault();

      axios.get(`http://52.42.106.142:8001/electionfinal/signup/all`).then((respo) => {
          const responseData = respo.data;
          const enteredUsername = username; // Replace with the username entered by the user
          const enteredEmail = email;
          const enteredNumber = number;

          const is_user = responseData.find((user) => user.username === enteredUsername);
          const is_existing_email = responseData.find((user) => user.email === enteredEmail);
          const is_existing_number = responseData.find((user) => user.number === '+91'+enteredNumber);

      if (!username) {
        toast.info('Username is required', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        return;
      }
      if (!password) {
        // alert('Password is required');
        toast.info('Password is required', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        return;
      }

      if (password.length < 8){
        // alert('enter password of length 8 characters minimum');
        toast.warn('enter password of length 8 characters minimum', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        return;
      }

      if (password !== confirmPassword) {
        // alert('passwords donot match');
        toast.warn('Passwords do-not match', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        return;
      }

      if (!email) {
        // alert('Email is required');
        toast.info('Email is required', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        return;
      }

      if (validateEmail(email)) {
      } else {
        // alert('Enter a valid email i.d');
        toast.warn('enter a valid email-id', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        return;
      }

      if (!number) {
        // alert('Phone Number is required');
        toast.info('Phone number is required', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        return;
      }

      if (!(validateNumber(number) && Number.isInteger(parseInt(number)))){
        // console.log("Phone Number is not Valid");
        // alert('enter a valid 10-digit Phone Number');
        toast.warn('enter a valid 10-digit Phone number', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        return;
      }

      if (is_user !== undefined){
        setUsername('');
        // alert("Username already exists, enter a new username");
        toast.error('Username already exists, enter a new username', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        return;
      }
      if (is_existing_email !== undefined){
        setEmail('');
        // alert("Email already exists, enter a new Email");
        toast.error('Email already exists, enter a new Email', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        return;
      }
      if (is_existing_number !== undefined){
        setNumber('');
        // alert("Phone number already exists, enter a new phone number");
        toast.error('Phone number already exists, enter a new phone number', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        return;
      }

      // posting details into the database after all the above validations are satisfied.
      post();

      })
      .catch((error) => {
        console.error('Axios error:', error);
      });
  };

  return (
    <>
    <div style={{ marginTop: '30px',display: 'flex',justifyContent:'center' }}>
  <center>
    <h2>Sign Up</h2>
    <form>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ width: '120px', paddingRight: '10px' }}>Username:</label>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ width: '120px', paddingRight: '14px' }}>Password:</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ width: '120px', paddingRight: '20px' }}>Confirm Password:</label>
        <input
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center',justifyContent:'center' }}>
        <label style={{ width: '120px', paddingRight: '20px' }}>Email:</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ width: '120px', paddingRight: '20px' }}>Phone Number:</label>
        <input
          type="text"
          required
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <center>
        <button onClick={handleSubmit} type="submit" className="btn btn-success">
          Submit
        </button>
      </center>
    </form>
    <p>
      Already have an account? <Link to="/">Login</Link>
    </p>
  </center>
</div>
<ToastContainer/>
</>
  );
};

export default Signup;
