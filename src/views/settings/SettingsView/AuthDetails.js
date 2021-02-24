import React, {useState} from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, Card,
  CardContent,
  CardHeader,
  Divider, TextField, makeStyles } from '@material-ui/core';
import {connect} from 'react-redux'
import Page from 'src/components/Page';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import {set_userPersonalDetails_start,fetch_userdata_start} from 'src/store/action/User'


const useStyles = makeStyles((theme) => ({
  root: {
  }
}));

const AuthDetails = (props) => {
    
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    React.useEffect(() =>{
    //   props.OnFetchUserData(props.token)
    },[])

    const handleClick = () => {
      setOpen(true);
    };

    let Employeedata = null
    if(props.PersonDetails !== undefined){
      Employeedata ={ 
        firstName: '',
        lastName: '',
      }    
    }else{
      Employeedata = { 
        firstName: '',
        lastName: '',
      }
    }

    let show = null
    if(open){
      show = (
        <div className={classes.root}>
          <Snackbar open={open} anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={2000} onClose={() => setOpen(false)}>
            <Alert onClose={() => setOpen(false)} severity="success">
              {props.PersonDetails === undefined ? 'Details Are Added.' : 'Details Are Updated.'}
            </Alert>
          </Snackbar>
        </div>
      )
    }

  return (
    <>
      <Card>
        <CardHeader title="Employee Data"/>
        <Divider />
        <CardContent>
          <Formik initialValues={Employeedata}
            validationSchema={
              Yup.object().shape({
                firstName: Yup.string().max(255).required('First name is required'),
                lastName: Yup.string().max(255).required('Last name is required'),
              })}

              onSubmit={(values) => {
                const data = {
                  firstname: values.firstName,
                  lastname: values.lastName,
                }
                // props.OnSetUserData(data,props.token)
                // props.OnFetchUserData(props.token)
              }}>

            {({errors,handleBlur, handleChange,handleSubmit,touched,values}) => (
              <form onSubmit={handleSubmit} name="personadetails">
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  disabled
                  helperText={touched.username && errors.username}
                  label="Username"
                  margin="dense"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.joiningdate && errors.joiningdate)}
                  fullWidth
                  disabled
                  helperText={touched.joiningdate && errors.joiningdate}
                  label="Joining Date"
                  margin="dense"
                  name="joiningdate"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.joiningdate}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button color="primary" size="small" type="submit" variant="contained" onClick={handleClick}>Save</Button>
                </Box>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    {show}
    </>
  );
};

const maptostate = (state) =>{
  return {
      token : state.auth.token
  }
}

const maptodispatch = (dispatch) =>{
  return{
    OnFetchUserData : (token) => dispatch(fetch_userdata_start(token)),
    OnSetUserData : (data,token) => dispatch(set_userPersonalDetails_start(data,token))
  }
}

export default connect(maptostate,maptodispatch)(AuthDetails);

