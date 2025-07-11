import './App.css';

import React, { Component } from 'react'
import News from './components/News';
import Navbar from './components/Navbar';
import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API_KEY;

  state={
    progress: 0
  }

  setProgress = (progress)=>{
    this.setState({progress: progress})
  }

  render() {
    console.log("API Key:", this.apiKey); // Verify it's loading
    return (
      <>
        <Router>
          <Navbar></Navbar>
          <LoadingBar
            color="#f11946"
            height={3}
            progress={this.state.progress}
          />
          <div className='container'>
            <Switch>
              <Route exact  path="/"><News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={5} country="us" category="science" /></Route>
              <Route exact  path="/business"><News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={5} country="us" category="business" /></Route>
              <Route exact  path="/entertainment"><News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={5} country="us" category="entertainment" /></Route>
              <Route exact  path="/general"><News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={5} country="us" category="general" /></Route>
              <Route exact  path="/health"><News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={5} country="us" category="health" /></Route>
              <Route exact  path="/science"><News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={5} country="us" category="science" /></Route>
              <Route exact  path="/sports"><News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={5} country="us" category="sports" /></Route>
              <Route exact  path="/technology"><News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={5} country="us" category="technology" /></Route>

            </Switch>
          </div>
        </Router>
      </>
    )
  }
}
