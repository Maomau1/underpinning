import React from 'react'
import {NavLink} from 'react-router-dom'
import './navbar.css'

function NavBar() {
  return (
    <div className='navbar'>
        <NavLink
        exact="true"
        to="/">
            Home
        </NavLink>
        <NavLink
        to="/projects">
            Projects
        </NavLink>  
        <NavLink
        to="/newproject">
            New Project
        </NavLink>    
        <NavLink
        to = "/about">
          About
        </NavLink>
    </div>
  )
}

export default NavBar