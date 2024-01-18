import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

function ConfrimDialogue(props) {
  return (
    <Dialog open={props.open} onClose={() => props.handleClose()}>
      <DialogTitle id="alert-dialog-title" style={{ padding: "20px 50px" }}>
        {props.msg}
      </DialogTitle>
      <DialogActions style={{ padding: "5px 20px 20px 0px" }}>
        <Button
          variant="contained"
          onClick={() => props.handleClose()}
          className="btn-danger text-white"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => props.action()}
          color="secondary"
          className="text-white"
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfrimDialogue;
