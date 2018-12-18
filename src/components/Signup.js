import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import api from '../utils/api';

export default class Signup extends Component {
  state = {
    error: null,
    data: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
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
    const { data } = this.state;

    api({
      method: 'POST',
      data,
      endpoint: '/user/signup'
    })
    .then(res => {
      this.props.history.push('/');
    })
    .catch(error => {
      if(error) {
        this.setState({ error })
      }
    });
  }

  render() {
    const { error } = this.state;
    return (
      <div className="indigo fh">
        <div className="row">
          <div className="col m4 offset-m4 s12" style={{ marginTop: '150px' }}>
            <div className="card" style={{ padding: '25px' }}>
              <div className="card-content">
                <span className="card-title">Sign up</span>
                { error && <p className="red-text" style={{ paddingBottom: '20px' }}>{ error.message }</p> }
                  <form onSubmit={this.handleSubmit}>
                    <div className="input-field">
                      <input type="text" name="name" className="validate" onChange={this.handleChange} />
                      <label htmlFor="name">Name</label>
                    </div>
                    <div className="input-field">
                      <input type="email" name="email" className="validate" onChange={this.handleChange} />
                      <label htmlFor="email" data-error="wrong" data-success="right">Email</label>
                    </div>
                    <div className="input-field">
                      <input type="password" name="password" className="validate" onChange={this.handleChange} />
                      <label htmlFor="Password">Password</label>
                    </div>
                    <div className="input-field">
                      <input type="password" name="confirmPassword" className="validate" onChange={this.handleChange} />
                      <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>

                    <div className="input-field">
                      Already have an account? <Link to='/signin'>Sign in</Link>
                    </div>

                    <div className="input-field">
                      <button className="btn waves-effect waves-light" type="submit">Sign up</button>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
