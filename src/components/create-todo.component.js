import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import './edit.css';

//components
const Wrapper = (props) => {
  return(
    <div className='col-lg-7'>
      {props.children}
    </div>
  )
}
const FormRow = (props) => {
  return(
    <div className="form-group row">
      <label className='col-lg-2 col-form-label'>{props.label}</label>
      {props.children}
    </div>
  )
}
const CreateCheckbox = (props) => {
  return(
    <div className='form-check form-check-inline'>
      <input className='form-check-input' type='checkbox' id={`${props.unique}${props.idx}`}
        name='option'
        checked={props.option}
        onChange={(e) => props.func(e.target.name, e.target.checked, props.obj, props.elem)}
        disabled={props.isInitialPeriod
                    ? null
                    : !props.dis
                  }
      />
      {props.isInitialPeriod
        ? <label className='form-check-label' htmlFor={`${props.unique}${props.idx}`}>{props.period}</label>
        : <label className='form-check-label' htmlFor={`${props.unique}${props.idx}`} style={{fontSize: 13}}>{props.period}</label>
      }
    </div>
  )
}
const DateInput = (props) => {
  return(
    <div className='col-lg-3'>
      <table className='table-borderless'>
        <tbody>
          <tr>
            <td>
              <div className='input-group'>
                <input type="number" className="form-control" placeholder='DD' max='31' min='1'
                  value={props.DD || ''} name={props.nameDD} onChange={(e) => props.func(e.target.name, e.target.value, props.checkbox, props.element)}
                />
                <input type="number" className="form-control" placeholder='MM'max='12'min='1'
                  value={props.MM || ''} name={props.nameMM} onChange={(e) => props.func(e.target.name, e.target.value, props.checkbox, props.element)}
                />
                <input type="number" className="form-control" placeholder='YYYY' min='2000' max='3000'
                  value={props.YYYY || ''} name={props.nameYYYY} onChange={(e) => props.func(e.target.name, e.target.value, props.checkbox, props.element)}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
const NameInput = (props) => {
  return(
    <input  type="text" className="form-control" placeholder={props.placeholder}
      value={props.value} name={props.name}
      onChange={(e) => props.func(e.target.name, e.target.value, props.obj, props.elem)}
    />
  )
}
const CostInput = (props) => {
  return(
    <div className="input-group">
      <div className='input-group-prepend'>
        <div className='input-group-text'>$</div>
      </div>
      <input type="number" className="form-control" placeholder={props.placeholder}
        value={props.cost}
        name='cost'
        onChange={(e) => props.func(e.target.name, e.target.value, props.obj, props.elem)}
      />
    </div>
  )
}
const QuantityInput = (props) => {
  return(
    <input type="number" name='quantity' className="form-control" placeholder='Quantity' min='1'
      value={props.quantity} onChange={(e) => props.func(e.target.name, e.target.value, props.obj, props.elem)}
    />
  )
}
const AddDelete = (props) => {
  return(
    <div>
      <button type='button' className="btn btn-outline-secondary" style={{marginRight: 10}} onClick={props.AddRow}>
        Add Item
      </button> 
      <button type='button' className="btn btn-outline-danger" onClick={() => props.RemoveRow(props.name, props.obj)} disabled={props.Disable(props.obj)}>
        Delete
      </button>
    </div>
  )
}

class CreateNewProject extends Component {
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
    }
  }

  handleInputChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }
  handleObjectChange = (name, value, obj, element) => {
    const _obj = obj;
    element[name] = value;
    this.setState({
      [obj]: _obj
    })
  }
  DisableDelete = (obj) => {
    if(obj.length <= 1){
      return true;
    } else {
      return false;
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    alert('submitted');
  }


  render() {
    return (
      <div>
        <h2 style={{marginBottom: 20}}>Create New Project</h2>
        <form onSubmit={this.onSubmit}>
{/* project name */}
          <FormRow label='Project Name'>
            <Wrapper>
              <NameInput placeholder='Project Name' value={this.state.projectName} name='projectName' func={this.handleInputChange} obj={null} elem={null}/>
            </Wrapper>
          </FormRow>
{/* customer name */}
          <FormRow label='Customer Info.'>
            <Wrapper>
              <div className='input-group'>
                <NameInput placeholder='Last Name' value={this.state.customer.lastName} name='lastName' func={this.handleObjectChange} obj={this.state.customer} elem={this.state.customer}/>
                <NameInput placeholder='First Name' value={this.state.customer.firstName} name='firstName' func={this.handleObjectChange} obj={this.state.customer} elem={this.state.customer}/>
                <NameInput placeholder='Organization' value={this.state.customer.organization} name='organization' func={this.handleObjectChange} obj={this.state.customer} elem={this.state.customer}/>
              </div>
            </Wrapper>
          </FormRow>
{/* project selling */}
          <FormRow label='Project Selling'>
            <Wrapper>
              <CostInput placeholder='Amount' value={this.state.projectSelling} name='projectSelling' func={this.handleInputChange} obj={null} elem={null}/>
            </Wrapper>
          </FormRow>
{/* period */}
          <FormRow label='Period'>
            <Wrapper>
              <div style={{marginTop: 6}}>
                {this.props.checkbox.map((element, idx) => {
                  return(
                    <React.Fragment key={`-1${idx}`}>
                      <CreateCheckbox obj={this.props.checkbox} func={this.handleObjectChange} isInitialPeriod={true} 
                      dis={null} elem={element} idx={idx} period={element.period} option={element.option} unique='-1'/>
                    </React.Fragment>
                  )
                })}
              </div>              
            </Wrapper>
          </FormRow>
{/* start date */}
          {this.props.checkbox.map((element, idx) => {
            return(
              element.option
              ? (
                <FormRow label={`Start Date (${element.period})`} key={`${idx}`}>
                  <DateInput DD={element.startDD} MM={element.startMM} YYYY={element.startYYYY}
                            nameDD='startDD' nameMM='startMM' nameYYYY='startYYYY' func={this.handleObjectChange}
                            checkbox={this.state.checkbox} element={element}
                  />
                  <label className='col-lg-1 col-form-label'>{`End Date`}</label>
                  <DateInput DD={element.endDD} MM={element.endMM} YYYY={element.endYYYY}
                            nameDD='endDD' nameMM='endMM' nameYYYY='endYYYY' func={this.handleObjectChange}
                            checkbox={this.state.checkbox} element={element}
                  />
                </FormRow>
              )
              : null
            ) 
          })}
{/* team member */}
          <FormRow label='Team Memer'>
            <Wrapper>
              <table className="table-borderless" id="tab_logic">
                <tbody>
                  {this.props.rowsTM.map((item, itemIdx) => (
                    <React.Fragment key={`rowsTM${itemIdx}`}>
                      <tr id={`rowsTM${itemIdx}`}>
                        <td style={{width: '17%'}}>
                          <NameInput placeholder='Last Name' value={item.lastName} name='lastName' func={this.handleObjectChange} obj={this.props.rowsTM} elem={item}/>
                        </td>
                        <td style={{width: '30%'}}>
                          <NameInput placeholder='First Name' value={item.firstName} name='firstName' func={this.handleObjectChange} obj={this.props.rowsTM} elem={item}/>
                        </td>
                        <td style={{width: '16%'}}>
                          <DropdownButton id="dropdown-basic-button" type='button' title={item.position}>
                            <Dropdown.Item as='button' type='button'><div onClick={(e) => this.handleObjectChange('position', e.target.textContent, this.props.rowsTM, item)}>PM</div></Dropdown.Item>
                            <Dropdown.Item as='button' type='button'><div onClick={(e) => this.handleObjectChange('position', e.target.textContent, this.props.rowsTM, item)}>SA</div></Dropdown.Item>
                            <Dropdown.Item as='button' type='button'><div onClick={(e) => this.handleObjectChange('position', e.target.textContent, this.props.rowsTM, item)}>AP</div></Dropdown.Item>
                            <Dropdown.Item as='button' type='button'><div onClick={(e) => this.handleObjectChange('position', e.target.textContent, this.props.rowsTM, item)}>P</div></Dropdown.Item>
                          </DropdownButton>
                        </td>
                        <td>
                          {item.checkboxTeamMember.map((element, elementIdx) => {
                            return(
                              <React.Fragment key={`${itemIdx}${elementIdx}`}>
                                <CreateCheckbox checkbox={item.checkboxTeamMember} func={this.handleObjectChange} isInitialPeriod={false} 
                                dis={this.props.checkbox[elementIdx]['option']} elem={element} idx={elementIdx} period={element.period} option={element.option} unique={itemIdx}/>
                              </React.Fragment>
                            )
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td/><td/><td/>
                        <td>
                          <CostInput value={item.cost} func={this.handleObjectChange} obj={this.props.rowsTM} elem={item} placeholder='Cost'/>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>     
            </Wrapper>           
            <AddDelete name='rowsTM' AddRow={this.props.AddRowTeamMember} RemoveRow={this.props.RemoveRow} obj={this.props.rowsTM} Disable={this.DisableDelete}/>
          </FormRow>
{/* other cost */}
          <FormRow label='Other Cost'>
            <Wrapper>
              <table className="table-borderless" id="tab_logic">
                <tbody>
                  {this.props.rowsOC.map((item, idx) => (
                    <tr id={`rowsOC${idx}`} key={`rowsOC${idx}`} style={{height: 45}}>
                      <td style={{width: '46%'}}>
                        <NameInput placeholder='Equipment' name='equipment' value={item.equipment} func={this.handleObjectChange} obj={this.props.rowsOC} elem={item}/>
                      </td>
                      <td style={{width: '17%'}}>
                        <QuantityInput value={item.quantity} func={this.handleObjectChange} obj={this.props.rowsOC} elem={item}/>
                      </td>
                      <td>
                        <CostInput value={item.cost} func={this.handleObjectChange} obj={this.props.rowsOC} elem={item} placeholder='Cost'/>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* Total Cost */}
                <tfoot className='border-width'> 
                  <tr style={{height: 47}}>
                    <td/>
                    <td>
                      <button type='button' className='btn btn-outline-primary' style={{marginLeft: 15}} onClick={this.props.CalculateTotalCost}>
                        Calculate
                      </button>
                    </td>
                    <td>
                      <div className="input-group">
                        <div className='input-group-prepend'>
                          <div className='input-group-text'>$</div>
                        </div>
                        <input type="number" placeholder='Total Cost' value={this.props.totalCost} className="form-control" readOnly/>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </Wrapper>
            <AddDelete name='rowsOC' AddRow={this.props.AddRowOtherCost} RemoveRow={this.props.RemoveRow} obj={this.props.rowsOC} Disable={this.DisableDelete}/>
          </FormRow>
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

export default CreateNewProject;
