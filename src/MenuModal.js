import React from 'react'
import Popup from 'reactjs-popup'
import { graphql } from 'react-apollo'
import uuidV4 from 'uuid/v4'
import MenuItem from './MenuItem'
import createWorkshop from './mutations/CreateWorkshop'
//import listWorkshops from './queries/ListWorkshops'
import debug from './include/debug'

class MenuModal extends React.Component {

  addWorkshop = () => {
    this.props.onAdd({
      id: uuidV4(),
      title: 'New Workshop 1',
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
           <div className="container">
             <div className="modal-header" onClick={close}>
               <h4 className="modal-title">MENU</h4>
               <button type="button" className="color-gray close" onClick={close}>&times;</button>
             </div>
             <div className="modal-body">
               <div className="container">
                <MenuItem
                  title='Add new workshop'
                  subtitle='It will stay hidden'
                  onClick={() => {this.addWorkshop(); close()}} />
               </div>
             </div>
           </div>
         )}
      </Popup>
  )}
}

export default graphql(createWorkshop, {
  props: props => ({
    onAdd: (workshop) => props.mutate({
      variables: workshop,
      optimisticResponse: {
        __typename: 'Mutation',
        createWorkshop: { ...workshop,  __typename: 'Workshop' }
      },
      update: (proxy, { data: { createWorkshop } }) => {
        //const data = proxy.readQuery({ query: listWorkshops });
        //data.listWorkshops.items.push(createWorkshop);
        //proxy.writeQuery({ query: listWorkshops, data });
      }
    })
  })
})(MenuModal)
