import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, Store } from "redux";
import * as PropTypes from "prop-types";

const ADD_AGE = "ADD_AGE";

export function addAge() {
  return {
    type: ADD_AGE,
  };
}

function ageApp(
  state: { age: number } = { age: 35 },
  action: { type: "ADD_AGE" }
): { age: number } {
  if (action.type === ADD_AGE) {
    return {
      age: state.age + 1,
    };
  }
  return state;
}

const store = createStore<{ age: number }>(ageApp);

class Provider extends React.Component<{ store: Store<{ age: number }> }, {}> {
  static childContextTypes = {
    store: PropTypes.object,
  };
  getChildContext() {
    return {
      store: this.props.store,
    };
  }
  render() {
    return this.props.children as JSX.Element;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
