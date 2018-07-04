import React from 'react'
import { Link } from 'react-router-dom'
import MCItem from './MCItem'
//import debug from '../debug'

const MCTest = ({match, test: { id, title, subtitle, look, questions }}) => (
  <div className={look+' container border-right border-left box-shadow mt-4'}>
    <Link to={'/'+match.params.super}>
      <button type="button" className="color-gray close document-close-btn">&times;</button>
    </Link>
    <div className='w-100 rounded px-3 py-3 my-2 align-items-center'>
      <h4>{title}</h4>
      <div>{subtitle}</div>
      <form onSubmit={e => {
          e.preventDefault();
          questions.map((q,qi) => {
            sessionStorage.setItem(id+'-'+qi,
            q.answers.reduce((ret,s,si) => {
                ret[si]=sessionStorage.getItem(id+'-'+qi+'-'+si)==='1'?1:0;
                return ret;
              },[]).toString());
            return null;
          });
          localStorage.setItem('mc-score-'+id,
            questions.reduce((qret,q,qi) => (
              qret+q.score.reduce((ret,s,si) => {
                ret=ret+((sessionStorage.getItem(id+'-'+qi)===s.choosen.toString())?s.points:0);
                //ret[s.shows]+((sessionStorage.getItem(id+'-'+qi)===s.choosen.toString())?s.points:0);
                return ret;
            },0)
          ),0))
        }}>
        {questions.map((r,i) => (
          <MCItem key={i} choice_id={id+'-'+i} question={r} />
        ))}
        <div className="w-100 text-right">
          <button className="btn btn-success my-3" type="submit">DONE</button>
        </div>
      </form>
    </div>
  </div>
)

export default MCTest
