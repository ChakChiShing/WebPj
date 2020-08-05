import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateTodo from "./components/create-todo.component";
import TodosList from "./components/todos-list.component";

class App extends Component  {
  render() {
    return (
      <Router>
        <div className="container">
          <div style={{flex: "1", flexDirection: 'row'}}>
            <nav style={{flexDirection: "row"}}>
          {/* <nav claseeName="navbar navbar-expand-lg navbar-light bg-light"> */}
            {/* <div className="collpase navbar-collapse"> */}
              {/* <ul className="navbar-nav mr-auto"> */}
              <div className="navbar-nav mr-auto">
                <b><h1>Project Cost Monitoring</h1></b>
                <h4 className="navbar-item">
                  <Link to="/" className="nav-link">Home</Link>
                </h4>
                <h4 className="navbar-item">
                  <Link to="/create" className="nav-link">Create New Project</Link>
                </h4>
              </div>
              {/* </ul> */}
            {/* </div> */}
          </nav>
          </div>
          <br/>
          <Route path="/" exact component={TodosList} />
          <Route path="/create" component={CreateTodo} />
        </div>
      </Router>
    );
  }
}

export default App;
