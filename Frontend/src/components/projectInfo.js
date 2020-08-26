import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

import { TextField,  Box, Button, Grid} from '@material-ui/core';
// import PjPeriod from './period';
// import Staff from './staff';
import Ecchart from './EC.component';
import Acchart from './AC.component';

const Details = (props) => {
  return (
    <td style={{width: 130}}>
      <h6>{props.title}</h6>
      <p className='underline'>{props.value}</p>
    </td>
  )
}
const Seperate = () => {
  return(
    <td style={{width: 80}}/> 
  )
}


class ProjectInfo extends Component {
  constructor(props) {
    super(props)
    this.state={
      name: '',  
      selling: '', 
      customer: {
        lastName: '', 
        firstName: '', 
        organization: '',
      }, 
      totalCost: '', 
      //period
      checkbox: [
        {period: 'SA&D', option: false, startDD: '', startMM: '', startYYYY: '', endDD: '', endMM: '', endYYYY: ''}, 
        {period: 'SI&I', option: false, startDD: '', startMM: '', startYYYY: '', endDD: '', endMM: '', endYYYY: ''}, 
        {period: 'UAT', option: false, startDD: '', startMM: '', startYYYY: '', endDD: '', endMM: '', endYYYY: ''},
        {period: 'Prod. Rol.', option: false, startDD: '', startMM: '', startYYYY: '', endDD: '', endMM: '', endYYYY: ''}, 
        {period: 'Nursing', option: false, startDD: '', startMM: '', startYYYY: '', endDD: '', endMM: '', endYYYY: ''}, 
        {period: 'SM&S', option: false, startDD: '', startMM: '', startYYYY: '', endDD: '', endMM: '', endYYYY: ''},
      ],
      //Team Member
      rowsTM: [{
        lastName: '',
        firstName: '', 
        position: '', 
        cost: '', 
        checkboxTeamMember: [
          {period: 'SA&D', option: false, daysSpent: '', remarks: ''}, //daysSpent and remarks are for tracker
          {period: 'SI&I', option: false, daysSpent: '', remarks: ''}, 
          {period: 'UAT', option: false, daysSpent: '', remarks: ''}, 
          {period: 'Prod. Rol.', option: false, daysSpent: '', remarks: ''}, 
          {period: 'Nursing', option: false, daysSpent: '', remarks: ''}, 
          {period: 'SM&S', option: false, daysSpent: '', remarks: ''}, 
        ], 
      }],
      //Other Cost
      rowsOC: [{
        equipment: '',
        quantity: '', 
        cost: '',
      }],
      show: false, 
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:4000/project/'+this.props.match.params.id)
        .then(res => {
          this.setState({
            name: res.data.name, 
            selling: res.data.selling, 
            customer: res.data.customer, 
            totalCost: res.data.totalCost, 
            checkbox: res.data.checkbox, 
            rowsTM: res.data.rowsTM, 
            rowsOC: res.data.rowsOC, 
          })
        })
        .catch(err => {
          console.log(err)
        })
  }

  GoToEdit = () => {
    this.props.history.push('/edit/'+this.props.match.params.id);
  }
  GoToTracker = () => {
    this.props.history.push('/tracker/'+this.props.match.params.id);
  }
  DeleteProject = () => {
    this.setState({show: false})
    axios.delete('http://localhost:4000/project/'+this.props.match.params.id)
        .then(res => {
          console.log('Project deleted')
        })
        .catch(err => {
          console.log(err)
        })
    
    this.props.history.push('/');
  }
  HandleShow = (value) => {
    this.setState({
      show: value
    })
  }

  render() {
    return (
      <div className="container">
        <table>
          <tbody>
            <tr>
              <Details title='Project Name' value={this.state.name} />
              <Seperate/>
              <Details title='Customer Name' value={this.state.customer.organization !== ''
                                                    ? this.state.customer.organization 
                                                    : (this.state.customer.lastName + ' ' + this.state.customer.firstName)} 
              />
              <Seperate/>
              <Details title='Project Selling' value={this.state.selling} />
              <Seperate/>
              <Details title='Expected Cost' value={this.state.totalCost} />
              <Seperate/>
              <td>
                <button type='button' className='btn btn-secondary' onClick={this.GoToEdit}>Edit</button>
                <button type='button' className='btn btn-secondary' onClick={this.GoToTracker} style={{marginLeft: 10}}>Tracker</button>
                <>
                  <button type='button' className='btn btn-secondary' onClick={e => this.HandleShow(true)} style={{marginLeft: 10}}>Delete</button>
                  <Modal show={this.state.show} onHide={e => this.HandleShow(false)} animation={false}>
                    <Modal.Body>Confirm to delete?</Modal.Body>
                    <Modal.Footer>
                      <button type='button' className='btn btn-secondary' onClick={e => this.HandleShow(false)}>
                        Close
                      </button>
                      <button type='button' className='btn btn-primary' onClick={this.DeleteProject}>
                        Confirm
                      </button>
                    </Modal.Footer>
                  </Modal>
                </>
              </td>
            </tr>
          </tbody>
        </table>


        <br/><br/>
        <div className="container-fluid">
          <Box display="flex" flexDirection="row" flexWrap="wrap" justify="space-evenly">
            <Box flexGrow={1}>
              <Acchart  />
            </Box>
            <Box flexGrow={1}>
              <Ecchart />
            </Box>
          </Box>
        </div>
        <br/><br/><br/>
        {/* <PjPeriod/> */}
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Project Period</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actual Cost</th>
            </tr>
          </thead>
          <tbody>
            {this.state.checkbox.map((item, i) => {
              return(
                item.option
                ? (
                  <tr key={i}>
                    <td>{item.period}</td>
                    <td>{item.startDD + '/' + item.startMM + '/' + item.startYYYY}</td>
                    <td>{item.endDD + '/' + item.endMM + '/' + item.endYYYY}</td>
                    <td/>
                  </tr>
                )
                : null
              )
            })}
          </tbody>
        </table>
        <br/><br/><br/>
        {/* <Staff/> */}
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Team Member</th>
              <th>Position</th>
              <th>Actual Cost</th>
              <th>Period involved</th>
            </tr>
          </thead>
          <tbody>
            {this.state.rowsTM.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.lastName + ' ' + item.firstName}</td>
                  <td>{item.position}</td>
                  <td></td>
                  <td>
                    {item.checkboxTeamMember.map((elem, idx) => {
                      return(
                        <div className='form-check form-check-inline' key={`${i}${idx}`}>
                          <input className='form-check-input' type='checkbox'
                            name='option'
                            checked={elem.option}
                            readOnly
                          />
                          <label className='form-check-label' style={{fontSize: 13}}>{elem.period}</label>
                        </div>
                      )
                    })}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>             
    );
  }
}


export default withRouter(ProjectInfo);




{/* <Grid container spacing={3} justify="flex-end" alignItems="flex-end">
          <Grid item xs={4}>
            <TextField
              id="standard-read-only-input"
              label="Project Name:"
              defaultValue={this.props.ProjectName}
              InputProps={{readOnly: true,}}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
                id="standard-read-only-input"
                label="Customer Name:"
                defaultValue={this.props.CustomerName}
                InputProps={{readOnly: true,}}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              id="standard-read-only-input"
              label="Project Status:"
              defaultValue={this.props.PJStatus}
              size="Normal"
              InputProps={{readOnly: true,}}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              id="standard-read-only-input"
              label="Real Time Spent:"
              defaultValue={this.props.TimeSpent}
              InputProps={{readOnly: true,}}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              id="standard-read-only-input"
              label="Income$"
              defaultValue={this.props.Income}
              InputProps={{readOnly: true,}}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              id="standard-read-only-input"
              label="Gp:"
              defaultValue={this.props.Gp}
              InputProps={{readOnly: true,}}
            />
          </Grid>
      
          <Grid  justify="flex-end" alignItems="flex-end">
            <Button variant="contained" color="primary" href="/edit/:id" >Edit</Button>
          </Grid>

        </Grid> */}