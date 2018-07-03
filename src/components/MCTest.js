import React from 'react'
import { Link } from 'react-router-dom'
import MCItem from './MCItem'
//import debug from '../debug'

const MCTest = ({match, test: { title, subtitle, look, questions }}) => (
  <div className={look+' container border-right border-left box-shadow mt-4'}>
    <Link to={'/'+match.params.super}>
      <button type="button" className="color-gray close document-close-btn">&times;</button>
    </Link>
    <div className='w-100 rounded px-3 py-3 my-2 align-items-center'>
      <h4>{title}</h4>
      <div>{subtitle}</div>
      {questions.map((r,i) => (
        <MCItem key={i} question={r} look={look} />
      ))}
    </div>
  </div>
)

export default MCTest
