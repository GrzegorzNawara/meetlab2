import React from 'react'
import Popup from 'reactjs-popup'
import { graphql, compose } from 'react-apollo'
import uuidV4 from 'uuid/v4'
import MenuItem from './components/MenuItem'
import { createBrick, deleteBrick } from './graphql/Mutations'
import { listBricks } from './graphql/Queries'
import { MenuConfig } from './config/AppConfig'
import debug from './debug'

class MenuModal extends React.Component {
  menuAction = ({type, menuItem, mysuper }) => {
    const newBrick = {
      id: uuidV4(),
      super: (mysuper)?mysuper:'top',
      sort: Date.now().toString(),
      title: menuItem.title,
      subtitle: menuItem.subtitle,
      date: new Date().toISOString().split("T")[0],
      owner: localStorage.getItem('mg'),
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
        fetch('http://api.ignifer-labs.com/raven/api_init_game.php?game_id='+newBrick.id+'&billing_user_id='+newBrick.owner+'&game_title='+newBrick.title, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }).then((response) => response.json());
        this.props.onAdd({
          ...newBrick,
          title:(!this.props.bricks)?0:
            this.props.bricks.filter((b)=>b.type==='RAVEN').length+1,
          type: 'RAVEN'
        });
        break;
      case 'ADD_MIR':
        this.props.onAdd({
          ...newBrick,
          type: 'MIR'
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
      case 'CLEAR_WORKSHOP':
        this.props.bricks.forEach((r,i) => {
          this.props.onDelete({...this.props.bricks[i]});
        });
        break;
      default:
        return (null);
    }
  }

  render() {
    if(!localStorage.getItem('mg')) return null;
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
                {((this.props.match.params.super)?MenuConfig.workshopMenu:MenuConfig.topMenu)
                  .map((item,index)=>{return(
                  <MenuItem
                    key={index}
                    title={item.title}
                    subtitle={item.subtitle}
                    look={item.params.look}
                    onClick={() => {this.menuAction({type:item.action, menuItem:item, mysuper:this.props.match.params.super }); close()}} />
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

export default compose(
  graphql(createBrick, {
    props: props => ({
      onAdd: (brick) => props.mutate({
        variables: debug(brick,'NEW BRICK'),
        optimisticResponse: {
          __typename: 'Mutation',
          createBrick: { ...brick,  __typename: 'Brick' }
        },
        update: (proxy, { data: { createBrick } }) => {
          const data = proxy.readQuery({ query: listBricks, variables: { super: createBrick.super } });
          data.listBricks.items.push(createBrick);
          proxy.writeQuery({ query: listBricks, variables: { super: createBrick.super }, data });
        }
      })
  })}),
  graphql(deleteBrick, {
    props: props => ({
      onDelete: (brick) => props.mutate({
        variables: { id: brick.id },
        optimisticResponse: {
          __typename: 'Mutation',
          deleteBrick: { ...brick,  __typename: 'Brick' }
        },
        update: (proxy, { data: { deleteBrick } }) => {
          const data = proxy.readQuery({ query: listBricks, variables: { super: deleteBrick.super } });
          data.listBricks.items=[]; //.filter((r)=>(r.id!==deleteBrick.id));
          proxy.writeQuery({ query: listBricks, variables: { super: deleteBrick.super }, data });
        }
      })
  })}),
  graphql(listBricks, {
    options: props => ({
      variables: { super: props.match.params.super },
      fetchPolicy: 'cache-and-network'
    }),
    props: props => ({
      getProps: { ...props },
      bricks: props.data.listBricks?props.data.listBricks.items
        .slice().sort((a,b)=>(-a.sort.localeCompare(b.sort))):[]
    })
  })
)(MenuModal)
