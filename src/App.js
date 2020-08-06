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
        <nav className="navbar navbar-default">
            <div className="container-fluid"> 
              <div class ="navbar-header">
                <b><h1>Project Cost Monitoring</h1></b>
              </div>
                <ul className="nav nabar-nav"> 
                <li className="navbar-item"><Link to="/" className="nav-link">Home</Link></li>
                <li className="navbar-item"><Link to="/create" className="nav-link">Create New Project</Link></li>
              </ul> 
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={TodosList} />
          <Route path="/create" component={CreateTodo} />
        </div>
      </Router>
    );
  }
}

export default App;
