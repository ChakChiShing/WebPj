import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownButton } from 'react-bootstrap'

class NewProject extends Component {
  constructor(props){
    super(props);
    this.state = {
      projectName: '',
      costumerLastName: '',
      costumerFirstName: '',  
      projectSelling: '', 
      dateDD: '', 
      dateMM: '', 
      dateYYYY: '', 
      rowsTM: [],
      rowsEC: [],
      totalCost: '',
      // error: {}, 
    }
  }
  // validation = (name) => {
  //   let error = this.state.error;

  //   if(this.state.projectName === ''){
  //     error[name] = 'Form cannot be epmty';
  //   }

  //   this.setState({error: error});
  //   console.log(error)
  // }
//handle input change
  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }
//handle Team member change
  handleChangeTM = (value, item, name) => {
    const rowsTM = [...this.state.rowsTM];
    item[name] = value;
    this.setState({
      rowsTM: rowsTM
    });
  };
  handleAddRowTM = () => {
    const item = {
      lastName: "",
      firstName: '', 
      workingHour: '', 
      option1: false, 
      option2: false, 
      option3: false, 
      option4: false, 
      option5: false, 
      option6: false, 
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
//handle expected cost change
  componentDidUpdate(prevProps, prevState) {
    if (prevState.rowsEC !== this.state.rowsEC){
      this.totalCost();
    }
    // if (prevState.projectName !== this.state.projectName){
    //   this.validation('projectName');
    // }
  }
  totalCost = () => {
    let total = 0;
    this.state.rowsEC.map(item => {
      if(!isNaN(parseInt(item.cost))){
        total += parseInt(item.cost);
      }
    })
    if(total === 0) total = '';
    this.setState({totalCost: total})
  }
  handleChangeEC = (value, item, name) => {
    const rowsEC = [...this.state.rowsEC];
    item[name] = value;
    if(name === 'position') {
      item.equipment = '';
      item.cost = '';
    }
    if(item.position === 'PM' && !isNaN(parseInt(item['quantity']))){
      item['cost'] = (parseInt(item['quantity'])*2500).toString();
    } else if(item.position === 'SA' && !isNaN(parseInt(item['quantity']))){
      item['cost'] = (parseInt(item['quantity'])*2000).toString();
    } else if(item.position === 'AP' && !isNaN(parseInt(item['quantity']))){
      item['cost'] = (parseInt(item['quantity'])*1500).toString();
    } else if(item.position === 'P' && !isNaN(parseInt(item['quantity']))){
      item['cost'] = (parseInt(item['quantity'])*1000).toString();
    }
    this.setState({
      rowsEC: rowsEC
    });
  }
  handleAddRowEC = () => {
    const obj = {
      equipment: "",
      quantity: '', 
      cost: '',
      position: 'Position', 
    };
    this.setState({
      rowsEC: [...this.state.rowsEC, obj]
    });
  };
  handleRemoveRowEC = () => {
    this.setState({rowsEC: this.state.rowsEC.slice(0, -1)});
  };
//handle submit
  onSubmit = (e) => {
    e.preventDefault();
    alert('submitted');
  }


  render() {
    // console.log(this.state.totalCost)
    return (
      <div style={{marginTop: 20}}>
        <h3>Create New Project</h3>
        <form onSubmit={this.onSubmit}>
{/* project name */}
          <div className="form-group row">
            <label className='col-lg-2 col-form-label'>Project Name</label>
            <div className='col-lg-7'>
              <input  
                type="text" 
                className="form-control" 
                value={this.state.projectName}
                name='projectName'
                onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                placeholder='Project Name'
              />
              {/* <span style={{color: 'red'}}>{this.state.error['projectName']}</span> */}
            </div>
          </div>
{/* customer name */}
          <div className="form-group row">
            <label className='col-lg-2 col-form-label'>Customer Name</label>
            <div className='col-lg-7'>
              <div className='input-group'>
                <input  
                  type="text" 
                  className="form-control" 
                  value={this.state.customerLastName}
                  name='customerLastName'
                  onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                  placeholder='Last Name'
                />
                <input  
                  type="text" 
                  className="form-control" 
                  value={this.state.customerFirstName}
                  name='customerFirstName'
                  onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                  placeholder='First Name'
                />
              </div>
            </div>
          </div>
{/* project selling */}
          <div className="form-group row">
            <label className='col-lg-2 col-form-label'>Project Selling</label>
            <div className='col-lg-7'>
              <div className="input-group">
                <div className='input-group-prepend'>
                  <div className='input-group-text'>$</div>
                </div>
                <input 
                  type="number" 
                  className="form-control" 
                  value={this.state.projectSelling}
                  name='projectSelling'
                  onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                  placeholder='Amount'
                />
              </div>
            </div>
          </div>
{/* start date */}
          <div className="form-group row">
            <label className='col-lg-2 col-form-label'>Start Date</label>
            <div className='col-lg-6'>
              <table className='table-borderless'>
                <tbody>
                  <tr>
                    <td>
                      <input  
                        type="number" 
                        className="form-control" 
                        value={this.state.dateDD}
                        name='dateDD'
                        onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                        placeholder='DD'
                        max='31'
                        min='1'
                      />
                    </td>
                    <td>
                      <input  
                        type="number" 
                        className="form-control" 
                        value={this.state.dateMM}
                        name='dateMM'
                        onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                        placeholder='MM'
                        max='12'
                        min='1'
                      />
                    </td>
                    <td>
                      <input  
                        type="number" 
                        className="form-control" 
                        value={this.state.dateYYYY}
                        name='dateYYYY'
                        onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                        placeholder='YYYY'
                        min='2000'
                        max='3000'
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>                
{/* Team Member */}
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
                      <td style={{width: '45%'}}>
                        <div className="input-group">
                          <input
                            type="text"
                            name="lastName"
                            value={item.lastName}
                            onChange={(e) => this.handleChangeTM(e.target.value, item, e.target.name)}
                            className="form-control"
                            placeholder='Last Name'
                          />
                          <input
                            type="text"
                            name="firstName"
                            value={item.firstName}
                            onChange={(e) => this.handleChangeTM(e.target.value, item, e.target.name)}
                            className="form-control"
                            placeholder='First Name'
                          />
                        </div>
                      </td>
                      <td style={{width: '15%'}}>
                        <input
                          type="number"
                          name="workingHour"
                          value={item.workingHour}
                          onChange={(e) => this.handleChangeTM(e.target.value, item, e.target.name)}
                          className="form-control"
                          placeholder='Hour'
                          min='1'
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
                                id={idx + '1'}
                                name="option1"
                                checked={item.option1}
                                onChange={(e) => this.handleChangeTM(e.target.checked, item, e.target.name)}
                              />
                              <label 
                                className="form-check-label" 
                                htmlFor={idx + '1'}
                                style={{fontSize: 13}}
                              >
                                SA&D
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id={idx + '2'}
                                name="option2"
                                checked={item.option2}
                                onChange={(e) => this.handleChangeTM(e.target.checked, item, e.target.name)}
                              />
                              <label 
                                className="form-check-label" 
                                htmlFor={idx + '2'}
                                style={{fontSize: 13}}
                              >
                                SI&I
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id={idx + '3'}
                                name="option3"
                                checked={item.option3}
                                onChange={(e) => this.handleChangeTM(e.target.checked, item, e.target.name)}
                              />
                              <label 
                                className="form-check-label" 
                                htmlFor={idx + '3'}
                                style={{fontSize: 13}}
                              >
                                UAT
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id={idx + '4'}
                                name="option4"
                                checked={item.option4}
                                onChange={(e) => this.handleChangeTM(e.target.checked, item, e.target.name)}
                              />
                              <label 
                                className="form-check-label" 
                                htmlFor={idx + '4'}
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
                                id={idx + '5'}
                                name="option5"
                                checked={item.option5}
                                onChange={(e) => this.handleChangeTM(e.target.checked, item, e.target.name)}
                              />
                              <label 
                                className="form-check-label" 
                                htmlFor={idx + '5'}
                                style={{fontSize: 13}}
                              >
                                Production Rolling
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id={idx + '6'}
                                name="option6"
                                checked={item.option6}
                                onChange={(e) => this.handleChangeTM(e.target.checked, item, e.target.name)}
                              />
                              <label 
                                className="form-check-label" 
                                htmlFor={idx + '6'}
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
{/* Expected Cost */}
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
                      <td>
                        <DropdownButton            
                          id="dropdown-basic-button" 
                          title={item.position}
                          type='button'
                          disabled={item.equipment!==''}
                        >
                          <Dropdown.Item as='button' type='button'><div onClick={(e) => this.handleChangeEC(e.target.textContent, item, 'position')}>Position</div></Dropdown.Item>
                          <Dropdown.Item as='button' type='button'><div onClick={(e) => this.handleChangeEC(e.target.textContent, item, 'position')}>PM</div></Dropdown.Item>
                          <Dropdown.Item as='button' type='button'><div onClick={(e) => this.handleChangeEC(e.target.textContent, item, 'position')}>SA</div></Dropdown.Item>
                          <Dropdown.Item as='button' type='button'><div onClick={(e) => this.handleChangeEC(e.target.textContent, item, 'position')}>AP</div></Dropdown.Item>
                          <Dropdown.Item as='button' type='button'><div onClick={(e) => this.handleChangeEC(e.target.textContent, item, 'position')}>P</div></Dropdown.Item>
                        </DropdownButton>
                      </td>
                      <td style={{ width: '5%'}}>
                        <div style={{fontsize: 16}}>
                          OR
                        </div>
                      </td>
                      <td style={{width: '34%'}}>
                        <input
                          type="text"
                          name="equipment"
                          value={item.equipment}
                          onChange={(e) => this.handleChangeEC(e.target.value, item, e.target.name)}
                          className="form-control"
                          placeholder='Equipment'
                          disabled={item.position!=='Position'}
                        />
                      </td>
                      <td style={{width: '20%'}}>
                        <input
                          type="number"
                          // name={this.onChangeQuantityName(item)}
                          // value={this.onChangeQuantityValue(item)}
                          name='quantity'
                          value={item.quantity}
                          onChange={(e) => this.handleChangeEC(e.target.value, item, e.target.name)}
                          className="form-control"
                          placeholder='Quantity'
                          min='1'
                        />
                      </td>
                      <td style={{width: '25%'}}>
                        <div className="input-group">
                          <div className='input-group-prepend'>
                            <div className='input-group-text'>$</div>
                          </div>
                          <input
                            type="number"
                            name="cost"
                            value={item.cost}
                            onChange={(e) => this.handleChangeEC(e.target.value, item, e.target.name)}
                            className="form-control"
                            placeholder='Cost'
                            disabled={item.position!=='Position'}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  {(Array.isArray(this.state.rowsEC) && this.state.rowsEC.length)?
                    (
                      <tr style={{height: 47}}>
                        <td/>
                        <td/>
                        <td/>
                        <td>
                          <input
                            type="text"
                            value='Total Cost :  '
                            className="form-control-plaintext"
                            style={{textAlign: 'right'}}
                            readOnly
                          />
                        </td>
                        <td>
                          <div className="input-group">
                            <div className='input-group-prepend'>
                              <div className='input-group-text'>$</div>
                            </div>
                            <input
                              type="number"
                              value={this.state.totalCost}
                              className="form-control"
                              disabled
                            />
                          </div>
                        </td>
                      </tr>
                    ):null
                  }
                </tfoot>
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

{/* Submit */}
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
