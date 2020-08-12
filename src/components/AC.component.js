import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateTodo from "./components/create-todo.component";
import TodosList from "./components/todos-list.component";
import ProjectInfo from "./components/projectInfo.component";
import EditPJInfo from "./components/editPj.component";

class App extends Component  {
  render() {
    return (
      <Router> 
        <div className="container">
        <nav className="navbar navbar-inverse">
            <div className="container-fluid"> 
              <div class ="navbar-header">
                
                <b><h5>Project Monitoring </h5></b>
              </div>
                  <ul className="nav nabar-nav navbar-right"> 
                    <li className="navbar-item"><Link to="/" className="nav-link">Home</Link></li>
                    <li className="navbar-item"><Link to="/create" className="nav-link">Create New Project</Link></li>
                  </ul> 
            </div>
          </nav>
          
          <Route path="/" exact component={TodosList} />
          <Route path="/create" component={CreateTodo} />
          <Route path="/project/:id" component={ProjectInfo} />
          <Route path="/edit/:id" component={EditPJInfo} />
        </div>
      </Router>
    );
  }
}

export default App;