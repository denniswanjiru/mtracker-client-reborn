import React, { Component } from 'react';

import './dashboard.scss';
import Nav from './Nav';
import Sidebar from './Sidebar';
import BigCalendar from './BigCalendar';

export default class Scheduler extends Component {
  state = {
    error: null,
    requests: []
  }

  render() {
    return (
      <div className="page-wrapper" style={{ position: 'fixed' }}>
        <div className="content">
          <Nav />
          <main className="main">
            <div className="flow-text">Mtracker Scheduler</div>
            <BigCalendar />
          </main>
        </div>
        <Sidebar {...this.props} />
      </div>
    )
  }
}
