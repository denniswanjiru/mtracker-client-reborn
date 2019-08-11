import React from 'react';
import { NavLink } from "react-router-dom";

class Sidebar extends React.Component {
  handleSignout = e => {
    e.preventDefault();
    console.log('signed out')
    localStorage.removeItem('user');
    this.props.history.push('/');
  }

  render() {
    return (
      <aside className="sidebar">
        <div className="brand"><NavLink to="/requests" className="white-text">mtracker</NavLink></div>
        <ul className="links">
          <li className="active"><NavLink to="/dashboard">Home</NavLink></li>
          <li className=""><NavLink to="/scheduler">Scheduler</NavLink></li>
          <li onClick={this.handleSignout}><a href="!#">Sign out</a></li>
        </ul>
      </aside>
    );
  }
}

export default Sidebar;
