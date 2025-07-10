import './App.css';

import React, { Component } from 'react'
import News from './components/News';
import Navbar from './components/Navbar';

export default class App extends Component {
  render() {
    return (
      <>
        <Navbar></Navbar>
        <div className='container'>
          <News></News>
        </div>
      </>
    )
  }
}
