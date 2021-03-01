import React, {useState} from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, Container, TextField, makeStyles } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import {connect} from 'react-redux'
import Page from 'src/components/Page';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import {set_userPersonalDetails_start,fetch_userdata_start} from 'src/store/action/User'


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Form = (props) => {
    
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [data,setData] = useState(null)

    React.useEffect(() =>{
      props.OnFetchUserData(props.token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data])

    const handleClick = () => {
      setOpen(true);
    };

    let userdata = null
    if(props.PersonDetails !== null && props.PersonDetails !== undefined){
      userdata ={ 
        firstName: props.PersonDetails.FirstName,
        lastName: props.PersonDetails.LastName,
        email: props.PersonDetails.Email,
        gender : props.PersonDetails.Gender,
        dob :props.PersonDetails.DateofBirth,
        bloodgroup : props.PersonDetails.BloodGroup,
        contactno :props.PersonDetails['Contact No.'],
        pancardno :props.PersonDetails['PanCard No.'],
        aadharcardno :props.PersonDetails['AadharCard No.'],
        profile :''
      }    
    }else{
      userdata = { 
        firstName: '',
        lastName: '',
        email: '',
        gender : '',
        dob :'',
        bloodgroup : '',
        contactno :'',
        pancardno :'',
        aadharcardno :'',
        profile :''
      }
    }

    let show = null
    if(open){
      show = (
        <div className={classes.root}>
          <Snackbar open={open} anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={2000} onClose={() => setOpen(false)}>
            <Alert onClose={() => setOpen(false)} severity="success">
              Details Are Added.
              {/* {props.PersonDetails === undefined ? 'Details Are Added.' : 'Details Are Updated.'} */}
            </Alert>
          </Snackbar>
        </div>
      )
    }

  return (
    <>
    <Page className={classes.root} title="Dashboard">
      <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
        <Container>
          <Formik initialValues={userdata}
            validationSchema={
              Yup.object().shape({
                firstName: Yup.string().max(255).required('First name is required'),
                lastName: Yup.string().max(255).required('Last name is required'),
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                gender : Yup.string().max(8).required('Gender is required'),
                dob : Yup.string().required('DOB is required'),
                bloodgroup : Yup.string().max(5).required('BloodGroup is required'), 
                contactno : Yup.string().max(11).required('Contact No is required'),
                pancardno : Yup.string().max(10).required('Pancard No is required'),
                aadharcardno : Yup.string().max(22).required('Aadharcard is required'),
                profile : Yup.string().matches(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i,"Invalid Image Formate")
              })}

              onSubmit={(values) => {
                const data = {
                  firstname: values.firstName,
                  lastname: values.lastName,
                  gender: values.gender,
                  dob: values.dob,
                  bloodgroup: values.bloodgroup,
                  email: values.email,
                  contactno: values.contactno,
                  pancardno: values.pancardno,
                  aadharcardno: values.aadharcardno
                }
                setData(data)
                props.OnSetUserData(data,props.token)
              }}>

            {({errors,handleBlur, handleChange,handleSubmit,touched,values}) => (
              <form onSubmit={handleSubmit} name="personadetails">
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  // fullWidth={false}
                  helperText={touched.firstName && errors.firstName}
                  label="First name"
                  margin="dense"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  variant="outlined"
                  style={{marginRight:'10px',width:'45%'}}
                />
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth={false}
                  helperText={touched.lastName && errors.lastName}
                  label="Last name"
                  margin="dense"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  variant="outlined"
                  style={{width:'45%'}}
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="dense"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                  style={{width:'45%',marginRight:'10px'}}
                />
                <TextField
                  error={Boolean(touched.contactno && errors.contactno)}
                  helperText={touched.contactno && errors.contactno}
                  label="Contact Number"
                  margin="dense"
                  name="contactno"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="number"
                  value={values.contactno}
                  variant="outlined"
                  style={{width:'45%'}}
               />
                <TextField
                  error={Boolean(touched.gender && errors.gender)}
                  helperText={touched.gender && errors.gender}
                  label="gender"
                  margin="dense"
                  name="gender"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.gender}
                  variant="outlined"
                  style={{width:'45%',marginRight:'10px'}}
                />
                <TextField
                  error={Boolean(touched.bloodgroup && errors.bloodgroup)}
                  helperText={touched.bloodgroup && errors.bloodgroup}
                  label="Blood Group"
                  margin="dense"
                  name="bloodgroup"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.bloodgroup}
                  variant="outlined"
                  style={{width:'45%'}}
                />
                <TextField
                  error={Boolean(touched.pancardno && errors.pancardno)}
                  helperText={touched.pancardno && errors.pancardno}
                  label="Pancard Number"
                  margin="dense"
                  name="pancardno"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.pancardno}
                  variant="outlined"
                  style={{width:'45%',marginRight:'10px'}}
                />
                <NumberFormat
                  customInput ={TextField}
                  format="#### #### ######"
                  error={Boolean(touched.aadharcardno && errors.aadharcardno)}
                  helperText={touched.aadharcardno && errors.aadharcardno}
                  label="Aadharcard Number"
                  margin="dense"
                  name="aadharcardno"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.aadharcardno}
                  variant="outlined"
                  style={{width:'45%'}}
                />
                <TextField
                  margin="dense"
                  name="dob"
                  label="Birth Date"
                  InputLabelProps={{ shrink: true }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="date"
                  value={values.dob}
                  variant="outlined"
                  style={{width:'45%',marginRight:'10px'}}
                />
                <TextField
                  error={Boolean(touched.profile && errors.profile)}
                  helperText={touched.profile && errors.profile}
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                  name="profile"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="file"
                  label="Profile"
                  value={values.profile}
                  variant="outlined"
                  style={{width:'45%'}}
                />                 
                <Box my={2}>
                  <Button color="primary" size="small" type="submit" variant="contained" onClick={handleClick}>Save</Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
    {show}
    </>
  );
};

const maptostate = (state) =>{
  return {
      // username : state.user.employee.username,
      token : state.auth.token,
      PersonDetails : state.user.employee.Employee["Person Details"][0]
  }
}

const maptodispatch = (dispatch) =>{
  return{
    OnFetchUserData : (token) => dispatch(fetch_userdata_start(token)),
    OnSetUserData : (data,token) => dispatch(set_userPersonalDetails_start(data,token))
  }
}

export default connect(maptostate,maptodispatch)(Form);

