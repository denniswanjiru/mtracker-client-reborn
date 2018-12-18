import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import api from '../utils/api';

export default class Requests extends Component {
  state = {
    requests: []
  }

  componentDidMount() {
    api({
      method: 'GET',
      endpoint: '/requests'
    })
    .then(({requests })=> this.setState({ requests }))
    .catch(err => console.log(err))
  }

  renderColor = (status) => {
    if(status === 'pending') return 'blue';
    if(status === 'approved') return 'orange';
    if(status === 'rejected') return 'red';
    return 'green';
  }

  render() {
    const { requests } = this.state;
    const reqs = requests.map(({_id, title, desc, status}) => (
      <Link to={`/requests/${_id}`}>
        <div className="col m4 s12" key={_id}>
          <div className="card" style={{ minHeight: '170px' }}>
            <div className="card-content">
              <span className="card-title">{title}</span>
              <p>{desc.length > 50 ? `${desc.substr(0, 50)}...` : desc }</p>

              <div className="card-action" style={{ padding: '10px 0', marginTop: '20px' }}>
                <span
                  className={`badge ${this.renderColor(status)} white-text`}
                >
                  {status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    ));

    return (
      <div className="row">
        <div className="col s12" style={{ marginBottom: '20px' }}>
          <div className="flow-text">All Requests</div>
        </div>
        {reqs.length > 0 ? reqs : <p className="center pt" style={{ widtd: '100vh' }}>No requests yet</p>}
      </div>
    )
  }
}
