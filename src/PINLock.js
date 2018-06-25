import React from 'react'
import debug from './include/debug'

class PINLock extends React.Component {
  state = { PIN: '' }
  render() {
    return (
      <div className="content p-5">
        <div className="m-2">
         <div className="card PIN-card m-auto box-shadow">
           <div className="card-header look-PIN-header">
             <h3 className="">
               <img className="lock-image" alt="locked" src="images/lock-img.png"></img>
               PIN</h3>
           </div>
           <div className="card-body look-PIN-body text-right">
             <form ref="form" className="form-inline" onSubmit={e => {
                 e.preventDefault();
                 this.setState({ PIN: localStorage.getItem('PIN'+this.props.workshop.id)});
                 this.props.onPINSubmit(localStorage.getItem('PIN'+this.props.workshop.id));
                 this.refs.form.reset();
               }}>
             <input className='form-control form-control my-1'
               name='PIN'
               autoFocus
               onChange={evt => {localStorage.setItem('PIN'+this.props.workshop.id, evt.target.value)}}
               placeholder='' />
             <button className='form-control my-1 look-PIN-btn' type="Submit">OK</button>
             </form>
           </div>
          </div>
        </div>
      </div>
     )}
}

export default PINLock;
