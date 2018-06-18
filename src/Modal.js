import React from 'react'
import MenuList from '../connectors/MenuList'
import CmdList from '../connectors/CmdList'
import EditWorkshopTitle from '../connectors/EditWorkshopTitle'
import debug from '../include/debug'

const Modal = ({ visible=true, title, onCloseClick, workshop_id }) => (
  (visible) ? (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header" onClick={onCloseClick}>
            <h4 className="modal-title">{title}</h4>
            <button type="button" className="color-gray close" onClick={onCloseClick}>&times;</button>
          </div>

          <div className="modal-body">
            <div className="container">
              <EditWorkshopTitle workshop_id={workshop_id} />
              <MenuList />
              <CmdList />
            </div>
          </div>

        </div>
      </div>
    </div>
  ) : null
)

export default Modal
