import React, { Component } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import Modal from 'react-awesome-modal';
import Select from 'react-select';
import api from '../../utils/api';

const localizer = momentLocalizer(moment)
const myEventsList = [{start: new Date(), end: new Date(), title: 'Test Event'}];

export default class BigCalendar extends Component {
  state = {
    visible: false,
    selectedSlot: '',
    req: null,
    assignee: '',
    requests: [],
    events: []
  }

  componentDidMount() {
    const events = JSON.parse(localStorage.getItem('events'));
    this.setState({ events });

    api({
      method: 'GET',
      endpoint: '/requests'
    })
      .then(({ requests }) => this.setState({ requests }))
      .catch(error => this.setState({ error }))
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Updating...')
    if (prevState.events !== this.state.events) {
      localStorage.setItem('events', JSON.stringify(this.state.events));
      api({
        method: 'GET',
        endpoint: '/requests'
      })
        .then(({ requests }) => this.setState({ requests }))
        .catch(error => this.setState({ error }))
    }
  }



  openModal() {
    this.setState({
      visible: true
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSelect = requestId => {
    this.setState({ req: requestId })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { req, events, selectedSlot } = this.state;
    console.log(this.state.events);

    api({
      method: 'PATCH',
      endpoint: `/approvals/approve/${req.key}`
    })
      .then(res => {
        const { _id, title, requester } = res.approvedRequest;

        const evt = {
          start: selectedSlot,
          end: selectedSlot,
          title: `${title} - ${requester}(${_id})`
        }

        console.log(evt)

        const newEvents = [...events, evt];
        this.setState({ events: newEvents, assignee: '', req: null });
        this.closeModal()
      })
      .catch(error => console.log(error));


  }

  handleClick = e => {
    this.setState({ selectedSlot: e.start })
    this.openModal();
  }

  render() {
    const { visible, events, requestId, requests } = this.state;
    const options = requests.filter(req => req.status === 'pending')
      .map(req => ({ key: req._id, label: `${req.title} - ${req.requester}` }))

    console.log(events);

    return (
      <div style={{ height: '600px' }}>
        <Calendar
          selectable
          localizer={localizer}
          events={events}
          startAccessor="start"
          views={['month']}
          endAccessor="end"
          onSelectSlot={this.handleClick}
        />
        <Modal visible={visible} width="400" height="300" effect="fadeInDown" onClickAway={() => this.closeModal()}>
          <div className="schedule">
            <h5>Schedule Request</h5>
            <form onSubmit={this.handleSubmit}>
              <div className="input-field col s12">
                <Select
                  value={requestId}
                  onChange={this.handleSelect}
                  options={options}
                />
                {/* <label htmlFor="requestId">Request ID</label> */}
              </div>
              <div className="input-field col s12">
                <input type="text" name="assignee" className="validate" onChange={this.handleChange} />
                <label htmlFor="assignee">Assignee Name</label>
              </div>
              <button type="submit" className="btn btn-primary">Schedule</button>
            </form>
          </div>
        </Modal>
      </div>
    )
  }
}
