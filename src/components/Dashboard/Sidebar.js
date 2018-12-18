import React from 'react';
import { NavLink } from "react-router-dom";

const Sidebar = () => (
  <aside className="sidebar">
    <div className="brand"><NavLink to="/requests" className="white-text">Mtracker</NavLink></div>
    <ul className="links">
      <li className="active"><NavLink to="/dashboard">Home</NavLink></li>
       <li><a href="!#">Sign out</a></li>
    </ul>
  </aside>
);

export default Sidebar;
