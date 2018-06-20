import React from 'react'
import Popup from 'reactjs-popup'
import { graphql } from 'react-apollo'
import uuidV4 from 'uuid/v4'
import MenuItem from './MenuItem'
import createBrick from './mutations/CreateBrick'
//import listBricks from './queries/ListBricks'
import debug from './include/debug'

class MenuModal extends React.Component {

  addBrick = ({mysuper}) => {

    (mysuper)?
      this.props.onAdd({
        id: uuidV4(),
        super: mysuper,
        sort: Date.now().toString(),
        title: 'Brick',
        subtitle: 'Brickeee 1',
        date: new Date().toISOString().split("T")[0],
        owner: 'Grzegorz Nawara',
        PIN: '1111'
      }):
      this.props.onAdd({
        id: uuidV4(),
        super: 'top',
        sort: Date.now().toString(),
        title: 'New Workshop',
        subtitle: 'Subtitle',
        date: new Date().toISOString().split("T")[0],
        owner: 'Grzegorz Nawara',
        PIN: '1234'
      })
  }

  render() { return (
      <Popup trigger={<div className="admin-button"><img src='./images/admin-button.png' alt=''/></div>}
         modal closeOnDocumentClick>
         {close => (
           <div className="modal-popup">
             <div className="modal-header" onClick={close}>
               <h4 className="modal-title">MENU</h4>
               <button type="button" className="color-gray close" onClick={close}>&times;</button>
             </div>
             <div className="modal-body">
               <div className="">
                <MenuItem
                  title='Add new brick'
                  subtitle='It will stay hidden'
                  onClick={() => {this.addBrick({mysuper:this.props.match.params.super}); close()}} />
               </div>
             </div>
           </div>
         )}
      </Popup>
  )}
}

export default graphql(createBrick, {
  props: props => ({
    onAdd: (brick) => props.mutate({
      variables: brick,
      optimisticResponse: {
        __typename: 'Mutation',
        createBrick: { ...brick,  __typename: 'Brick' }
      },
      update: (proxy, { data: { createBrick } }) => {
        //const data = proxy.readQuery({ query: listBricks });
        //data.listBricks.items.push(createBrick);
        //proxy.writeQuery({ query: listBricks, data });
      }
    })
  })
})(MenuModal)
