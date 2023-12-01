import React from "react";
import ReactDOM from 'react-dom';


const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000,
  width: '400px',
  height: '400px',
  'border-radius': '12px',
  'box-shadow': 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  display: 'flex',
  overflow:'scroll'
  
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}



const Modal = ({ open, children, onClose }) => {
  if (!open) return null;

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div>
      <div style={OVERLAY_STYLES} onClick={handleClose} />
      <div style={MODAL_STYLES}>
        <div className="modal-content modalContainer">
          <button className="close" onClick={handleClose}>Close</button>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default Modal
