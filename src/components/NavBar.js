import React from 'react';
import { NavLink } from 'react-router-dom';
import M from 'materialize-css';


import { getCurrentUser } from '../utils/helpers';

export default class NavBar extends React.Component {
  componentDidMount() {
    const el = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(el);
  }

  handleSignout = e => {
    e.preventDefault();
    console.log('signed out')
    localStorage.removeItem('user');
    this.props.history.push('/');
  }

  render() {
    const { name, role } = getCurrentUser();
    return (
      <nav>
        <div className="nav-wrapper indigo" style={{ padding: '0 40px' }}>
          <NavLink to="/requests" className="brand-logo">mtracker</NavLink>
            <ul className="right hide-on-med-and-down">
              <li><NavLink to="/requests">Requests</NavLink></li>
              <li><NavLink to="/requests/new">New request</NavLink></li>
              <li><a href="!#" className="dropdown-trigger signout" data-target='dropdown1'>{ name }</a></li>
            </ul>
        </div>

        <ul id='dropdown1' class='dropdown-content signout'>
           {role === 'admin' && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
           <li onClick={this.handleSignout}><a href="#!">Sign out</a></li>
         </ul>
      </nav>
    );
  }
}
