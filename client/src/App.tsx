import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import Loadable from 'react-loadable';
import './App.css';

const Loading = () => (
  <div>Loading...</div>
);

class App extends Component {
  render() {
    return (
      <div>
      <Route exact path="/" component={Loadable({
        loader: () => import('./home/Home'),
        loading: Loading
      })} />
      <Route path="/guitar" component={Loadable({
        loader: () => import('./guitar/Guitar'),
        loading: Loading
      })} />
    </div>
    );
  }
}

export default App;
