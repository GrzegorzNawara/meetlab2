import React from 'react'
import Popup from 'reactjs-popup'
import { graphql, compose } from 'react-apollo'
import uuidV4 from 'uuid/v4'
import MenuItem from './MenuItem'
import { createBrick } from './graphql/Mutations'
import { listBricks, getKey } from './graphql/Queries'
import debug from './include/debug'

class MenuModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = { super: this.props.match.params.super };
  }

  componentDidUpdate () {
  }

  addBrick = ({mysuper}) => {

    (mysuper)?
      this.props.onAdd({
        id: uuidV4(),
        super: mysuper,
        sort: Date.now().toString(),
        title: 'Brick',
        subtitle: 'Brickeee 1',
        date: new Date().toISOString().split("T")[0],
        owner: this.props.me.owner,
        PIN: '1111'
      }):
      this.props.onAdd({
        id: uuidV4(),
        super: 'top',
        sort: Date.now().toString(),
        title: 'New Workshop',
        subtitle: 'Subtitle',
        date: new Date().toISOString().split("T")[0],
        owner: this.props.me.owner,
        PIN: '1234'
      })
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
                {this.props.menu.map((item,index)=>{return(
                  <MenuItem
                    key={index}
                    title={item.title}
                    subtitle={item.subtitle}
                    look='look-menu'
                    onClick={() => {this.addBrick({mysuper:item.super}); close()}} />
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
  }),
  graphql(listBricks, {
    options: props => ({
      variables: { super: props.match.params.super },
      fetchPolicy: 'cache-and-network'
    }),
    props: props => ({
      menu: [{super:props.ownProps.match.params.super, title:'Add brick', subtitle:'Menu '+props.ownProps.match.params.super}]
    })
  })
)(MenuModal)
