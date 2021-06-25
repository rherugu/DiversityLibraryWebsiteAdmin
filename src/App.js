import React from "react";
import "./components/styles/App.css";
import LoginScreen from "./components/Login.js";
import BookScreen from "./components/Books.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={LoginScreen} />
          <Route path="/books" component={BookScreen} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
