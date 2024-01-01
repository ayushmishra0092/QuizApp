import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// import "../css/common.css";
  

const Navbar = () => {
    let location = useLocation();
    const admin=!["/participant/"].includes(location.pathname);
    console.log(admin);
    let history=useNavigate();
    const handlelogout=()=>{
        localStorage.removeItem('token');
        history("/login");
    }
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success " >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">MyQuizApp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/createquiz"? "active": ""}`} to="/createquiz">Create Quiz</Link>
                        </li>

                    </ul>
                    {!localStorage.getItem('token')?<form className="d-flex"> 
                    <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                    </form>:<button onClick={handlelogout}className="btn btn-dark mx-1" > Logout </button>}
                </div>
            </div>
        </nav>
        </>
    )
}


export default Navbar
