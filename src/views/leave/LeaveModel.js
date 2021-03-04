import React from 'react';
import Grid from '@material-ui/core/Grid'
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

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';


export default function LeaveModel(props) {
  return (
    <>
      <Dialog open={props.open} aria-labelledby="form-dialog-title" fullWidth  maxWidth="sm">
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
                      required
                  >
                      <MenuItem value="none"><em>Select Leave Type</em></MenuItem>
                      <MenuItem value={'SL'}>SL</MenuItem>
                      <MenuItem value={'CL'}>CL</MenuItem>
                      <MenuItem value={'PL'}>PL</MenuItem>
                      <MenuItem value={'LWP'}>LWP</MenuItem>
                  </Select>
              </FormControl>
              
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      disableToolbar
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      variant="dialog"
                      format="dd/MM/yyyy"
                      name="startdate"
                      margin="normal"
                      label="Start Date"
                      value={props.post.startdate}
                      onChange={props.startdatehandlechange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      disableToolbar
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      variant="dialog"
                      format="dd/MM/yyyy"
                      name="enddate"
                      margin="normal"
                      label="End Date"
                      value={props.post.enddate}
                      onChange={props.enddatehandlechange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>

              <TextField
                  margin="dense"
                  id="name"
                  required={true}
                  multiline
                  name='desc'
                  rows={5}
                  onChange={props.onChangeHandler}
                  variant="outlined"
                  value={props.post.desc}
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
    </>
  );
}


