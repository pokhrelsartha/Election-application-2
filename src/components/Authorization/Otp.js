import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Otp() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [valuee, setValuee] = useState('');
    const [otp, setOtp] = useState('');
    const [show,setShow] = useState(false);
    const [showOtp,setShowOtp] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isNumber, setIsNumber] = useState(false);
    // const [validpass, setValidPass] = useState(false);
    // const history = useHistory();
    const validateEmail = (email) => {
      // Regular expression pattern for email validation
      var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return regex.test(email);
    }
  
    const validateNumber = (number) => {
      return (number.length === 10)
    }

    const handleSubmit1 = (event) => {
        event.preventDefault();
        if (!valuee) {
            // toast("An Email or Phone Number is Required");
            toast.warn('An Email or Phone number is required', {
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
        
        axios.get(`http://localhost:8080/signup/all`).then((respo) => {
          const responseData = respo.data;
          const enteredvalue = valuee;
          // console.log(enteredvalue);

          // Find the user object with the entered username
          const emailUser = responseData.find((user) => user.email === enteredvalue);
          // console.log(emailUser);

          const numberUser = responseData.find((user) => user.number === enteredvalue);
          // console.log(numberUser);

          if (emailUser) {
            // console.log('valid Email');
            const onlyEmail = {
              email: valuee,
            };
            setShowOtp(true);
            setIsEmail(true);
            setIsNumber(false);
            toast.success('OTP Sent to Email', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
            axios.put('http://localhost:8080/signup/otp', onlyEmail)
              .then(response => {
                  console.log('Response:', response.data);
              })
              .catch(error => {
                  console.error('Error is:', error);
              });
            } else if (numberUser) {
              // console.log('valid Number');
              const onlyNumber = {
                number: valuee,
              };
              setShowOtp(true);
              setIsEmail(false);
              setIsNumber(true);
              toast.success('OTP Sent to Phone Number', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
              axios.put('http://localhost:8080/signup/otpsms', onlyNumber)
                .then(response => {
                    console.log('Response:', response.data);
                })
                .catch(error => {
                    console.error('Error is:', error);
                });
              } 
              else if (validateEmail(enteredvalue)){
                setShowOtp(false);
                // alert("Email i.d not found");
                toast.error('Email i.d not found', {
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
              else if (validateNumber(enteredvalue)){
                setShowOtp(false);
                // alert("Phone number not found");
                toast.error('Phone number not found', {
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
              else {
                // console.log('Credential not found!');
                setShowOtp(false);
                // alert('Enter correct Email or Phone Number');
                toast.error('Enter a valid Email i.d or Phone number', {
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
            // console.log('Email not found!');
            // alert('Enter correct Email');
            // return;
            })
          .catch((error) => {
            console.error('Axios error:', error);
          });

        return;
    };

    
    const handleSubmit2 = (event) => {
      event.preventDefault();
      // console.log("coming to handlesubmit2");
        if (!password) {
            // alert("enter a password");
            toast.warn('Enter a password', {
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
        
        if (password.length < 7){
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
          // alert('passwords do not match');
          toast.error('Passwords do not match', {
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

        if (isEmail){
          const passCredentials = {
            email: valuee,
            password: password,
            };
        
            axios.post('http://localhost:8080/signup/changepassword', passCredentials)
            .then(response => {
                console.log('Response is:', response.data);
                // alert('Password Successfully Changed');
                toast.success('Password Successfully Changed', {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  });
                window.location.href='/'
                // setValidPass(true);
            })
            .catch(error => {
                console.error('Error:', error);
            });
            setPassword('');
            setConfirmPassword('');
        }
        else if (isNumber){
          const passCredentials2 = {
            number: valuee,
            password: password,
            };
        
            axios.post('http://localhost:8080/signup/changepassword2', passCredentials2)
            .then(response => {
                console.log('Response is:', response.data);
                // alert('Password Successfully Changed');
                toast.success('Password Successfully Changed', {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  });
                window.location.href='/'
                // setValidPass(true);
            })
            .catch(error => {
                console.error('Error:', error);
            });
            setPassword('');
            setConfirmPassword('');
        }
    };

    const handleSubmit3 = (event) => {
      if (!otp) {
          toast.warn('Enter an OTP', {
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
      if (isEmail){
        const emailRequest = {
          email: valuee,
          otp: otp,
          };
          // console.log(emailRequest);
          axios
          .post('http://localhost:8080/signup/verify', emailRequest)
          .then(response => {
              console.log('Response is:', response.data);
              if (response.data === 'Successfully verified'){
                setShow(true);
                // console.log('valid otp');
                toast.success('OTP Verified Successfully', {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  });
              }
              else if (response.data === 'You have entered the wrong OTP'){
                toast.error('You have entered the wrong OTP', {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  });
              }
          })
          .catch(error => {
              console.error('Error:', error);
          });
        setOtp('');
      }
      else if (isNumber){
        const numberRequest = {
          number: valuee,
          otp: otp,
          };
          console.log(numberRequest);
          axios
          .post('http://localhost:8080/signup/verify2', numberRequest)
          .then(response => {
              console.log('Response is:', response.data);
              if (response.data === 'Successfully verified'){
                setShow(true);
                toast.success('OTP Verified Successfully', {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  });
                // console.log('valid otp');
              }
              else if (response.data === 'You have entered the wrong OTP'){
                toast.error('You have entered the wrong OTP', {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  });
              }
          })
          .catch(error => {
              console.error('Error:', error);
          });
        setOtp('');
      }
  };
    
        // const signupData = {
        // password: password,
        // email: email,
        // };
    
        // axios
        // .post('http://localhost:8080/signup/save', signupData)
        // .then(response => {
        //     console.log('Response:', response.data);
        //     alert('User Added');
        //     history.push('/login'); // Navigate to Login page
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        // });
    
        // Reset form fields and errors
        // setPassword('');
        // setEmail('');
        // setConfirmPassword('');
    
        // setErrors({});
  return (
    <>
    <div style={{ marginTop: '30px' }}>
      <center>
          {show ? (
            <>
            <h2>Change Password</h2>
            <form>
            <div>
            <label style={{ position: 'relative', paddingRight: '10px' }}>New Password:</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label style={{ position: 'relative', paddingRight: '20px' }}>Confirm New Password:</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ position: 'relative', marginLeft: '0px', paddingRight: '0px' }}
            />
          </div>
          <center>
            <button onClick={handleSubmit2} type="submit" className="btn btn-success">
                Submit
            </button>
          </center>
          </form>
          </>
          ):(
          <>
          {showOtp?(
            <>
               <h2>Enter OTP</h2>
          <form>
          <div>
            <label style={{ position: 'relative', paddingRight: '20px' }}>Enter OTP:</label>
            <input
              type="text"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{ position: 'relative', marginLeft: '0px', paddingRight: '0px' }}
            />
          </div>
          <center>
          <button onClick={handleSubmit3} type="submit" className="btn btn-success">
            Submit
          </button>
        </center>
        </form>
            </>
          ):(
            <>
            <h2>Enter your Email / Phone Number</h2>
          <form>
          <div>
            <label style={{ position: 'relative', paddingRight: '20px' }}>Enter Email or Phone Number:</label>
            <input
              type="text"
              required
              value={valuee}
              onChange={(e) => setValuee(e.target.value)}
              style={{ position: 'relative', marginLeft: '0px', paddingRight: '0px' }}
            />
          </div>
          <center>
          <button onClick={handleSubmit1} type="submit" className="btn btn-success">
            Send OTP
          </button>
        </center>
        </form>
        </>
          )}
        </>)}
      </center>
    </div>
    <ToastContainer/>
    </>
  )
}
