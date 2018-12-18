import React, { Component } from 'react';
import api from '../utils/api';

export default class EditRequest extends Component {
  state = {
    error: null,
    data: {
      title: "",
      location: "",
      desc: ""
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    api({
      method: 'GET',
      endpoint: `/requests/${id}`
    })
    .then(({request}) => this.setState({data: request}))
    .catch(error => this.setState({error}))
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
    const { id } = this.props.match.params;

    api({
      method: 'PATCH',
      data,
      endpoint: `/requests/${id}`
    })
    .then(res => {
      console.log(res)
      this.props.history.push(`/requests/${id}`);
    })
    .catch(error => {
      if(error) {
        this.setState({ error })
      }
    });
  }

  render() {
    const { title, location, desc } = this.state.data;
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
            <div className="flow-text">Update your request</div>
            <form onSubmit={this.handleSubmit}>
              <div className="pt">
                <div className="input-field col s12">
                  <input type="text" name="title" onChange={this.handleChange} className="validate" value={title} />
                  <label htmlFor="title">Request title</label>
                </div>
              </div>

              <div className="pt">
                <div className="input-field col s12">
                  <input type="text" name="location" onChange={this.handleChange} className="validate"  value={location}  />
                  <label htmlFor="location">Location</label>
                </div>
              </div>

              <div className="pt">
                <div className="input-field col s12">
                  <textarea name="desc" className="materialize-textarea" onChange={this.handleChange} value={desc}></textarea>
                  <label htmlFor="desc">Request description</label>
                </div>
              </div>

              <div className="pt">
                <div className="input-field col s12">
                   <button type="submit" className="waves-effect waves-light btn right">Save changes</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
