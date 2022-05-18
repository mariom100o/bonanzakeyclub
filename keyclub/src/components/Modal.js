import React, { useEffect } from "react";
import "../styles/Modal.css";

const Modal = ({ isOpen, closeModal, children }) => {
  return (
    <>
      {isOpen ? (
        <>
          <div className="modal-background" onClick={() => closeModal()}></div>
          <div className="modal" style={{ textAlign: "center" }}>
            {children}
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
