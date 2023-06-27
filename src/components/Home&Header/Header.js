import React,{useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import "../CSS/Header.css";
import img1 from "../images/img1.png";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = (props) => {
  const [isMenuOpen, setMenuOpen] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(true);

  const logout = () => {
    setTimeout(() => {
      toast.success('Logout successful');   
    },3000);
    window.location.href='/'
  }

  useEffect(() => {
    setMenuOpen(props.render);
  }, [props.render]);

  useEffect(() => {
    setIsAdminOpen(props.adminRender);
  }, [props.adminRender]);

  return (
    <>
      <nav className="header-container" style={{}}>
        <div className="Container center" style={{}}>
          <div className="ui fixed" style={{}}>
            <div className="header-content" style={{}}>
              <div className="logo-heading-container" style={{}}>
                <img style={{marginTop:'5px'}} src={img1} alt="Logo" className="logo" />
                <h2 style={{paddingTop: '20px',position:'relative'}}> Karnataka 2023 Election results</h2>
                {isMenuOpen && 
                  <button onClick={logout} style={{marginLeft: 'auto',position:'absolute',right:'25px',width:'100px'}}>Logout</button>
                }
              </div>
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen &&(
        <nav>
          <div className="Container center">
          <div className="ui fixed">
            <div id="id1" className="header-content" style={{ display: "flex", justifyContent: "space-around",paddingTop:"10px",paddingBottom:'10px' }}>
              <Link to="/home">
                <button className="btn btn-warning">Home</button>
              </Link>
              <Link to="/charts">
                <button className="btn btn-warning">Charts</button>
              </Link>
              <Link to="reports">
                <button className="btn btn-warning">Reports</button>
              </Link>
              <Link to="cabi">
              <button className="btn btn-warning" style={{ whiteSpace: "nowrap", width: "auto" }}>
                Cabinet Ministers
              </button>
              </Link>
              {isAdminOpen && (
                  <Link to="admin">
                    <button className="btn btn-warning" >
                      Users
                    </button>
                  </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      )}
    </>
  );
};

export default Header;