import React, { Component, createElement } from "react";
import ReactDOM from "react-dom";
import { Global } from "./dataAccessors/GlobalInfo";
import { Home } from "./view-react/Home";

class MainDiv extends Component<{}, {}> {
  render() {
    return <Home></Home>;
  }
}

console.log(location.host);
console.log(location.hostname);
Global.serverInfo.url = `wss://${location.hostname}:3000`;

const domContainer = document.querySelector("#reactDom");
// setTimeout(() => {
//     ReactDOM.render(createElement(MainDiv), domContainer);
// }, 1000);
ReactDOM.render(createElement(MainDiv), domContainer);
