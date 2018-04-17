import React, { Component } from "react";
import DrawBoard from "./front-end/Containers/DrawBoard";
import { Provider } from "react-redux";
import store from "./front-end/store";

store.subscribe(() => {
  console.log("Store Updated", store.getState());
});
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <DrawBoard />
      </Provider>
    );
  }
}

export default App;
