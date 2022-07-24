import React from "react";
import { Modal, Button } from "react-bootstrap";
const ConfirmModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleCloseModal}>
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleNoClicked}>
          {props.btnCancel}
        </Button>
        <Button variant="primary" onClick={props.handleYesClicked}>
          {props.btnAction}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
