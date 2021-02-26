import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {connect} from 'react-redux'

function generatePassword() {
    let length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

function AddEmployeeModel({
  handlechange,
  handlecancle,
  show,
  submit,
  designations,
  loginrole,
  error
  }) {
  console.log(designations)
 
  const Adminrole =[
    {'role' : 'Hr'},
    {'role' : 'Employee'}   
  ]

  const HrRole = [
    {'role' : 'Employee'}   
  ]

  return (
    <div>
      <Dialog open={show} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" >Add Employee</DialogTitle>
        {/* {error !== null 
        ? <Alert variant="outlined" severity="error">
            {error}
          </Alert>
        : null} */}
        <form onSubmit={submit}>
          <DialogContent>
              <TextField
                  margin="dense"
                  fullWidth
                  label="Username"
                  name="username"
                  onChange={handlechange}
                  variant="outlined"
                  required
              />
              <TextField
                  margin="dense"
                  fullWidth
                  label="Password"
                  name="password"
                  InputLabelProps={{ shrink: true }}
                  disabled
                  value={generatePassword()}
                  onChange={handlechange}
                  variant="outlined"
                  required
              />
              <TextField
                  margin="dense"
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handlechange}
                  variant="outlined"
                  required
              />
              
              <FormControl style={{margin:'10px auto'}} variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                    <Select
                      name="role"
                      id="demo-role"
                      onChange={handlechange}
                      label="Role"
                      required
                    >
                    {loginrole !== 'Admin' 
                    ? HrRole.map((val,index)=>(
                      <MenuItem key={index} value={val.role}>{val.role}</MenuItem>  
                    ))
                    : Adminrole.map((val,index)=>(
                      <MenuItem key={index} value={val.role}>{val.role}</MenuItem>  
                    ))}
                  </Select>
              </FormControl>

              <FormControl style={{margin:'10px auto'}} variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">Designation</InputLabel>
                    <Select
                      name="designation"
                      id="demo-desg"
                      onChange={handlechange}
                      label="Designation"
                      required
                    >
                    
                    {/* dynamic */}
                    {designations.map((val,index) =>(
                      <MenuItem key={index} value={val.Designation}>{val.Designation}</MenuItem>
                    ))}
                  </Select>
              </FormControl>

                <TextField
                  margin="dense"
                  fullWidth
                  label="Joining Date"
                  name="joiningdate"
                  type="date"
                  onChange={handlechange}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  required
                />

          </DialogContent>
          <DialogActions>
          <Button type="submit" color="primary">
            Add
          </Button>
          <Button color="primary" onClick={handlecancle}>
            Cancle
          </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

const maptostate = state => {
  return {
    loginrole : state.auth.role,
    designations : state.admin.designation.designation
  }
}
export default connect(maptostate)(AddEmployeeModel)