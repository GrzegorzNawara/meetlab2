import React from 'react'
//import debug from '../debug'

class MCItem extends React.Component {
render() { return (
  <div className={"bg-white w-100 rounded px-3 py-3 my-2 align-items-center"}>
    <h5>{this.props.question.stem}</h5>
    <div>{this.props.question.answers.map((r,i) => (
        <div key={i} className="form-check">
          <label className="form-check-label">
            <input className="form-check-input"
              defaultChecked={(sessionStorage.getItem(this.props.choice_id+'-'+i)==='1')}
              onChange={(e)=>{sessionStorage.setItem(this.props.choice_id+'-'+i,e.target.checked?'1':'0')}}
              type="checkbox" />{r}
          </label>
        </div>
    ))}</div>
  </div>
)}}

export default MCItem
