import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { CreateCheckbox, DateInput, NameInput, CostInput, QuantityInput } from './functions';
import './edit.css';


class Edit extends Component {
  constructor(props){
    super(props);
    this.state = {
      projectName: '',  
      projectSelling: '', 
      //customer
      customer: {
        lastName: '', 
        firstName: '', 
        organization: '',
      }, 
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
        checkboxTM: [
          {period: 'SA&D', option: false}, 
          {period: 'SI&I', option: false}, 
          {period: 'UAT', option: false}, 
          {period: 'Prod. Rol.', option: false}, 
          {period: 'Nursing', option: false}, 
          {period: 'SM&S', option: false}, 
        ], 
        cost: 0, 
      }],
      //Other Cost
      rowsOC: [{
        equipment: '',
        quantity: '', 
        cost: 0,
      }],
      //Total Cost 
      totalCost: '', 
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
      cost: 0, 
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
      cost: 0,
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
//calculate total cost
  calculate = () => {
    const totalTM = this.state.rowsTM.reduce((accumulator, currentValue) => 
      accumulator + parseInt(currentValue.cost)
    , 0)
    const totalOC = this.state.rowsOC.reduce((accumulator, currentValue) => 
      accumulator + parseInt(currentValue.cost)
    , 0)
    this.setState({
      totalCost: (totalTM + totalOC).toString()
    })
  }
//handle submit
  onSubmit = (e) => {
    e.preventDefault();
    alert('submitted');
  }


  render() {
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
                <NameInput placeholder='Organization' value={this.state.customer.organization} name='organization' func={this.handleObjectChange} obj={this.state.customer} elem={this.state.customer}/>
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
                        <td style={{width: '17%'}}>
                          <DropdownButton id="dropdown-basic-button" type='button' title={item.position} style={{marginLeft: 5}}>
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
                        <td/><td/><td/>
                        <td>
                          <div className="input-group">
                            <CostInput value={item.cost} func={this.handleObjectChange} obj={this.state.rowsTM} elem={item}/>
                          </div>
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
                      <td style={{width: '46%'}}>
                        <NameInput placeholder='Equipment' name='equipment' value={item.equipment} func={this.handleObjectChange} obj={this.state.rowsOC} elem={item}/>
                      </td>
                      <td style={{width: '17%'}}>
                        <QuantityInput value={item.quantity} func={this.handleObjectChange} obj={this.state.rowsOC} elem={item}/>
                      </td>
                      <td>
                        <CostInput value={item.cost} func={this.handleObjectChange} obj={this.state.rowsOC} elem={item}/>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className='border-width'> 
                  <tr style={{height: 47}}>
                    <td/>
                    <td>
                      <button type='button' className='btn btn-outline-primary' style={{marginLeft: 7}} onClick={this.calculate}>
                        Calculate
                      </button>
                    </td>
                    <td>
                      <div className="input-group">
                        <div className='input-group-prepend'>
                          <div className='input-group-text'>$</div>
                        </div>
                        <input
                          type="number"
                          placeholder='Total Cost'
                          value={this.state.totalCost}
                          className="form-control"
                          readOnly
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
