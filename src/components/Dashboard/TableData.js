import React, { Component } from 'react';
import M from 'materialize-css';
import api from '../../utils/api';

export default class TableData extends Component {
  componentDidMount() {
    console.log(this.props)
    const el = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(el);
  }

  handleAction = (action) => {
    const { id, history } = this.props;

    api({
      method: 'PATCH',
      endpoint: `/approvals/${action}/${id}`
    })
    .then(res => history.push('/dashboard'))
    .catch(error => console.log(error));
  }

  render() {
    const {id} = this.props;
    return (
      <React.Fragment>
        <td>
          <a className='dropdown-trigger' href='#!' data-target={id}>
            <i className="material-icons">keyboard_arrow_down</i>
          </a>
        </td>

        <ul id={id} className='dropdown-content'>
          <li><a href="#!">View</a></li>
          <li onClick={() => this.handleAction('approve')} ><a href="#!">Approve</a></li>
          <li onClick={() => this.handleAction('reject')} ><a href="#!">Reject</a></li>
          <li onClick={() => this.handleAction('resolve')} ><a href="#!">Resolve</a></li>
        </ul>
      </React.Fragment>
    )
  }
}
