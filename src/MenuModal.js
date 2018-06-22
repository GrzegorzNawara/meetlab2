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
    if(debug(this.props.me,'ME')===undefined) return null;
    return (
      <Popup trigger={<div className="admin-button"><img src='./images/admin-button.png' alt=''/></div>}
         modal lockScroll closeOnEscape closeOnDocumentClick position="right center">
         {close => {
           if(debug(this.state.super,'STATE')!==debug(this.props.match.params.super,'MATCH'))
            return null;

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
                 <MenuItem
                   title='Add new brick'
                   subtitle='It will stay hidden'
                   look='look-menu'
                   onClick={() => {this.addBrick({mysuper:this.props.match.params.super}); close()}} />
                {debug(this.props.menu,'MENUSHOW').map((item,index)=>{return(
                  <MenuItem
                    key={index}
                    title='Add new brick'
                    subtitle='It will stay hidden'
                    look='look-menu'
                    onClick={() => {this.addBrick({mysuper:this.props.match.params.super}); close()}} />
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
        },
        update: (proxy, { data: { createBrick } }) => {
          //const data = proxy.readQuery({ query: listBricks });
          //data.listBricks.items.push(createBrick);
          //proxy.writeQuery({ query: listBricks, data });
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
      variables: { super: 'top' },
      fetchPolicy: 'cache-and-network'
    }),
    props: props => ({
      menu: debug(props.data.listBricks,'MENULIST')?props.data.listBricks.items:[]
    })
  })
)(MenuModal)
