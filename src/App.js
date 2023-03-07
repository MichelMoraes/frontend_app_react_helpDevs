import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CountriesList from './CountryList';
import CountriesEdit from "./CountryEdit";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/countries' exact={true} component={CountriesList}/>
            <Route path='/api/v1/coutry/:id' component={CountriesEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;