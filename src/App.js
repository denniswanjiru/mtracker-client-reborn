import React, { Component } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';

import Signin from './components/Signin';
import Signup from './components/Signup';
import NotFound from './components/NotFound';
import Requests from './components/Requests';
import withNav from './HOC/withNav';
import NewRequest from './components/NewRequest';
import RequestDetail from './components/RequestDetail';
import EditRequest from './components/EditRequest';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/requests" component={withNav(Requests)} />
          <Route exact path="/requests/new" component={withNav(NewRequest, 'fullPage')} />
          <Route exact path="/requests/:id/edit" component={withNav(EditRequest, 'fullPage')} />
          <Route exact path="/requests/:id" component={withNav(RequestDetail)} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
