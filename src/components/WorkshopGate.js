import React from 'react'
import { cssStyles } from '../config/AppConfig'
//import debug from '../debug'

class WorkshopGate extends React.Component {

  render() { return (
  <div className="w-100 rounded px-3 py-3 my-2 mt-4 align-items-center" style={cssStyles.lookGate}>
    <div className='col-12 w-100 m-0 p-0'>
      <div className='row mb-2'>
        <div className='col-12 text-left'>
          <span className="">
            <span className='h5'>PIN</span>
          </span>
          <form ref="form" onSubmit={e => {
            e.preventDefault();
            document.getElementsByName('gateCode')[0].blur();
          }}>
          <input className='form-control my-1'
            name='gateCode'
            autoComplete="off"
            value={localStorage.getItem('gateCode')}
            onChange={evt => {
              localStorage.setItem('gateCode', evt.target.value);
              this.props.setPin(evt.target.value);
            }}
            placeholder='ENTER PIN' />
          </form>
        </div>
      </div>
    </div>
  </div>
)}}

export default WorkshopGate
