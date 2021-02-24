import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, Container, FormHelperText, TextField, makeStyles} from '@material-ui/core'
import Page from 'src/components/Page';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {connect} from 'react-redux'
import {set_userQualificationDetails_start,fetch_userdata_start} from 'src/store/action/User'


const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const QualificationForm = (props) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [data,setData] = React.useState(null)

  React.useEffect(() =>{
    props.OnFetchUserData(props.token)
  },[data])

  let show = null
  if(open){
      show = (
        <div className={classes.root}>
          <Snackbar open={open} anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={2000} onClose={() => setOpen(false)}>
            <Alert onClose={() => setOpen(false)} severity="success">
              {props.QualificationDetails === undefined ? 'Details Are Added.' : 'Details Are Updated.'}
            </Alert>
          </Snackbar>
        </div>
      )
  }

  const handleClick = () => {
      setOpen(true);
  };


  let userqualificationdata = null
  if(props.QualificationDetails !== null && props.QualificationDetails !== undefined){
    userqualificationdata = { 
        qualification : props.QualificationDetails["Qualification"],
        passyear  : props.QualificationDetails["Passing Year"],
        experience : props.QualificationDetails["Work Experience"],
      }
  }else{
    userqualificationdata = { 
        qualification : '',
        passyear  : '',
        experience : ''
      }
  }

  return (
    <>
      <Page className={classes.root} title="Register" >
      <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
        <Container maxWidth="sm">
          <Formik
            initialValues={userqualificationdata}
            validationSchema={
              Yup.object().shape({
                qualification: Yup.string().max(255).required('Qualification is required'),
                experience : Yup.string().max(2).required('Experience no is required'),
                passyear : Yup.string().max(4).required('Passing Year no is required'),
              })}

            onSubmit={(values) => {
                const data = {
                  qualification : values.qualification,
                  pass_year : values.passyear,
                  experience : values.experience
                }
                setData(data)
                props.OnSetUserQualification(data,props.token)
            }}>

            {({errors,handleBlur,handleChange,handleSubmit,touched,values}) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  error={Boolean(touched.qualification && errors.qualification)}
                  fullWidth
                  helperText={touched.qualification && errors.qualification}
                  label="Qualification"
                  margin="dense"
                  name="qualification"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.qualification}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  error={Boolean(touched.experience && errors.experience)}
                  helperText={touched.experience && errors.experience}
                  label="Experience"
                  margin="dense"
                  name="experience"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="number"
                  value={values.experience}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  error={Boolean(touched.passyear && errors.passyear)}
                  helperText={touched.passyear && errors.passyear}
                  label="College Passing Year"
                  margin="dense"
                  name="passyear"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="number"
                  value={values.passyear}
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
  return {
      token : state.auth.token,
      QualificationDetails : state.user.employee.Employee["Qualification Details"][0]

    }
}

const maptodispatch = (dispatch) =>{
  return{
    OnFetchUserData : (token) => dispatch(fetch_userdata_start(token)),
    OnSetUserQualification : (data,token) => dispatch(set_userQualificationDetails_start(data,token))
  }
}

export default connect(maptostate,maptodispatch)(QualificationForm);
