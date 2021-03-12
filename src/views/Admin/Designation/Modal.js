import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Box,
  TextField,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function MaxWidthDialog(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Add Designation</DialogTitle>
        <DialogContent>
          <form onSubmit={props.adddesignation}>
            <CardContent>
              <TextField
                fullWidth
                label="New Designation"
                margin="normal"
                required
                name="designation"
                onChange={props.onChageHandle}
                type="text"
                value={props.post.designation}
                variant="outlined"
                disabled={props.post.designation !== ""}
                style={{ marginRight: "10px" }}
              />
              <TextField
                fullWidth
                label="Basic"
                margin="normal"
                name="basic"
                required
                type="number"
                onChange={props.onChageHandle}
                value={props.post.basic}
                variant="outlined"
              />
            </CardContent>
            <DialogActions>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
