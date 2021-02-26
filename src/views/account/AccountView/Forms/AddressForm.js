import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, Container, TextField,makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {connect} from 'react-redux'
import {set_userAddressDetails_start,fetch_userdata_start} from 'src/store/action/User'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const AddressForm = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [data,setData] = React.useState(null)

  React.useEffect(() =>{
    props.OnFetchUserData(props.token)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data])

  let show = null
  if(open){
      show = (
        <div className={classes.root}>
          <Snackbar open={open} anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={2000} onClose={() => setOpen(false)}>
            <Alert onClose={() => setOpen(false)} severity="success">
              Details Are Added.
              {/* {props.AddressDetails === undefined ? 'Details Are Added.' : 'Details Are Updated.'} */}
            </Alert>
          </Snackbar>
        </div>
      )
  }

  const handleClick = () => {
      setOpen(true);
  };

  let initaddressdetails = null
  if(props.AddressDetails !== null && props.AddressDetails !== undefined){
    initaddressdetails = { 
      city : props.AddressDetails.city,
      state : props.AddressDetails.state,
      pincode : props.AddressDetails.pincode,
      fulladdress : props.AddressDetails.address,
    }
  }else{
    initaddressdetails = { 
      city : '',
      state : '',
      pincode : '',
      fulladdress : '',
    }
  }

  return (
    <>
     <Page className={classes.root} title="Register">
      <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
        <Container maxWidth="sm">
          <Formik
            initialValues={initaddressdetails}
            validationSchema={
              Yup.object().shape({
                city: Yup.string().max(255).required('city is required'),
                state: Yup.string().max(255).required('state is required'),
                pincode : Yup.string().max(11).required('pincode no is required'),
                fulladdress: Yup.string().max(255).required('current Address is required'),
              })
            }

            onSubmit={(values) => {
                const data = {
                    city : values.city,
                    state : values.state,
                    pincode : values.pincode,
                    fulladdress : values.fulladdress,
                }
                setData(data)
                props.OnSetUserAddressData(data,props.token)
            }}>

            {({errors,handleBlur,handleChange,handleSubmit,isSubmitting,touched,values}) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  error={Boolean(touched.city && errors.city)}
                  helperText={touched.city && errors.city}
                  label="City"
                  margin="dense"
                  name="city"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.city}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  error={Boolean(touched.state && errors.state)}
                  helperText={touched.state && errors.state}
                  label="State"
                  margin="dense"
                  name="state"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.state}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  error={Boolean(touched.pincode && errors.pincode)}
                  helperText={touched.pincode && errors.pincode}
                  label="Pincode"
                  margin="dense"
                  name="pincode"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.pincode}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  error={Boolean(touched.fulladdress && errors.fulladdress)}
                  helperText={touched.fulladdress && errors.fulladdress}
                  label="Current Address"
                  margin="dense"
                  name="fulladdress"
                  multiline
                  rows={4}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fulladdress}
                  variant="outlined"
                />
                
                <Box my={2}>
                  <Button color="primary" size="small" type="submit" variant="contained" onClick={handleClick}>
                     Save
                  </Button>
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
  // console.log(state.user.employee.Employee["Address Details"])
  return {
      token : state.auth.token,
      AddressDetails : state.user.employee.Employee["Address Details"][0]
      
  }
}

const maptodispatch = (dispatch) =>{
  return{
    OnFetchUserData : (token) => dispatch(fetch_userdata_start(token)),
    OnSetUserAddressData : (data,token) => dispatch(set_userAddressDetails_start(data,token))
  }
}

export default connect(maptostate,maptodispatch)(AddressForm);
