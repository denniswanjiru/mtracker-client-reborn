import React, { Component } from 'react';
import api from '../utils/api';

export default class NewRequest extends Component {
  state = {
    error: null,
    data: {
      title: "",
      location: "",
      desc: ""
    }
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('clicked')
    const { data } = this.state;

    api({
      method: 'POST',
      data,
      endpoint: '/requests'
    })
    .then(res => {
      console.log(res)
      this.props.history.push('/requests');
    })
    .catch(error => {
      if(error) {
        this.setState({ error })
      }
    });
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <div className="fullPage">
          <div className="slogan">
            <div> » Make a request</div>
            <div> » We review it</div>
            <div> » We approve it</div>
            <div> » We attend to it</div>
          </div>
          <div className="form">
            <div className="flow-text">Make a new request</div>
            <form onSubmit={this.handleSubmit}>
              <div className="pt">
                <div className="input-field col s12">
                  <input type="text" name="title" onChange={this.handleChange} className="validate" />
                  <label htmlFor="title">Request title *</label>
                </div>
              </div>

              <div className="pt">
                <div className="input-field col s12">
                  <input type="text" name="location" onChange={this.handleChange} className="validate" />
                  <label htmlFor="location">Location *</label>
                </div>
              </div>

              <div className="pt">
                <div className="input-field col s12">
                  <textarea name="desc" className="materialize-textarea" onChange={this.handleChange}></textarea>
                  <label htmlFor="desc">Request description *</label>
                </div>
              </div>

              <div className="pt">
                <div className="input-field col s12">
                   <button type="submit" className="waves-effect waves-light btn right">Create request</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
