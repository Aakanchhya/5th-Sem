import React, { Component } from 'react';
import {Provider}from 'react-redux';
import store from './front-end/store';
// eslint-disable-next-line
import DrawBoard from './front-end/containers/DrawBoard'
// import DrawableGraph from './front-end/containers/drawable-graph-containers/draw-board';
import DrawableGraph from './front-end/Pages/DrawableGraph';
class App extends Component {

  render( ) {
   return (
      <Provider store={store}>
        <DrawableGraph />
      </Provider>
    );
  }
  
}

export default App;
