import React, { Component } from 'react';
import {Provider}from 'react-redux';
import store from './front-end/store';
import DrawBoard from './front-end/containers/DrawBoard'
class App extends Component {

  render( ) {
   return (
      <Provider store={store}>
        <div className=" p-5 ">
        <DrawBoard />
        </div>
      </Provider>
    );
  }
  
}

export default App;
