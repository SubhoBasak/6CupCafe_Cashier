import React from "react";
import { Modal, Button } from "react-bootstrap";

const ComboList = (props) => {
  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>Combo List</Modal.Title>
      </Modal.Header>
      <textarea className="modal-content border-0 px-3 fs-5" rows="10" readOnly>
        {props.note}
      </textarea>
      <Modal.Footer>
        <Button variant="danger" onClick={props.close}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ComboList;
