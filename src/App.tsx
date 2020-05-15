import React from "react";
import "./App.css";
import { Unsubscribe } from "redux";
import { addAge } from "./index";
import * as PropTypes from "prop-types";

const logo = require("./logo.svg");

class App extends React.Component<{}, {}> {
  public static contextTypes = {
    store: PropTypes.object,
  };
  private _unsubscribe: Unsubscribe;
  componentDidMount() {
    const store = this.context.store;
    this._unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  render() {
    const store = this.context.store;
    const state = store.getState();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {state.age}{" "}
            <button
              onClick={() => {
                store.dispatch(addAge);
              }}
            >
              한 해가 지났다.
            </button>
          </a>
        </header>
      </div>
    );
  }
}

export default App;
