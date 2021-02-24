import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function TaskModel({
  handlechange,
  handlecancle,
  show,
  submit
  }) {
  return (
    <div>
      <Dialog open={show} aria-labelledby="form-dialog-title" onClose={() => handlecancle()}>
        <DialogTitle id="form-dialog-title" >Today's Task</DialogTitle>
        <form onSubmit={submit}>
          <DialogContent>
              <TextField
                  margin="dense"
                  fullWidth
                  label="Technology"
                  name="technology"
                  onChange={handlechange}
                  variant="outlined"
                  required={true}
              />
              <TextField
                  margin="dense"
                  fullWidth
                  label="Project Name"
                  name="projectname"
                  onChange={handlechange}
                  variant="outlined"
                  required
              />
              <TextField
                  margin="dense"
                  fullWidth
                  label="Wroking Hours"
                  name="hour"
                  type="number"
                  onChange={handlechange}
                  variant="outlined"
                  required
              />

              <TextField
                  margin="dense"
                  id="desc"
                  multiline
                  name="desc"
                  rows={5}
                  onChange={handlechange}
                  variant="outlined"
                  label="Task Detaild Description"
                  fullWidth
                  required
              />

          </DialogContent>
          <DialogActions>
          <Button type="submit" color="primary">
            Add
          </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
