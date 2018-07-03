import React from 'react'
//import debug from '../include/debug'

const MCItem = ({question:{stem, answers, score, look}}) => (
  <div className={look+" w-100 rounded px-3 py-3 my-2 align-items-center"}>
    <h5>{stem}</h5>
    <div>{answers.map((r,i) => (
        <div key={i}>{r}</div>
    ))}</div>
  </div>
)

export default MCItem
