import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { withRouter } from 'react-router-dom';

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
        value={props.value}
        name={props.name}
        onChange={props.name === 'selling'
                  ? (e) => props.func(e.target.name, e.target.value)
                  : (e) => props.func(e.target.name, e.target.value, props.obj, props.elem)
                  }
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

class Edit extends Component {
  constructor(props){
    super(props);
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
    }
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;
    axios.get('http://localhost:4000/project/'+id)
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

  //methods for Edit
  HandleInputChange = (name_, value) => {
    this.setState({
      [name_]: value
    })
  }
  HandleObjectChange = (name, value, obj, element) => {
    const _obj = obj;
    element[name] = value;
    this.setState({
      [obj]: _obj
    })
  }
  AddRowTeamMember = () => {
    const item = {
      lastName: '',
      firstName: '', 
      position: '', 
      checkboxTeamMember: [
        {period: 'SA&D', option: false, daysSpent: '', remarks: ''}, 
        {period: 'SI&I', option: false, daysSpent: '', remarks: ''}, 
        {period: 'UAT', option: false, daysSpent: '', remarks: ''}, 
        {period: 'Prod. Rol.', option: false, daysSpent: '', remarks: ''}, 
        {period: 'Nursing', option: false, daysSpent: '', remarks: ''}, 
        {period: 'SM&S', option: false, daysSpent: '', remarks: ''}, 
      ], 
      cost: '', 
    };
    this.setState({
      rowsTM: [...this.state.rowsTM, item]
    });
  };
  AddRowOtherCost = () => {
    const obj = {
      equipment: '',
      quantity: '', 
      cost: '',
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
  DisableDelete = (obj) => {
    if(obj.length <= 1){
      return true;
    } else {
      return false;
    }
  }
  CalculateTotalCost = () => {
    const totalTM = this.state.rowsTM.reduce((accumulator, currentValue) => 
      accumulator + (parseInt(currentValue.cost) || 0)
    , 0)
    const totalOC = this.state.rowsOC.reduce((accumulator, currentValue) => 
      accumulator + (parseInt(currentValue.cost) || 0)
    , 0)
    this.setState({
      totalCost: (totalTM + totalOC).toString()
    })
  }
  onSubmit = (e) => {
    e.preventDefault();
    alert('submitted');

    const obj = {
      name: this.state.name,  
      selling: this.state.selling, 
      customer: this.state.customer, 
      totalCost: this.state.totalCost, 
      checkbox: this.state.checkbox, 
      rowsTM: this.state.rowsTM, 
      rowsOC: this.state.rowsOC, 
    }

    axios.post('http://localhost:4000/project/update/' + this.props.match.params.id, obj)
        .then(res => {
          console.log(res.data);
        });

    this.props.history.push('/project/' + this.props.match.params.id);
  }



  render() {
    console.log(this.state.rowsOC);
    return (
      <div>
        <h2 style={{marginBottom: 20}}>Edit Project</h2>
        <form onSubmit={this.onSubmit}>
{/* project name */}
          <FormRow label='Project Name'>
            <Wrapper>
              <NameInput placeholder='Project Name' value={this.state.name} name='name' func={this.HandleInputChange} obj={null} elem={null}/>
            </Wrapper>
          </FormRow>
{/* customer name */}
          <FormRow label='Customer Info.'>
            <Wrapper>
              <div className='input-group'>
                <NameInput placeholder='Last Name' value={this.state.customer.lastName} name='lastName' func={this.HandleObjectChange} obj={this.state.customer} elem={this.state.customer}/>
                <NameInput placeholder='First Name' value={this.state.customer.firstName} name='firstName' func={this.HandleObjectChange} obj={this.state.customer} elem={this.state.customer}/>
                <NameInput placeholder='Organization' value={this.state.customer.organization} name='organization' func={this.HandleObjectChange} obj={this.state.customer} elem={this.state.customer}/>
              </div>
            </Wrapper>
          </FormRow>
{/* project selling */}
          <FormRow label='Project Selling'>
            <Wrapper>
              <CostInput placeholder='Amount' value={this.state.selling} name='selling' func={this.HandleInputChange}/>
            </Wrapper>
          </FormRow>
{/* period */}
          <FormRow label='Period'>
            <Wrapper>
              <div style={{marginTop: 6}}>
                {this.state.checkbox.map((element, idx) => {
                  return(
                    <React.Fragment key={`-1${idx}`}>
                      <CreateCheckbox obj={this.state.checkbox} func={this.HandleObjectChange} isInitialPeriod={true} 
                      dis={null} elem={element} idx={idx} period={element.period} option={element.option} unique='-1'/>
                    </React.Fragment>
                  )
                })}
              </div>              
            </Wrapper>
          </FormRow>
{/* start date */}
          {this.state.checkbox.map((element, idx) => {
            return(
              element.option
              ? (
                <FormRow label={`Start Date (${element.period})`} key={`${idx}`}>
                  <DateInput DD={element.startDD} MM={element.startMM} YYYY={element.startYYYY}
                            nameDD='startDD' nameMM='startMM' nameYYYY='startYYYY' func={this.HandleObjectChange}
                            checkbox={this.state.checkbox} element={element}
                  />
                  <label className='col-lg-1 col-form-label'>{`End Date`}</label>
                  <DateInput DD={element.endDD} MM={element.endMM} YYYY={element.endYYYY}
                            nameDD='endDD' nameMM='endMM' nameYYYY='endYYYY' func={this.HandleObjectChange}
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
                  {this.state.rowsTM.map((item, itemIdx) => (
                    <React.Fragment key={`rowsTM${itemIdx}`}>
                      <tr id={`rowsTM${itemIdx}`}>
                        <td style={{width: '17%'}}>
                          <NameInput placeholder='Last Name' value={item.lastName} name='lastName' func={this.HandleObjectChange} obj={this.state.rowsTM} elem={item}/>
                        </td>
                        <td style={{width: '29%'}}>
                          <NameInput placeholder='First Name' value={item.firstName} name='firstName' func={this.HandleObjectChange} obj={this.state.rowsTM} elem={item}/>
                        </td>
                        <td style={{width: '17%'}}>
                          <select name='position' value={item.position} onChange={e => {this.HandleObjectChange(e.target.name, e.target.value, this.state.rowsTM, item)}} className='custom-select'>
                            <option defaultValue>Position</option>
                            <option value='PM'>PM</option>
                            <option value='SA'>SA</option>
                            <option value='AP'>AP</option>
                            <option value='P'>P</option>
                          </select>
                        </td>
                        <td>
                          {item.checkboxTeamMember.map((element, elementIdx) => {
                            return(
                              <React.Fragment key={`${itemIdx}${elementIdx}`}>
                                <CreateCheckbox checkbox={item.checkboxTeamMember} func={this.HandleObjectChange} isInitialPeriod={false} 
                                dis={this.state.checkbox[elementIdx]['option']} elem={element} idx={elementIdx} period={element.period} option={element.option} unique={itemIdx}/>
                              </React.Fragment>
                            )
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td/><td/><td/>
                        <td>
                          <CostInput name='cost' value={item.cost} func={this.HandleObjectChange} obj={this.state.rowsTM} elem={item} placeholder='Cost'/>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>     
            </Wrapper>           
            <AddDelete name='rowsTM' AddRow={this.AddRowTeamMember} RemoveRow={this.RemoveRow} obj={this.state.rowsTM} Disable={this.DisableDelete}/>
          </FormRow>
{/* other cost */}
          <FormRow label='Other Cost'>
            <Wrapper>
              <table className="table-borderless" id="tab_logic">
                <tbody>
                  {this.state.rowsOC.map((item, idx) => (
                    <tr id={`rowsOC${idx}`} key={`rowsOC${idx}`} style={{height: 45}}>
                      <td style={{width: '46%'}}>
                        <NameInput placeholder='Equipment' name='equipment' value={item.equipment} func={this.HandleObjectChange} obj={this.state.rowsOC} elem={item}/>
                      </td>
                      <td style={{width: '17%'}}>
                        <QuantityInput value={item.quantity} func={this.HandleObjectChange} obj={this.state.rowsOC} elem={item}/>
                      </td>
                      <td>
                        <CostInput name='cost' value={item.cost} func={this.HandleObjectChange} obj={this.state.rowsOC} elem={item} placeholder='Cost'/>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* Total Cost */}
                <tfoot className='border-width'> 
                  <tr style={{height: 47}}>
                    <td/>
                    <td>
                      <button type='button' className='btn btn-outline-primary btn-block' onClick={this.CalculateTotalCost}>
                        Calculate
                      </button>
                    </td>
                    <td>
                      <div className="input-group">
                        <div className='input-group-prepend'>
                          <div className='input-group-text'>$</div>
                        </div>
                        <input type='number' placeholder='Total Cost' value={this.state.totalCost} className="form-control" readOnly/>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </Wrapper>
            <AddDelete name='rowsOC' AddRow={this.AddRowOtherCost} RemoveRow={this.RemoveRow} obj={this.state.rowsOC} Disable={this.DisableDelete}/>
          </FormRow>
{/* Submit */}
          <div className='offset-lg-2 col-lg-7'>
            <input 
              type="submit" 
              className="btn btn-outline-primary btn-block"
              value='Update'
              disabled={this.state.totalCost === '' ? true : false}
            />
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(Edit);
