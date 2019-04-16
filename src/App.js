import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Trader from "./components/Trader";
import Broker from "./components/Broker";
import Login from "./components/Login";
import TradeList from "./components/TradeList";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Router>
              <div>
              <nav className="navbar navbar-inverse navbar-fixed-top">
                  <div className="container">
                      <div className="navbar-header">
                          <a className="navbar-brand"><Link to="/">Market Data Platform</Link></a>
                      </div>
                      <div id="navbar" className="collapse navbar-collapse">
                          <ul className="nav navbar-nav">
                              <li><Link to="/">Traders</Link></li>
                              <li><Link to="/broker">Brokers</Link></li>
                              <li><Link to="/trade-list">Trade List</Link></li>
                          </ul>
                          {localStorage.getItem('token') &&
                              <div className="logout pull-right"><a href="/login" onClick={()=> {
                                  localStorage.removeItem('token');
                                  window.location = window.location.origin + '/login';
                              }}>Logout</a></div>
                          }


                      </div>
                  </div>
              </nav>

              <div className="container main-container">
                  <Route path="/login" exact component={Login} />
                  <Route exact path="/" component={Trader}/>
                  <Route path="/broker" component={Broker}/>
                  <Route path="/trade-list" component={TradeList}/>
              </div>
              </div>
          </Router>
      </div>
    );
  }
}

export default App;
