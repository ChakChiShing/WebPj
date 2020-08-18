import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { CreateCheckbox, DateInput, NameInput, CostInput } from './functions';
import './edit.css';

class Edit extends Component {
  constructor(props){
    super(props);
    this.state = {
      projectName: '',  
      projectSelling: '', 
      customer: {
        lastName: '', 
        firstName: '', 
        organization: '',
      }, 
      checkbox: [
        {period: 'SA&D', option: false}, 
        {period: 'SI&I', option: false}, 
        {period: 'UAT', option: false},
        {period: 'Prod. Rol.', option: false}, 
        {period: 'Nursing', option: false}, 
        {period: 'SM&S', option: false},
      ],
      rowsTM: [{
        lastName: '',
        firstName: '', 
        position: 'Position', 
        checkboxTM: [
          {period: 'SA&D', option: false}, 
          {period: 'SI&I', option: false}, 
          {period: 'UAT', option: false}, 
          {period: 'Prod. Rol.', option: false}, 
          {period: 'Nursing', option: false}, 
          {period: 'SM&S', option: false}, 
        ], 
        totalCost: 0, 
      }],
      rowsOC: [{
        equipment: "",
        quantity: '', 
        cost: '',
      }],
    }
  }
//handle input change
  handleInputChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }
//handle object change
  handleObjectChange = (name, value, obj, element) => {
    const _obj = obj;
    element[name] = value;
    this.setState({
      [obj]: _obj
    })
  }
//handle team member change
  AddRowTM = () => {
    const item = {
      lastName: '',
      firstName: '', 
      position: 'Position', 
      checkboxTM: [
        {period: 'SA&D', option: false}, 
        {period: 'SI&I', option: false}, 
        {period: 'UAT', option: false}, 
        {period: 'Prod. Rol.', option: false}, 
        {period: 'Nursing', option: false}, 
        {period: 'SM&S', option: false}, 
      ], 
      totalCost: 0, 
    };
    this.setState({
      rowsTM: [...this.state.rowsTM, item]
    });
  };
//handle other cost change
  AddRowOC = () => {
    const obj = {
      equipment: "",
      quantity: '', 
      cost: '',
    };
    this.setState({
      rowsOC: [...this.state.rowsOC, obj]
    });
  };
//remove row
  RemoveRow = (name, obj) => {
    this.setState({
      [name]: obj.slice(0, -1)
    });
  };
//disable delete botton
  Disable = (obj) => {
    if(obj.length <= 1){
      return true;
    } else {
      return false;
    }
  }
//handle submit
  onSubmit = (e) => {
    e.preventDefault();
    alert('submitted');
  }

DateDiff = (startYYYY, startMM, startDD, endYYYY, endMM, endDD) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date (startYYYY, startMM, startDD);
  const secondDate = new Date (endYYYY, endMM, endDD);

  const dateDiff = Math.round(Math.abs((firstDate - secondDate)/ oneDay));
  return dateDiff;
}


  render() {
    console.log(this.state.checkbox)
    return (
      <div style={{marginTop: 20}}>
        <h3>Edit Project</h3>
        <form onSubmit={this.onSubmit}>
{/* project name */}
          <div className="form-group row">
            <label className='col-lg-2 col-form-label'>Project Name</label>
            <div className='col-lg-7'>
              <NameInput placeholder='Project Name' value={this.state.projectName} name='projectName' func={this.handleInputChange} obj={null} elem={null}/>
            </div>
          </div>
{/* customer name */}
          <div className="form-group row">
            <label className='col-lg-2 col-form-label'>Customer Info.</label>
            <div className='col-lg-7'>
              <div className='input-group'>
                <NameInput placeholder='Last Name' value={this.state.customer.lastName} name='lastName' func={this.handleObjectChange} obj={this.state.customer} elem={this.state.customer}/>
                <NameInput placeholder='First Name' value={this.state.customer.firstName} name='firstName' func={this.handleObjectChange} obj={this.state.customer} elem={this.state.customer}/>
                <NameInput placeholder='Organization' value={this.state.customer.organization} name='organization' func={this.handleObjectChange} obj={this.state.customer}/>
              </div>
            </div>
          </div>
{/* project selling */}
          <div className="form-group row">
            <label className='col-lg-2 col-form-label'>Project Selling</label>
            <div className='col-lg-7'>
              <CostInput placeholder='Amount' value={this.state.projectSelling} name='projectSelling' func={this.handleInputChange} obj={null} elem={null}/>
            </div>
          </div>
{/* period */}
          <div className='form-group row'>
            <label className='col-lg-2 col-form-label'>Period</label>
            <div className='col-lg-7' style={{marginTop: 6}}>
              {this.state.checkbox.map((element, idx) => {
                return(
                  <React.Fragment key={`-1${idx}`}>
                    <CreateCheckbox checkbox={this.state.checkbox} func={this.handleObjectChange} isInitialPeriod={true} 
                    dis={null} elem={element} idx={idx} period={element.period} option={element.option} unique='-1'/>
                  </React.Fragment>
                )
              })}
            </div>
          </div>
{/* start date */}
          {this.state.checkbox.map((element, idx) => {
            return(
              element.option
              ? (
                <div className='form-group row' key={`Date${idx}`}>
                  <label className='col-lg-2 col-form-label'>{`Start Date (${element.period})`}</label>
                  <DateInput
                    DD={element.startDD} MM={element.startMM} YYYY={element.startYYYY}
                    nameDD='startDD' nameMM='startMM' nameYYYY='startYYYY' func={this.handleObjectChange}
                    checkbox={this.state.checkbox} element={element}
                  />
                  <label className='col-lg-1 col-form-label'>{`End Date`}</label>
                  <DateInput 
                    DD={element.endDD} MM={element.endMM} YYYY={element.endYYYY}
                    nameDD='endDD' nameMM='endMM' nameYYYY='endYYYY' func={this.handleObjectChange}
                    checkbox={this.state.checkbox} element={element}
                  />
                </div>
              )
              : null
            ) 
          })}
{/* team member */}
          <div className="form-group row">
            <label className='col-lg-2 col-form-label'>Team Member</label>
            <div className="col-lg-7 column">
              <table className="table-borderless" id="tab_logic">
                <tbody>
                  {this.state.rowsTM.map((item, itemIdx) => (
                    <React.Fragment key={`rowsTM${itemIdx}`}>
                      <tr id={`rowsTM${itemIdx}`}>
                        <td style={{width: '17%'}}>
                          <NameInput placeholder='Last Name' value={this.state.rowsTM.lastName} name='lastName' func={this.handleObjectChange} obj={this.state.rowsTM} elem={item}/>
                        </td>
                        <td style={{width: '29%'}}>
                          <NameInput placeholder='First Name' value={this.state.rowsTM.firstName} name='firstName' func={this.handleObjectChange} obj={this.state.rowsTM} elem={item}/>
                        </td>
                        <td style={{width: '16%'}}>
                          <DropdownButton id="dropdown-basic-button" type='button' title={item.position}>
                            <Dropdown.Item as='button' type='button'><div onClick={(e) => this.handleObjectChange('position', e.target.textContent, this.state.rowsTM, item)}>PM</div></Dropdown.Item>
                            <Dropdown.Item as='button' type='button'><div onClick={(e) => this.handleObjectChange('position', e.target.textContent, this.state.rowsTM, item)}>SA</div></Dropdown.Item>
                            <Dropdown.Item as='button' type='button'><div onClick={(e) => this.handleObjectChange('position', e.target.textContent, this.state.rowsTM, item)}>AP</div></Dropdown.Item>
                            <Dropdown.Item as='button' type='button'><div onClick={(e) => this.handleObjectChange('position', e.target.textContent, this.state.rowsTM, item)}>P</div></Dropdown.Item>
                          </DropdownButton>
                        </td>
                        <td>
                          <div>
                            {item.checkboxTM.map((element, elementIdx) => {
                              return(
                                <React.Fragment key={`${itemIdx}${elementIdx}`}>
                                  <CreateCheckbox checkbox={item.checkboxTM} func={this.handleObjectChange} isInitialPeriod={false} 
                                  dis={this.state.checkbox[elementIdx]['option']} elem={element} idx={elementIdx} period={element.period} option={element.option} unique={itemIdx}/>
                                </React.Fragment>
                              )
                            })}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td/>
                        <td/>
                        <td/>
                        <td>
                          <table className='table-borderless'>
                            <tbody>
                              <tr>
                                <td style={{width: '21%'}}>
                                  <input type="text" className="form-control-plaintext" style={{textAlign: 'right'}} value='Cost :  ' readOnly/>
                                </td>
                                <td>
                                  <div className="input-group">
                                    <div className='input-group-prepend'>
                                      <div className='input-group-text'>$</div>
                                    </div>
                                    {/* {item.checkboxTM.map((element, elementIdx) => {
                                      element.option
                                      ? {this.DateDiff(this.state.checkbox.startYYYY, this.state.checkbox.startMM, this.state.checkbox.startDD, this.state.checkbox.endYYYY, this.state.checkbox.endMM, this.state.checkbox.endDD)}
                                      : null
                                    })} */}
                                    <input type="number" className="form-control" disabled
                                      value={this.state.totalCost}
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <button type='button' className="btn btn-outline-secondary" style={{marginRight: 10}} onClick={this.AddRowTM}>
                Add Member
              </button>
              <button type='button' className="btn btn-outline-danger" name='rowsTM' onClick={e => this.RemoveRow(e.target.name, this.state.rowsTM)} disabled={this.Disable(this.state.rowsTM)}>
                Delete
              </button>
            </div>
          </div>
{/* other cost */}
          <div className="form-group row">
            <label className='col-lg-2 col-form-label'>Other Cost</label>
            <div className="col-lg-7 column">
              <table className="table-borderless" id="tab_logic">
                <tbody>
                  {this.state.rowsOC.map((item, idx) => (
                    <tr id={`rowsOC${idx}`} key={`rowsOC${idx}`} style={{height: 45}}>
                      <td>
                        <NameInput placeholder='Equipment' value={item.equipment} name='equipment' func={this.handleObjectChange} obj={this.state.rowsOC} elem={item}/>
                      </td>
                      <td style={{width: '24%'}}>
                        <input type="number" name='quantity' className="form-control" placeholder='Quantity' min='1'
                          value={item.quantity} onChange={(e) => this.handleObjectChange(e.target.name, e.target.value, this.state.rowsOC, item)}
                        />
                      </td>
                      <td style={{width: '30%'}}>
                        <CostInput placeholder='Cost' value={item.cost} name='cost' func={this.handleObjectChange} obj={this.state.rowsOC} elem={item}/>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className='border-width'> 
                  <tr style={{height: 47}}>
                    <td/>
                    <td>
                      <input type="text" className="form-control-plaintext" style={{textAlign: 'right'}} value='Total Cost :  ' readOnly/>
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
                </tfoot>
              </table>
            </div>
            <div>
              <button type='button' className="btn btn-outline-secondary" style={{marginRight: 10}} onClick={this.AddRowOC}>
                Add Item
              </button> 
              <button type='button' className="btn btn-outline-danger" name='rowsOC' onClick={e => this.RemoveRow(e.target.name, this.state.rowsOC)} disabled={this.Disable(this.state.rowsOC)}>
                Delete
              </button>
            </div>
          </div>
{/* Submit */}
          <div className='row'>
            <div className='offset-lg-2 col-lg-7'>
              <input 
                type="submit" 
                className="btn btn-outline-primary btn-block"
                value='Submit'
              />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Edit;
