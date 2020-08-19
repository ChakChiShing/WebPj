import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export const CreateCheckbox = (props) => {
  return(
    <div className='form-check form-check-inline'>
      <input className='form-check-input' type='checkbox' id={`${props.unique}${props.idx}`}
        name='option'
        checked={props.option}
        onChange={(e) => props.func(e.target.name, e.target.checked, props.checkbox, props.elem)}
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

export const DateInput = (props) => {
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

export const NameInput = (props) => {
  return(
    <input  type="text" className="form-control" placeholder={props.placeholder}
      value={props.value} name={props.name}
      onChange={(e) => props.func(e.target.name, e.target.value, props.obj, props.elem)}
    />
  )
}

export const CostInput = (props) => {
  return(
    <div className="input-group">
      <div className='input-group-prepend'>
        <div className='input-group-text'>$</div>
      </div>
      <input type="number" className="form-control" placeholder='Cost'
        value={props.cost}
        name='cost'
        onChange={(e) => props.func(e.target.name, e.target.value, props.obj, props.elem)}
      />
    </div>
  )
}

export const QuantityInput = (props) => {
  return(
    <input type="number" name='quantity' className="form-control" placeholder='Quantity' min='1'
      value={props.quantity} onChange={(e) => props.func(e.target.name, e.target.value, props.obj, props.elem)}
    />
  )
}
