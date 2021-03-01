import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import NumberFormat from 'react-number-format';
import {Box,Button,Container,TextField,makeStyles} from '@material-ui/core';
import Page from 'src/components/Page';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {connect} from 'react-redux'
import {set_userSalaryDetails_start,fetch_userdata_start} from 'src/store/action/User'

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SalaryForm = (props) => {
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
              Details Are Added
              {/* {props.SalaryDetails === undefined ? 'Details Are Added.' : 'Details Are Updated.'} */}
            </Alert>
          </Snackbar>
        </div>
      )
  }

  const handleClick = () => {
      setOpen(true);
  };

  let salaryinfodata = null 
  if(props.SalaryDetails !== null && props.SalaryDetails !== undefined ){
    salaryinfodata = {
      bankname : props.SalaryDetails["BankName"],
      accountno : props.SalaryDetails["Account No."],
      pfaccountno : props.SalaryDetails["PFAccount No."],
      ifsccode : props.SalaryDetails["IFSC Code"],
      esino : props.SalaryDetails["ESI No."],
    }
  }else{
    salaryinfodata = {
      bankname : '',
      accountno : '',
      pfaccountno : '',
      ifsccode : '',
      esino : ''
    }
  }

  return (
    <>
      <Page className={classes.root} title="Register">
      <Box display="flex" flexDirection="column" height="100%" justifyContent="left">
        <Container>
          <Formik initialValues={salaryinfodata}
            validationSchema={
              Yup.object().shape({
                bankname: Yup.string().max(255).required('Bank Name is required'),
                accountno : Yup.string().max(22).required('Bank Account no is required'),
                pfaccountno : Yup.string().max(25).required('PF Account no is required'),
                ifsccode :Yup.string().max(12).required('IFSC Code is required'),
                esino :Yup.string().max(30).required('ESI No is required')
              })
            }
            onSubmit={(values) => {
                const data =  {
                  bankname : values.bankname,
                  accountno : values.accountno,
                  pfaccount_no : values.pfaccountno,
                  ifsccode : values.ifsccode,
                  esi_no : values.esino
                }
                console.log(data)
                setData(data)
                props.OnSetUserSalaryData(data,props.token)
            }}>

            {({errors, handleBlur, handleChange, handleSubmit,touched,values}) => (
              <form onSubmit={handleSubmit}>
                <NumberFormat
                  customInput ={TextField}
                  fullWidth
                  format="#### #### #### ####"
                  error={Boolean(touched.accountno && errors.accountno)}
                  helperText={touched.accountno && errors.accountno}
                  label="Account Number"
                  margin="dense"
                  name="accountno"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.accountno}
                  variant="outlined"
                />
                 <TextField
                  error={Boolean(touched.bankname && errors.bankname)}
                  fullWidth
                  helperText={touched.bankname && errors.bankname}
                  label="Bank Name"
                  margin="dense"
                  name="bankname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bankname}
                  variant="outlined"
                />
               <NumberFormat
                  customInput ={TextField}
                  fullWidth
                  format="##/###/#######/#######"
                  error={Boolean(touched.pfaccountno && errors.pfaccountno)}
                  helperText={touched.pfaccountno && errors.pfaccountno}
                  label="PF Account Number"
                  margin="dense"
                  name="pfaccountno"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.pfaccountno}
                  variant="outlined"
                />
                <NumberFormat
                  customInput ={TextField}
                  fullWidth
                  format="##–##–######–###–####"
                  error={Boolean(touched.esino && errors.esino)}
                  helperText={touched.esino && errors.esino}
                  label="ESI Number"
                  margin="dense"
                  name="esino"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.esino}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  error={Boolean(touched.ifsccode && errors.ifsccode)}
                  helperText={touched.ifsccode && errors.ifsccode}
                  label="BANK IFSC Number"
                  margin="dense"
                  name="ifsccode"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ifsccode}
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
      SalaryDetails :  state.user.employee.Employee["Salary Details"][0]
      
  }
}

const maptodispatch = (dispatch) =>{
  return{
    OnFetchUserData : (token) => dispatch(fetch_userdata_start(token)),
    OnSetUserSalaryData : (data,token) => dispatch(set_userSalaryDetails_start(data,token))
  }
}

export default connect(maptostate,maptodispatch)(SalaryForm);
