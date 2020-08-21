import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const Tracker = (props) => {
  return(
    <div>
      <h2 style={{marginBottom: 20}}>Tracker</h2>
      <form>
        {props.checkbox.map((item, idx) => {
          return(
            item.option
            ? (
              <div key={`${idx}`}>
                <h4>{item.period}</h4>
                <>
                  {props.rowsTM.map((member, memberIdx) => {
                    return(
                      member.checkboxTeamMember[idx].option
                      ? (
                        <div className="form-group row" key={`${memberIdx}`}>
                          <label className='col-lg-3 col-form-label'>{`${member.lastName} ${member.firstName} (${member.position})`}</label>
                          <input type='number' placeholder='Working Days' className='col-lg-2 form-control' style={{marginRight: 7}}
                                value={member.checkboxTeamMember[idx].daysSpent} name='daysSpent'
                                onChange={e => props.handleObjectChange(e.target.name, e.target.value, props.rowsTM, member)}
                          />
                          <input type='text' placeholder='Remarks' className='col-lg-5 form-control'
                                value={member.checkboxTeamMember[idx].remarks} name='remarks'
                                onChange={e => props.handleObjectChange(e.target.name, e.target.value, props.rowsTM, member)}
                          />
                        </div>
                      )
                      : null
                    )
                  })}
                </>
              </div>
            )
            : null
          )
        })}
      </form>
    </div>
  )
}

export default Tracker;
