import React from 'react'
//import debug from '../debug'

const MCItem = ({choice_id, question:{stem, answers, score, look}}) => (
  <div className={"bg-white w-100 rounded px-3 py-3 my-2 align-items-center"}>
    <h5>{stem}</h5>
    <div>{answers.map((r,i) => (
        <div key={i} className="form-check">
          <label className="form-check-label">
            <input className="form-check-input"
              defaultChecked={(sessionStorage.getItem(choice_id+'-'+i)==='1')}
              onChange={(e)=>{sessionStorage.setItem(choice_id+'-'+i,e.target.checked?'1':'0')}}
              type="checkbox" />{r}
          </label>
        </div>
    ))}</div>
  </div>
)

export default MCItem
