import React from 'react';
import { useNavigate,Navigate} from 'react-router-dom';
import * as Yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Formik } from 'formik';
import {Avatar,Box,Button,Container,TextField,makeStyles} from '@material-ui/core';
import {connect} from 'react-redux'
import Alert from '@material-ui/lab/Alert';

import {Auth} from '../../store/action/Auth'
import Page from 'src/components/Page'
import {fetch_userdata_start} from 'src/store/action/User'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();

  React.useEffect(() =>{
    if(props.role === 'Employee'){
       navigate('/employee/dashboard', { replace: true });
      }
      if(props.role === 'Hr'){
        navigate('/hr/dashboard', { replace: true });
      }
      if(props.role === 'Admin'){
         navigate('/admin/dashboard', { replace: true });
      } 

      //fetch all data when login 
      // if(props.token !== null){
      //   console.log('use effect')
      //   props.OnLoginFetchData(props.token)
      // }
      
  },[props.isAuthenticate])

  let error = null  
  console.log(error)
  if(props.serverFail){
    error = <Navigate to="/500" />
  }

  return (
    <>
    {error}
      <Page className={classes.root} title="Login">
        <Box display="flex" flexDirection="column" height="100%" justifyContent="center" >
         <Container maxWidth="xs">
          <Formik
            initialValues={{username: '',password: '' }}
            validationSchema={Yup.object().shape({
              username: Yup.string().max(255).required('Username is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            
            onSubmit={(values) => {
                props.onAuth(values.username,values.password)
            }}            
            >
            {({errors,handleBlur,handleChange,handleSubmit,isSubmitting,touched,values}) => (
              <>
                <Box display="flex" justifyContent="center"mb={5} >
                  <Avatar
                    style={{ height: '100px', width: '100px' }}
                    alt="logo"
                    src="/lanetlogo.png"
                  />
                </Box>
                
                {props.error !== null 
                ? <Alert variant="filled" severity="error">{props.error}</Alert>
                : null}
                
                <form onSubmit={handleSubmit}>
                  <TextField
                    error={Boolean(touched.username && errors.username)}
                    fullWidth
                    helperText={touched.username && errors.username}
                    label="Username"
                    margin="normal"
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  
                  <Box my={2}>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                    {isSubmitting 
                            ? props.error !== null ? 'Log in' : <CircularProgress style={{color:'white'}}color="primary" /> 
                            : 'Log in'}
        
                    </Button>
                  </Box>
                </form>
              </>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
    </>
  );
};

const maptostate = state =>{
  return {
    isAuthenticate : state.auth.token !== null,
    token: state.auth.token,
    role : state.auth.role,
    error : state.auth.error,
    serverFail : state.auth.Server_Error 
  }
}

const maptodispatch = dispatch =>{
  return {
    onAuth : (username,password) => dispatch(Auth(username,password)),
    OnLoginFetchData : (token) => dispatch(fetch_userdata_start(token))
  }
}

export default connect(maptostate,maptodispatch)(LoginView);
