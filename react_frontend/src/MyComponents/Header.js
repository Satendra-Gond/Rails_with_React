import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

export default function Header(props) {
  // Helper function to determine if a link should be active
  const isActive = (path) => {
    return props.currentPath === path ? "active" : "";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">{props.title}</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive("/")}`}
                aria-current={props.currentPath === "/" ? "page" : undefined}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive("/textops")}`}
                aria-current={props.currentPath === "/textops" ? "page" : undefined}
                to="/textops"
              >
                Text Operations
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive("/about")}`}
                aria-current={props.currentPath === "/about" ? "page" : undefined}
                to="/about"
              >
                About
              </Link>
            </li>  
          </ul>
          {props.searchBar ? (
            <form className="d-flex">
              <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Search" 
                aria-label="Search" 
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          ) : ""}
        </div>
      </div>
    </nav>
  )
}

Header.defaultProps = {
  title: "Your Title Here",
  searchBar: true
}

Header.propTypes = {
  title: PropTypes.string,
  searchBar: PropTypes.bool.isRequired,
  currentPath: PropTypes.string.isRequired // Added PropType for currentPath
}