import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from '@material-ui/core';
import {connect} from 'react-redux'
import {change_password} from 'src/store/action/User'

const Password = (props) => {
  const [show,setShow] = React.useState(false)
  
  const [currentpass,setCurrentPass] = React.useState('')
  const [newpass,setNewPass] = React.useState('')
  const [confirmpass,setConfirmPass] = React.useState('')

  const [currerror,setCurrError] = React.useState('')
  const [showcurrerror,setShowCurrError] = React.useState(false)
  
  const [error,setError] = React.useState('')
  const [showerror,setShowError] = React.useState(false)

  const [confirmerror,setConfirmError] = React.useState('')
  const [showconfirmerror,setShowConfError] = React.useState(false)
  
  const changepass = (e) =>{
    e.preventDefault()
    const data = {password : newpass}
    console.log(data)
    setShow(true)
    props.OnChangePassword(data,props.token)

    setCurrentPass('')
    setNewPass('')
    setConfirmPass('')
  }

  const checkcurrentpass = (e) =>{
      if(e.target.value !== props.password){
         setCurrError('Current Password Invalid')
         setShowCurrError(true)
         setCurrentPass(e.target.value)
      }else{
        setCurrError('')
        setShowCurrError(false)
        setCurrentPass(e.target.value)
      }
  }

  const errorcheckconfirm = (e) =>{
    if(e.target.value !== newpass){
      setShowConfError(true)
      setConfirmPass(e.target.value)
      setConfirmError('New Password and Confirm Password should be same')
    }else{
      
      setConfirmPass(e.target.value)
      setShowConfError(false)
      setConfirmError('')
    }
  }

  const errorcheck = (e) =>{
    if(currentpass !== e.target.value){
      setNewPass(e.target.value)
      setShowError(false)
      setError('')
    }else{
      setNewPass(e.target.value)
      setShowError(true)
      setError('New Password Should be Different from older one.')
    }
 
  }

  let showsnak = null
  if(show){
      showsnak = (
        <div>
          <Snackbar open={show} anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={2000} onClose={() => setShow(false)}>
            <Alert severity="success">
              Password Change Succesfully.
            </Alert>
          </Snackbar>
        </div>
      )
  }

  return (
    <>
    <form onSubmit={changepass}>
      <Card>
        <CardHeader title="Update Password"/>
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Current Password"
            margin="normal"
            required
            name="cpass"
            onChange={checkcurrentpass}
            type="password"
            helperText={currerror}
            error={showcurrerror}
            value={currentpass}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="New Password"
            margin="normal"
            name="password"
            required
            onChange={errorcheck}
            helperText={error}
            error={showerror}
            type="password"
            value={newpass}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            required
            onChange={errorcheckconfirm}
            helperText={confirmerror}
            error={showconfirmerror}
            type="password"
            value={confirmpass}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={showconfirmerror || showerror || showcurrerror}
          >
            Update
          </Button>
        </Box>
      </Card>
    </form>
    {showsnak}
    </>
  );
};

const maptostate = state =>{
  return {
    token : state.auth.token,
    password : state.user.employee.Employee.Password
  }
}

const maptodispatch = dispatch =>{
  return {
    OnChangePassword : (data,token) => dispatch(change_password(data,token))
  }
}
export default connect(maptostate,maptodispatch)(Password);
