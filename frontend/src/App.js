import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/layouts/Navbar'
import Landing from './components/layouts/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

import './App.css';

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Route path='/' exact component={Landing} />
      <section className="container">
        <Switch>
          <Route path='/register' exact component={Register} />
          <Route path='/login' exact component={Login} />
        </Switch>
      </section>
    </Fragment>
  </Router>
)

export default App;
