import React,{useState,useEffect} from "react";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import Login from "./components/Authorization/Login";
import Signup from "./components/Authorization/Signup";
import Otp from "./components/Authorization/Otp";
import Header from "./components/Home&Header/Header";
import Home from "./components/Home&Header/home";
import Charts from "./components/Charts/Charts";
import Reports from "./components/Reports/Reports";
import Table1 from "./components/Tables/Table1";
import Table2 from './components/Tables/Table2';
import Table3 from "./components/Tables/Table3";
import Table4 from "./components/Tables/Table4";
import Table5 from "./components/Tables/Table5";
import Cabinet from "./components/Cabinet/Cabinet";
import SessionTimeout from "./components/Authorization/SessionTimeout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from "./components/Authorization/Admin";


function App() {
    const [render, setRender] = useState(false);
    const [adminRender, setAdminRender] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const history = useHistory();

    const handleSessionTimeout = () => {
      setRender(false);
      setIsAuthenticated(false);
      setAdminRender(false);
      window.location.href = '/';
      // history.push('/');
    };

    useEffect(() => {
      // Check if the user is already logged in
      const userLoggedIn = isAuthenticated;
      if (!userLoggedIn) {
        setIsAuthenticated(false);
      }
    }, [isAuthenticated]);

      return (
        <Router>
          {/* this below snippet works fine, but not spa */}
           <SessionTimeout timeoutInMinutes={10} onTimeout={handleSessionTimeout} history={history}/>
           <ToastContainer/>
          {/* <SessionTimeout timeoutInMinutes={0.07} onTimeout={handleSessionTimeout}/> */}
          {/* {isAuthenticated?(<Header render={render}/>):(<Header render={false}/>)} */}
          {adminRender? (
              <div>
              <Header render={render} adminRender={adminRender}/>
              <Switch>
                <Route path="/home">
                  <Home/>
                </Route>
                <Route path="/charts">
                  <Charts />
                </Route>
                <Route path="/reports">
                  <Reports />
                </Route>
                <Route path="/cabi">
                  <Cabinet />
                </Route>
                <Route path="/admin">
                  <Admin />
                </Route>
                <Route path="/table1">
                  <Table1 />
                </Route>
                <Route path="/table2">
                  <Table2 />
                </Route>
                <Route exact path="/table3">
                  <Table3 />
                </Route>
                <Route exact path="/table4">
                  <Table4 />
                </Route>
                <Route exact path="/table5">
                  <Table5 />
                </Route>
                <Route path="/">
                  <Home/>
                </Route>
                <Route path="/logout">
                  <Login/>
                </Route>
              </Switch>
              </div>
          ):isAuthenticated ? (
              <div>
                <Header render={render} adminRender={adminRender}/>
                <Switch>
                  <Route path="/home">
                    <Home/>
                  </Route>
                  <Route path="/charts">
                    <Charts />
                  </Route>
                  <Route path="/reports">
                    <Reports />
                  </Route>
                  <Route path="/cabi">
                    <Cabinet />
                  </Route>
                  <Route path="/table1">
                    <Table1 />
                  </Route>
                  <Route path="/table2">
                    <Table2 />
                  </Route>
                  <Route exact path="/table3">
                    <Table3 />
                  </Route>
                  <Route exact path="/table4">
                    <Table4 />
                  </Route>
                  <Route exact path="/table5">
                    <Table5 />
                  </Route>
                  <Route path="/">
                    <Home/>
                  </Route>
                  <Route path="/logout">
                    <Login/>
                  </Route>
                </Switch>
              </div>
            ):(
              <div>
                <Header render={false} adminRender={false}/>
                <Switch>
                  <Route path="/signup">
                    <Signup setRender={setRender} setAdminRender={setAdminRender}/>
                  </Route>
                  <Route path="/emailotp">
                    <Otp/>
                  </Route>
                  <Route path="/">
                    <Login setAdminRender={setAdminRender} auth={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setRender={setRender} />
                  </Route>
                </Switch>
               </div>
            )}
        </Router>
      );
    }

export default App;
