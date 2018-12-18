import React, { Component } from 'react';

import './dashboard.scss';
import Nav from './Nav';
import Sidebar from './Sidebar';
import api from '../../utils/api';
import TableData from './TableData';

export default class Dashboard extends Component {
  state = {
    error: null,
    requests: []
  }

  componentDidMount() {
    api({
      method: 'GET',
      endpoint: '/requests'
    })
    .then(({requests}) => this.setState({requests}))
    .catch(error => this.setState({error}))
  }

  renderColor = (status) => {
    if(status === 'pending') return 'blue';
    if(status === 'approved') return 'orange';
    if(status === 'rejected') return 'red';
    return 'green';
  }

  render() {
    const { requests } = this.state;
    const data = requests.map(({_id, title, location, desc, status, userId, requester}) => (
      <tr key={_id}>
        <td>{_id.substr(0, 7)}</td>
        <td>{title.length > 20 ? `${title.substr(0, 20)}...` : title}</td>
        <td>{location}</td>
        <td>{requester}</td>
        <td>{desc.length > 30 ? `${desc.substr(0, 30)}...` : desc}</td>
        <td>
          <span
            className={`badge ${this.renderColor(status)} white-text`}
          >
            {status}
          </span>
        </td>
        <TableData id={_id} { ...this.props } />
      </tr>
    ));

    return (
      <div className="page-wrapper">
        <div className="content">

          <Nav />
          <main className="main">
            <div className="flow-text">All requests</div>
              { requests && (data.length > 0 ? (
                <table className="responsive-table pt">
                  <thead>
                    <tr>
                      <th data-field="id">Request ID</th>
                      <th data-field="name">Title</th>
                      <th data-field="name">Location</th>
                      <th data-field="price">Requester</th>
                      <th data-field="price">Description</th>
                      <th data-field="price">Status</th>
                    </tr>
                  </thead>
                    <tbody>
                      {data}
                    </tbody>
                </table>
              ) :
              <p className="center pt" style={{ widtd: '100vh' }}>No requests yet</p>
            )}
          </main>
        </div>
        <Sidebar {...this.props} />
      </div>
    )
  }
}
