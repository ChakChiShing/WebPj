import React, { Component } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Dropdown, SplitButton } from 'react-bootstrap'

class NewProject extends Component {
  constructor(props){
    super(props);
    this.state = {
      projectName: '',
      costumerName: '', 
      projectSelling: '', 
      startDate: new Date(), 
      rowsTM: [],
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      option5: '',
      option6: '', 
      rowsEC: [],
    }
    this.onChangeProjectName = this.onChangeProjectName.bind(this)
  }
  
  onChangeProjectName = (e) => {
    this.setState({
      projectName: e.target.value
    })
  }
  onChangeCustomerName = (e) => {
    this.setState({
      customerName: e.target.value
    })
  }
  onChangeProjectSelling = (e) => {
    this.setState({
      projectSelling: e.target.value
    })
  }
  onChangeStartDate = (date) => {
    this.setState({
      startDate: date
    })
  }
  handleChangeTM = (value, idx, name) => {
    const rowsTM = [...this.state.rowsTM];
    rowsTM[idx][name] = value;
    this.setState({
      rowsTM: rowsTM
    });
  };
  handleAddRowTM = () => {
    const item = {
      name: "",
    };
    this.setState({
      rowsTM: [...this.state.rowsTM, item]
    });
  };
  handleRemoveRowTM = () => {
    this.setState({
      rowsTM: this.state.rowsTM.slice(0, -1)
    });
  };
  handleChangeEC = (text, idx, name) => {
    const rowsEC = [...this.state.rowsEC];
    rowsEC[idx][name] = text;
    if(this.state.rowsEC[idx].dropDownValue=='PM')
      this.state.rowsEC[idx].cost = '2500';
    else if(this.state.rowsEC[idx].dropDownValue=='SA')
      this.state.rowsEC[idx].cost = '2000';
    else if(this.state.rowsEC[idx].dropDownValue=='AP')
      this.state.rowsEC[idx].cost = '1500';
    else if(this.state.rowsEC[idx].dropDownValue=='P')
      this.state.rowsEC[idx].cost = '1000';
    this.setState({rowsEC: rowsEC});
  }
  handleAddRowEC = () => {
    const item = {
      equipment: "",
      quantity: '', 
      cost: '',
      dropDownValue: 'Position', 
    };
    this.setState({
      rowsEC: [...this.state.rowsEC, item]
    });
  };
  handleRemoveRowEC = () => {
    this.setState({
      rowsEC: this.state.rowsEC.slice(0, -1)
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    alert('submitted');
    console.log(this.state.projectName);
  }
  



  render() {
    return (
      <div style={{marginTop: 20}}>
        <h3>Create New Project</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group row">
            <label className='col-lg-2 col-form-label'>Project Name</label>
            <div className='col-lg-6'>
              <input  
                type="text" 
                className="form-control" 
                value={this.state.projectName}
                onChange={this.onChangeProjectName}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className='col-lg-2 col-form-label'>Customer Name</label>
            <div className='col-lg-6'>
              <input  
                type="text" 
                className="form-control" 
                value={this.state.customerName}
                onChange={this.onChangeCustomerName}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className='col-lg-2 col-form-label'>Project Selling</label>
            <div className='col-lg-6'>
              <div className="input-group">
                <div className='input-group-prepend'>
                  <div className='input-group-text'>$</div>
                </div>
                <input 
                  type="number" 
                  className="form-control" 
                  value={this.state.projectSelling}
                  onChange={this.onChangeProjectSelling}
                />
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label className='col-lg-2 col-form-label'>Start Date</label>
            <div className='col-lg-6'>
              <DatePicker
                className='form-control'
                selected={this.state.startDate}
                onChange={this.onChangeStartDate}
                dateFormat='dd/MM/yyyy'
              />
            </div>
          </div>                
          <div className="form-group row">
            <label className='col-lg-2 col-form-label'>Team Member</label>
            <div className="col-lg-7 column">
              <table
                className="table-borderless table-hover"
                id="tab_logic"
                style={{width: '100%'}}
              >
                <tbody>
                  {this.state.rowsTM.map((item, idx) => (
                    <tr id="addr0" key={idx}>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={this.state.rowsTM[idx].name}
                          onChange={(e) => this.handleChangeTM(e.target.value, idx, e.target.name)}
                          className="form-control"
                          placeholder='Member Name'
                        />
                      </td>
                      <td
                        style={{width: '40%'}}
                      >
                        <div style={{marginLeft: 7, paddingRight: 0, marginRight: 0}}>
                          <div>
                            <div className="form-check form-check-inline">
                              <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="inlineCheckbox1" 
                                value="option1"
                              />
                              <label 
                                className="form-check-label" 
                                for="inlineCheckbox1"
                                style={{fontSize: 13}}
                              >
                                SA&D
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="inlineCheckbox2" 
                                value="option2"
                              />
                              <label 
                                className="form-check-label" 
                                for="inlineCheckbox2"
                                style={{fontSize: 13}}
                              >
                                SI&I
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="inlineCheckbox3" 
                                value="option3"
                              />
                              <label 
                                className="form-check-label" 
                                for="inlineCheckbox3"
                                style={{fontSize: 13}}
                              >
                                UAT
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="inlineCheckbox4" 
                                value="option4"
                              />
                              <label 
                                className="form-check-label" 
                                for="inlineCheckbox4"
                                style={{fontSize: 13}}
                              >
                                SM&S
                              </label>
                            </div>
                          </div>
                          <div>
                            <div className="form-check form-check-inline">
                              <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="inlineCheckbox5" 
                                value="option5"
                              />
                              <label 
                                className="form-check-label" 
                                for="inlineCheckbox5"
                                style={{fontSize: 13}}
                              >
                                Production Rolling
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="inlineCheckbox6" 
                                value="option6"
                              />
                              <label 
                                className="form-check-label" 
                                for="inlineCheckbox6"
                                style={{fontSize: 13}}
                              >
                                Nursing
                              </label>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <button
                onClick={this.handleAddRowTM}
                className="btn btn-outline-secondary"
                style={{marginRight: 10}}
                type='button'
              >
                Add Member
              </button>
              <button
                onClick={this.handleRemoveRowTM}
                className="btn btn-outline-danger"
                type='button'
              >
                Delete
              </button>
            </div>
          </div>

          <div className="form-group row">
            <label className='col-lg-2 col-form-label'>Expected Cost</label>
            <div className="col-lg-7 column">
              <table
                className="table-borderless table-hover"
                id="tab_logic"
                style={{width: '100%'}}
              >
                <tbody>
                  {this.state.rowsEC.map((item, idx) => (
                    <tr id="addr0" key={idx} style={{height: 47}}>
                      <td style={{width: '18%'}}>
                        <SplitButton            
                          id="dropdown-basic-button" 
                          title={this.state.rowsEC[idx].dropDownValue}
                          type='button'
                        >
                          <Dropdown.Item as='button' type='button'><div onClick={(e) => this.handleChangeEC(e.target.textContent, idx, 'dropDownValue')}>PM</div></Dropdown.Item>
                          <Dropdown.Item as='button' type='button'><div onClick={(e) => this.handleChangeEC(e.target.textContent, idx, 'dropDownValue')}>SA</div></Dropdown.Item>
                          <Dropdown.Item as='button' type='button'><div onClick={(e) => this.handleChangeEC(e.target.textContent, idx, 'dropDownValue')}>AP</div></Dropdown.Item>
                          <Dropdown.Item as='button' type='button'><div onClick={(e) => this.handleChangeEC(e.target.textContent, idx, 'dropDownValue')}>P</div></Dropdown.Item>
                        </SplitButton>
                      </td>
                      <td style={{ width: '5%'}}>
                        <div style={{fontsize: 16}}>
                          OR
                        </div>
                      </td>
                      <td style={{width: '25%'}}>
                        <input
                          type="text"
                          name="equipment"
                          value={this.state.rowsEC[idx].equipment}
                          onChange={(e) => this.handleChangeEC(e.target.value, idx, e.target.name)}
                          className="form-control"
                          placeholder='Equipment'
                          disabled={this.state.rowsEC[idx].dropDownValue!='Position'}
                        />
                      </td>
                      <td style={{width: '20%'}}>
                        <input
                          type="number"
                          name="quantity"
                          value={this.state.rowsEC[idx].quantity}
                          onChange={(e) => this.handleChangeEC(e.target.value, idx, e.target.name)}
                          className="form-control"
                          placeholder='Quantity'
                        />
                      </td>
                      <td style={{width: '25%'}}>
                        <div class="input-group">
                          <div class='input-group-prepend'>
                            <div class='input-group-text'>$</div>
                          </div>
                          <input
                            type="number"
                            name="cost"
                            value={this.state.rowsEC[idx].cost}
                            onChange={(e) => this.handleChangeEC(e.target.value, idx, e.target.name)}
                            className="form-control"
                            placeholder='Cost'
                            disabled={this.state.rowsEC[idx].dropDownValue!='Position'}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <button
                onClick={this.handleAddRowEC}
                className="btn btn-outline-secondary"
                style={{marginRight: 10}}
                type='button'
              >
                Add Item
              </button>
              <button
                onClick={this.handleRemoveRowEC}
                className="btn btn-outline-danger"
                type='button'
              >
                Delete
              </button>
            </div>
          </div>


          <input 
            type="submit" 
            className="btn btn-outline-primary btn-block"
            value='Submit'
          >
          </input>
        </form>
      </div>
    )
  }
}

export default NewProject;
