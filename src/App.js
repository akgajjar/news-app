import './App.css';

import React, { useState } from 'react'
import News from './components/News';
import Navbar from './components/Navbar';
import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  const [progress, setProgress] = useState(0);

  return (
    <>
      <Router>
        <Navbar></Navbar>
        <LoadingBar
          color="#f11946"
          height={3}
          progress={progress}
        />
        <div className='container'>
          <Switch>
            <Route exact path="/"><News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={5} country="us" category="science" /></Route>
            <Route exact path="/business"><News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={5} country="us" category="business" /></Route>
            <Route exact path="/entertainment"><News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={5} country="us" category="entertainment" /></Route>
            <Route exact path="/general"><News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={5} country="us" category="general" /></Route>
            <Route exact path="/health"><News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={5} country="us" category="health" /></Route>
            <Route exact path="/science"><News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={5} country="us" category="science" /></Route>
            <Route exact path="/sports"><News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={5} country="us" category="sports" /></Route>
            <Route exact path="/technology"><News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={5} country="us" category="technology" /></Route>

          </Switch>
        </div>
      </Router>
    </>
  )
}

export default App;
