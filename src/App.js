import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateTodo from "./components/create-todo.component";
import TodosList from "./components/todos-list.component";
import ProjectInfo from "./components/projectInfo.component";
import EditPJInfo from "./components/editPj.component";
import Tracker from './components/tracker';

class App extends Component  {
  constructor(props){
    super(props);
    this.state={
      //period
      checkbox: [
        {period: 'SA&D', option: false}, 
        {period: 'SI&I', option: false}, 
        {period: 'UAT', option: false},
        {period: 'Prod. Rol.', option: false}, 
        {period: 'Nursing', option: false}, 
        {period: 'SM&S', option: false},
      ],
      //Team Member
      rowsTM: [{
        lastName: '',
        firstName: '', 
        position: 'Position', 
        checkboxTeamMember: [
          {period: 'SA&D', option: false, daysSpent: '', remarks: ''}, //daysSpent and remarks are for tracker
          {period: 'SI&I', option: false, daysSpent: '', remarks: ''}, 
          {period: 'UAT', option: false, daysSpent: '', remarks: ''}, 
          {period: 'Prod. Rol.', option: false, daysSpent: '', remarks: ''}, 
          {period: 'Nursing', option: false, daysSpent: '', remarks: ''}, 
          {period: 'SM&S', option: false, daysSpent: '', remarks: ''}, 
        ], 
        cost: 0, 
      }],
      //Other Cost
      rowsOC: [{
        equipment: '',
        quantity: '', 
        cost: 0,
      }],
      totalCost: '', 
    }
  }

//methods for createNewProject
  AddRowTeamMember = () => {
    const item = {
      lastName: '',
      firstName: '', 
      position: 'Position', 
      checkboxTeamMember: [
        {period: 'SA&D', option: false, daysSpent: '', remarks: ''}, 
        {period: 'SI&I', option: false, daysSpent: '', remarks: ''}, 
        {period: 'UAT', option: false, daysSpent: '', remarks: ''}, 
        {period: 'Prod. Rol.', option: false, daysSpent: '', remarks: ''}, 
        {period: 'Nursing', option: false, daysSpent: '', remarks: ''}, 
        {period: 'SM&S', option: false, daysSpent: '', remarks: ''}, 
      ], 
      cost: 0, 
    };
    this.setState({
      rowsTM: [...this.state.rowsTM, item]
    });
  };
  AddRowOtherCost = () => {
    const obj = {
      equipment: "",
      quantity: '', 
      cost: 0,
    };
    this.setState({
      rowsOC: [...this.state.rowsOC, obj]
    });
  };
  RemoveRow = (name, obj) => {
    this.setState({
      [name]: obj.slice(0, -1), 
      totalCost: ''
    });
  };
  CalculateTotalCost = () => {
    const totalTM = this.state.rowsTM.reduce((accumulator, currentValue) => 
      accumulator + parseInt(currentValue.cost) || 0
    , 0)
    const totalOC = this.state.rowsOC.reduce((accumulator, currentValue) => 
      accumulator + parseInt(currentValue.cost) || 0
    , 0)
    this.setState({
      totalCost: (totalTM + totalOC).toString()
    })
  }
//method for tracker
  handleObjectChange = (name, value, obj, element) => {
    const _obj = obj;
    element[name] = value;
    this.setState({
      [obj]: _obj
    }) 
  }
  
  
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
                    <li className='navbar-item'>
                      <Link to='/workHoursTracker' className='nav-link'>Tracker</Link>
                    </li>
                  </ul> 
            </div>
          </nav>
          
          <Route path="/" exact component={TodosList} />
          <Route path="/create">
            <CreateTodo checkbox={this.state.checkbox}
                        rowsTM={this.state.rowsTM} 
                        rowsOC={this.state.rowsOC} 
                        AddRowTeamMember={this.AddRowTeamMember} 
                        AddRowOtherCost={this.AddRowOtherCost} 
                        RemoveRow={this.RemoveRow} 
                        CalculateTotalCost={this.CalculateTotalCost}
                        totalCost={this.state.totalCost}
            />
          </Route>
          <Route path="/project/:id" component={ProjectInfo} />
          <Route path="/edit/:id" component={EditPJInfo} />
          <Route path='/tracker'>
            <Tracker checkbox={this.state.checkbox}
                     rowsTM={this.state.rowsTM}
                     handleObjectChange={this.handleObjectChange}
            />
          </Route>
        </div>
      </Router>
    );
  }
}

export default App;
