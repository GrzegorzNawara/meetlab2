import React from 'react'
import Popup from 'reactjs-popup'
import uuidV4 from 'uuid/v4'
import mirSaveMsg from './database/mirSaveMsg'
import MenuItem from './components/MenuItem'
import { MenuConfig } from './config/AppConfig'
//import debug from './debug'

class MenuModal extends React.Component {
  menuAction = ({type, menuItem, mysuper }) => {
    const newBrick = {
      id: uuidV4(),
      super: (mysuper)?mysuper:'top',
      sort: Date.now().toString(),
      title: menuItem.title,
      subtitle: menuItem.subtitle,
      date: new Date().toISOString().split("T")[0],
      owner: this.props.owner,
      params: JSON.stringify(menuItem.params),
      PIN: Math.floor(899999*Math.random()+100000),
      type: 'UNKNOWN'
    }

    switch (type) {
      case 'ADD_WORKSHOP':
        this.props.onAdd({
          ...newBrick,
          type: 'WORKSHOP'
        });
        break;
      case 'ADD_RAVEN':
        fetch('http://api.ignifer-labs.com/raven/api_init_game.php?workshop_id='+mysuper+'&game_id='+newBrick.id+'&billing_user_id='+newBrick.owner+'&game_title='+newBrick.title, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }).then((response) => response.json());
        this.props.onAdd({
          ...newBrick,
          title: 'AUTO',
          type: 'RAVEN'
        });
        break;
      case 'START_MIR_SPRINT':
        this.props.onAdd({
          ...newBrick,
          running: 1,
          title: 'AUTO',
          type: 'MIR'
        })
        mirSaveMsg({
          game:mysuper,
          msg:{ a:'STR', t:Math.round((Date.now()-this.props.map.state.simRealtimeStart)/1000) }})
        break;
      case 'END_MIR_SPRINT':
        this.props.onAdd({
          ...this.props.bricks.filter(b => b.running)[0],
          running: 0
        })
        mirSaveMsg({
          game:mysuper,
          msg:{ a:'END', t:Math.round((Date.now()-this.props.map.state.simRealtimeStart)/1000) }})
        break;
      case 'ADD_MIR':
        this.props.onAdd({
          ...newBrick,
          title: 'AUTO',
          type: 'MIR'
        });
        break;
      case 'ADD_SCORE':
        this.props.onAdd({
          ...newBrick,
          type: 'SCORE'
        });
        break;
      case 'ADD_DOCUMENT':
        this.props.onAdd({
          ...newBrick,
          type: 'DOCUMENT'
        });
        break;
      case 'ADD_MCTEST':
        this.props.onAdd({
          ...newBrick,
          type: 'MC_TEST'
        });
        break;
      case 'ADD_BRICK':
        this.props.onAdd({
          ...newBrick,
          type: 'BRICK'
        });
        break;
      case 'DELETE_LAST_BRICK':
        this.props.onDeleteBrick({...this.props.bricks.sort((a,b)=>(-a.sort.localeCompare(b.sort))).slice(0,1)[0]});
        break;
      case 'DELETE_WORKSHOP':
        if(this.props.bricks.length===0)
          this.props.onDeleteWorkshop({owner: this.props.owner, super: mysuper});
          window.history.back()
        break;
      default:
        return (null);
    }
  }

  render() {
    if(!this.props.mg) return null;
    return (
      <Popup trigger={<div className="admin-button"><img src='./images/admin-button.png' alt=''/></div>}
         modal lockScroll closeOnEscape closeOnDocumentClick position="right center">
         {close => {
          return (
           <div className="modal-off">
           <div className="modal-dialog">
             <div className="modal-content">
             <div className="modal-header" onClick={close}>
               <h4 className="modal-title">MENU</h4>
               <button type="button" className="color-gray close" onClick={close}>&times;</button>
             </div>
             <div className="modal-body">
               <div className="">
                {((this.props.super)?MenuConfig.workshopMenu:MenuConfig.topMenu)
                  .map((item,index)=>{
                  if(item.params.show==='onNonEmpty' && this.props.bricks.length===0) return null;
                  if(item.params.show==='onEmpty' && this.props.bricks.length>0) return null;
                  if(item.params.show==='onNonRunning' && this.props.bricks.filter(b => b.running).length) return null;
                  if(item.params.show==='onRunning' && !this.props.bricks.filter(b => b.running).length) return null;
                  return(
                  <MenuItem
                    key={index}
                    title={item.title}
                    subtitle={item.subtitle}
                    look={item.params.look}
                    onClick={() => {this.menuAction({type:item.action, menuItem:item, mysuper:this.props.super }); close()}} />
                )})}
               </div>
             </div>
            </div>
           </div>
           </div>
         )}}
      </Popup>
  )}
}

export default MenuModal
