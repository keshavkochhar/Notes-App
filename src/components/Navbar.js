import React, { useEffect } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";


const Navbar = () => {
  let navigate= useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  let location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/">
        <i class="fa-solid fa-book"></i>  INotebook 
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link
                class={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link
                class={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/About"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('token')?<form className="d-flex">
            
            <Link className="btn btn-primary mx-1" to="/login" role="button">
              Login <i class="fa-solid fa-right-to-bracket"></i>
            </Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">
              Signup <i class="fa-solid fa-user-plus"></i>
            </Link>
            </form>:<button onClick={handleLogout} className="btn btn-primary mx-2">Logout</button>}
         
            <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search Your Notes" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
      
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
