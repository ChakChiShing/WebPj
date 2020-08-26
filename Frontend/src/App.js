import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateTodo from "./components/create";
import HomePage from "./components/homePage";
import ProjectInfo from "./components/projectInfo";
import EditProject from "./components/edit";
import Tracker from './components/tracker';


class App extends Component  {



// //method for tracker
//   handleObjectChange = (name, value, obj, element) => {
//     const _obj = obj;
//     element[name] = value;
//     this.setState({
//       [obj]: _obj
//     }) 
//   }
  
  
  
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-inverse">
            <div className="container-fluid"> 
              <div className ="navbar-header">
                <b><h2>Project Monitoring </h2></b>
              </div>
              <ul className="nav nabar-nav navbar-right"> 
                <li className="navbar-item"><Link to="/" className="nav-link">Home</Link></li>
                <li className="navbar-item"><Link to="/create" className="nav-link">Create New Project</Link></li>
              </ul> 
            </div>
          </nav>
          <br/>
          <div>
            <Route path="/" exact component={HomePage} />
            <Route path="/create" component={CreateTodo}/>
            <Route path="/project/:id" component={ProjectInfo} />
            <Route path="/edit/:id" component={EditProject}/>
            <Route path='/tracker/:id' component={Tracker}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
