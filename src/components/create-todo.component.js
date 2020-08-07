import React, { Component } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class NewProject extends Component {
  constructor(props) {
    super(props);

    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeCustomerName = this.onChangeCustomerName.bind(this);
    this.onChangeProjectSelling = this.onChangeProjectSelling.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeTmpMember = this.onChangeTmpMember.bind(this);
    this.addTeamMember = this.addTeamMember.bind(this);
    this.onChangeTmp = this.onChangeTmp.bind(this);
    this.deleteTeamMember = this.deleteTeamMember.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);

    this.state = {
      projectName: '',
      costumerName: '', 
      projectSelling: '', 
      startDate: new Date(), 
      expectedCost: [], 
      tmpMember: '', 
      tmp: [],
      t: '', 
      MemberRow: [], 
      MemberRowElement: 0, 
      projectStage: [], 
      status1: '',
      status2: '',
      status3: '',
      status4: '',
      status5: '',
      status0: '', 
      
    }
  }

  onChangeProjectName(e) {
    this.setState({
      projectName: e.target.value
    })
  }

  onChangeCustomerName(e) {
    this.setState({
      customerName: e.target.value
    })
  }

  onChangeProjectSelling(e) {
    this.setState({
      projectSelling: e.target.value
    })
  }

  onChangeStartDate(date) {
    this.setState({
      startDate: date
    })
  }

  onChangeTmpMember(e) {
    this.setState({
      tmpMember: e.target.value
    })
  }

  onChangeTmp(i, e) {
    this.setState({
      tmp: e.target.value
    })
  }

  addTeamMember = () => {
    this.setState((state, prevState) => {
      const MemberRow = state.MemberRow.concat(state.MemberRowElement);
      return {
        MemberRow: MemberRow, 
        MemberRowElement: prevState.MemberRowElement + 1
      }
    })
  }

  deleteTeamMember = (remove) => {
    this.setState(state => {
      const arr = state.MemberRow.filter(i => i < remove)
      return {
        MemberRow: arr
      }
    })
  }

  onChangeSelect = (e) => {
    this.setState({
      status0: e.target.value, 
      status1: e.target.value, 
      status2: e.target.value, 
      status3: e.target.value, 
      status4: e.target.value, 
      status5: e.target.value, 
      
    })
  }

  render() {
    return (
      <div style={{marginTop: 20}}>
        <h3>Create New Project</h3>
        <form>
          <div class="form-group row">
            <label class='col-lg-2 col-form-label'>Project Name</label>
            <div class='col-lg-6'>
              <input  
                type="customerName" 
                class="form-control" 
                value={this.state.projectName}
                onChange={this.onChangeProjectName}
              />
            </div>
          </div>

          <div class="form-group row">
            <label class='col-lg-2 col-form-label'>Customer Name</label>
            <div class='col-lg-6'>
              <input  
                type="customerName" 
                class="form-control" 
                value={this.state.customerName}
                onChange={this.onChangeCustomerName}
              />
            </div>
          </div>

          <div class="form-group row">
            <label class='col-lg-2 col-form-label'>Project Selling</label>
            <div class='col-lg-6'>
              <div class="input-group mb-2">
                <div class='input-group-prepend'>
                  <div class='input-group-text'>$</div>
                </div>
                <input 
                  type="projectSelling" 
                  class="form-control" 
                  value={this.state.projectSelling}
                  onChange={this.onChangeProjectSelling}
                />
              </div>
            </div>
          </div>

          <div class="form-group row">
            <label class='col-lg-2 col-form-label'>Start Date</label>
            <div class='col-lg-6'>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.onChangeStartDate}
                dateFormat='dd/MM/yyyy'
              />
            </div>
          </div>

          <div class="form-group row">
            <label class='col-lg-2 col-form-label'>Team Member</label>
            <div class='col-lg-6'>       
              <input 
                type="teamMember" 
                class="form-control" 
                value={this.state.tmpMember}
                onChange={this.onChangeTmpMember}
              />           
            </div>
            <button 
              type='button' 
              class='btn btn-outline-dark'
              onClick={this.addTeamMember}
            >
              Add New
            </button>
            {/* <button 
              type='button' 
              class='btn btn-outline-danger'
              onClick={this.deleteTeamMember.bind(this, id)}
            >
              Add New
            </button> */}
          </div>

          {this.state.MemberRow.map(i => (
            <div class="form-group row" key={i.toString()}>
              <label class='col-lg-2 col-form-label'>              </label>
              <div class='col-lg-6'>       
                <input 
                  type="latestEmployee" 
                  class="form-control" 
                  value={this.state.tmp}
                  onChange={this.onChangeTmp.bind(this, i)}
                />           
              </div>
            </div>
          ))}

          <div class='form-check row'>
            <label class='col-lg-2 col-form-label'>Status</label>
            <div className="form-check">
              <div className="form-check">
                <input  className="form-check-input"
                        type="radio"
                        name="priorityOptions"
                        // id="priorityLow"
                        value='SA&D'
                        checked={this.state.status0==='SA&D'}
                        onChange={this.onChangeSelect}
                        />
                <label className="form-check-label">SA&D</label>
              </div>

              <div className="form-check form-check-inline">
                <input  className="form-check-input"
                        type="radio"
                        name="priorityOptions"
                        // id="priorityMedium"
                        value="SI&I"
                        checked={this.state.status1==='SI&I'}
                        onChange={this.onChangeSelect}
                        />
                <label className="form-check-label">SI&I</label>
              </div>
              
              <div className="form-check form-check-inline">
                <input  className="form-check-input"
                        type="radio"
                        name="priorityOptions"
                        // id="priorityHigh"
                        value="UAT"
                        checked={this.state.stauts2==='UAT'}
                        onChange={this.onChangeSelect}
                        />
                <label className="form-check-label">UAT</label>
              </div>
              
              <div>
                <input  className="form-check form-check-inline"
                        type="radio"
                        name="priorityOptions"
                        // id="priorityLow"
                        value='PR'
                        checked={this.state.status3==='PR'}
                        onChange={this.onChangeSelect}
                        />
                <label className="form-check-label">Production Rolling</label>
              </div>
              
              <div className="form-check form-check-inline">
                <input  className="form-check-input"
                        type="radio"
                        name="priorityOptions"
                        // id="priorityMedium"
                        value="Nursing"
                        checked={this.state.status4==='Nursing'}
                        onChange={this.onChangeSelect}
                        />
                <label className="form-check-label">Nursing</label>
              </div>
              
              <div className="form-check form-check-inline">
                <input  className="form-check-input"
                        type="radio"
                        name="priorityOptions"
                        // id="priorityHigh"
                        value="SM&S"
                        checked={this.state.stauts5==='SM&S'}
                        onChange={this.onChangeSelect}
                        />
                <label className="form-check-label">SM&S</label>
              </div>

            </div>
          </div>

          <button type="submit" class="btn btn-outline-primary" onClick={this.updateTeamMember}>Submit</button>
        </form>
      </div>
    )
  }
}

export default NewProject;
