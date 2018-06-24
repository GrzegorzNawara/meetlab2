import React from 'react'
import Popup from 'reactjs-popup'
import { graphql, compose } from 'react-apollo'
import uuidV4 from 'uuid/v4'
import MenuItem from './MenuItem'
import { createBrick } from './graphql/Mutations'
import { listBricks, getKey } from './graphql/Queries'
import { MenuConfig } from './include/menuConfig'
import debug from './include/debug'

class MenuModal extends React.Component {
  menuAction = ({type, menu, mysuper }) => {
    const newBrick = {
      id: uuidV4(),
      super: (mysuper)?mysuper:'top',
      sort: Date.now().toString(),
      title: menu.params.title,
      subtitle: menu.params.subtitle,
      date: new Date().toISOString().split("T")[0],
      owner: this.props.me.owner,
      params: JSON.stringify(menu.params),
      PIN: Math.floor(8999*Math.random()+1000),
      type: 'UNKNOWN'
    }

    switch (type) {
      case 'ADD_WORKSHOP':
        this.props.onAdd({
          ...newBrick,
          type: 'WORKSHOP'
        });
        break;
      case 'ADD_DOCUMENT':
        this.props.onAdd({
          ...newBrick,
          type: 'DOCUMENT'
        });
        break;
      case 'ADD_BRICK':
        this.props.onAdd({
          ...newBrick,
          type: 'BRICK'
        });
        break;
      default:
        return (null);
    }
  }

  render() {
    if(this.props.me===undefined) return null;
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
                    onClick={() => {this.menuAction({type:item.action, menu:item, mysuper:this.props.match.params.super }); close()}} />
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
        variables: brick,
        optimisticResponse: {
          __typename: 'Mutation',
          createBrick: { ...brick,  __typename: 'Brick' }
        }
      })
  })}),
  graphql(getKey, {
    options: props => ({
      variables: { id: localStorage.getItem('key') },
      fetchPolicy: 'cache-and-network'
    }),
    props: props => ({
      me: props.data.getKey
    })
  })
)(MenuModal)
