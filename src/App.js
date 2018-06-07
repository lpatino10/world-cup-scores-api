import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    const fetchOptions = {
      headers: {
        'X-Auth-Token': process.env.API_KEY,
      },
    };

    fetch('//api.football-data.org/v1/competitions/467', fetchOptions)
      .then(res => res.json())
      .then(body => console.log(body.caption));

    //setInterval(() => { }, 10000);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
