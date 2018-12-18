import React, { Component } from 'react';
import { Link } from "react-router-dom";
import api from '../utils/api';

export default class RequestDetail extends Component {
  state = {
    error: null,
    request: {}
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    api({
      method: 'GET',
      endpoint: `/requests/${id}`
    })
    .then(({request}) => this.setState({request}))
    .catch(error => this.setState({error}))
  }

  handleDelete = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    api({
      method: 'DELETE',
      endpoint: `/requests/${id}`
    })
    .then(res => this.props.history.push('/requests'))
    .catch(error => this.setState({error}))
  }

  renderColor = (status) => {
    if(status === 'pending') return 'blue';
    if(status === 'approved') return 'orange';
    if(status === 'rejected') return 'red';
    return 'green';
  }

  render() {
    const { error, request } = this.state;
    return (
      <div className="container">
        <div className="flow-text">
          { request.title }
          <small style={{ marginLeft: '10px' }}>{request.status}</small>
        </div>
        <div className="pt"></div>
        <hr/>
        <p className="pt">{ request.desc }</p>
        <div className="actions pt">
          <em>{ request.location }</em>
          {request.status === 'pending' && (
            <div>
              <button type='button' onClick={this.handleDelete} class="waves-effect waves-light btn red" style={{ marginRight: '10px' }}>Delete</button>
              <Link to={`/requests/${request._id}/edit`} class="waves-effect waves-light btn">Edit</Link>
            </div>
          )}
        </div>
      </div>
    )
  }
}
