import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';


import DialogTitle from '@material-ui/core/DialogTitle';

export default function LeaveModel(props) {

  return (
    <div>
      <Dialog open={props.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Apply For Leave</DialogTitle>
        <form onSubmit={props.submit}>
          <DialogContent>
              <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">Leave Type</InputLabel>
                  <Select
                      name="ltype"
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={props.onChangeHandler}
                      label="LeaveType"
                      autoFocus
                      required
                  >
                      <MenuItem value="none"><em>Select Leave Type</em></MenuItem>
                      <MenuItem value={'SL'}>SL</MenuItem>
                      <MenuItem value={'CL'}>CL</MenuItem>
                      <MenuItem value={'PL'}>PL</MenuItem>
                      <MenuItem value={'LWP'}>LWP</MenuItem>
                  </Select>
              </FormControl>
              <TextField
                  margin="dense"
                  fullWidth
                  label="Start Date"
                  InputLabelProps={{ shrink: true }}
                  name="startdate"
                  onChange={props.onChangeHandler}
                  type="date"
                  required
                  variant="outlined"
                  style={{marginTop:'10px'}}
              />
              <TextField
                  margin="dense"
                  fullWidth
                  required
                  label="End Date"
                  InputLabelProps={{ shrink: true }}
                  name="enddate"
                  onChange={props.onChangeHandler}
                  type="date"
                  placeholder="End Date"
                  variant="outlined"
              />
              <TextField
                  margin="dense"
                  id="name"
                  required={true}
                  multiline
                  name='desc'
                  rows={5}
                  onChange={props.onChangeHandler}
                  variant="outlined"
                  label="Description"
                  fullWidth
                  autoFocus = {false}
              />

          </DialogContent>
          <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Apply
          </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}


