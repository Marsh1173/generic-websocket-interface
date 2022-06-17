import React, { Component, createElement } from "react";
import ReactDOM from "react-dom";

export class Home extends Component<{}, {}> {
  render() {
    return <div>Hello</div>;
  }
}

const domContainer = document.querySelector("#reactDom");
ReactDOM.render(createElement(Home), domContainer);
