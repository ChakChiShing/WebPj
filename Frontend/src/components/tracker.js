import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

class Tracker extends React.Component {
  constructor (props) {
    super(props);
    this.state={
      checkbox: [
        {period: 'SA&D', option: false, startDD: '', startMM: '', startYYYY: '', endDD: '', endMM: '', endYYYY: ''}, 
        {period: 'SI&I', option: false, startDD: '', startMM: '', startYYYY: '', endDD: '', endMM: '', endYYYY: ''}, 
        {period: 'UAT', option: false, startDD: '', startMM: '', startYYYY: '', endDD: '', endMM: '', endYYYY: ''},
        {period: 'Prod. Rol.', option: false, startDD: '', startMM: '', startYYYY: '', endDD: '', endMM: '', endYYYY: ''}, 
        {period: 'Nursing', option: false, startDD: '', startMM: '', startYYYY: '', endDD: '', endMM: '', endYYYY: ''}, 
        {period: 'SM&S', option: false, startDD: '', startMM: '', startYYYY: '', endDD: '', endMM: '', endYYYY: ''},
      ],
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
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:4000/project/' + this.props.match.params.id)
        .then(res => {
          this.setState({
            checkbox: res.data.checkbox,
            rowsTM: res.data.rowsTM,
          })
        })
        .catch(err => {
          console.log(err)
        })
  }

  HandleObjectChange = (name, value, obj, element) => {
    const _obj = obj;
    element[name] = value;
    this.setState({
      [obj]: _obj
    })
  }

  onSubmit = () => {

  }
  
  render() {
    return(
      <div>
        <h2 style={{marginBottom: 20}}>Tracker</h2>
        <form onSubmit={this.onSubmit}>
          {this.state.checkbox.map((item, idx) => {
            return(
              item.option
              ? (
                <div key={`${idx}`}>
                  <h4>{item.period}</h4>
                  <React.Fragment>
                    {this.state.rowsTM.map((member, memberIdx) => {
                      return(
                        member.checkboxTeamMember[idx].option
                        ? (
                          <div className="form-group row" key={`${memberIdx}`}>
                            <label className='col-lg-3 col-form-label'>{`${member.lastName} ${member.firstName} (${member.position})`}</label>
                            <input type='number' placeholder='Working Days' className='col-lg-2 form-control' style={{marginRight: 7}}
                                  value={member.checkboxTeamMember[idx].daysSpent} name='daysSpent'
                                  onChange={e => this.HandleObjectChange(e.target.name, e.target.value, this.state.rowsTM, member)}
                            />
                            <input type='text' placeholder='Remarks' className='col-lg-5 form-control'
                                  value={member.checkboxTeamMember[idx].remarks} name='remarks'
                                  onChange={e => this.HandleObjectChange(e.target.name, e.target.value, this.state.rowsTM, member)}
                            />
                          </div>
                        )
                        : null
                      )
                    })}
                  </React.Fragment>
                </div>
              )
              : null
            )
          })}
          <div className='offset-lg-3 col-lg-7'>
            <input type='submit' className='btn btn-outline-primary btn-block' value='Update'/>
          </div>
        </form>
      </div>
    )
  }
}

export default Tracker;
