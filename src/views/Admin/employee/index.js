import React from 'react';
import { Container,Button,makeStyles} from '@material-ui/core';
import Page from 'src/components/Page';
import EmployeeList from './employeeList'
import Modal from './Modal'
import {connect} from 'react-redux'
import {add_employee,get_designations,fetch_employeedata_start} from 'src/store/action/Admin'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import format from "date-fns/format"


function generatePassword() {
    let length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
 

}));

const Employeedesh = (props) => {
  const classes = useStyles();
  
  const [open, setOpen] = React.useState(false);
  const [show,setShow] = React.useState(false)
  const [error,setError] = React.useState(null)
  const [call,setCall] = React.useState(false)
  const [employee,setEmployee] = React.useState({
    username : '',
    password : generatePassword(),
    role : '',
    email: '',
    designation :'',
    joiningdate: new Date()
  })

  const handleClick = () =>{setShow(true)}

  React.useEffect(()=>{
    setCall(false)
    props.OnFetchDesignation(props.token)
    props.OnFetchEmployeeData(props.token)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[call])

  const datehandlechange =(date) =>{
    
    setEmployee(prevstate =>({
      ...prevstate,
      joiningdate : date
    }))
    
  }

  const handlechange = (e) =>{ 
    
    const {name,value} = e.target
    setEmployee(prevstate =>({
      ...prevstate,
      [name] : value
    }))
  
  }

  const onclose = (e) =>{setShow(false)}
  
  const submit = (e) =>{
    
    e.preventDefault()
    setOpen(true)
    setShow(false)
  
    props.OnAddEmployee(employee,props.token)
    setCall(true)

    //remove values after add 
    setEmployee({
      username : '',
      password : generatePassword(),
      role : '',
      email: '',
      designation :'',
      joiningdate: new Date()
    })
    
  }

  let showsnak = null
  if(open){
      showsnak = (
        <div>
          <Snackbar open={open} anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={2000} onClose={() => setOpen(false)}>
            <Alert onClose={() => setOpen(false)} severity="success">
              {/* {props.AddressDetails === undefined ? 'Details Are Added.' : 'Details Are Updated.'} */}
              Employee Added..
            </Alert>
          </Snackbar>
        </div>
      )
  }

  let modal = null
  if(show){
    modal =<Modal 
    show={show} 
    submit={submit}
    error ={error}
    post={employee}
    datehandlechange={datehandlechange}
    handlecancle={onclose} 
    handlechange={handlechange} />
  }

  return (
    <>
    <Page className={classes.root} title="Employees">
      <Container style={{paddingTop:'15px'}}>
      {modal}
      <div>
          <Button variant="outlined" color="primary" onClick={handleClick}>Add Employee</Button>
          <EmployeeList/>
      </div>
      </Container>
    </Page>
    {showsnak}
    </>
  );
};

const maptostate = state =>{
  return{
    token : state.auth.token,
    designation : state.admin.designation,
    error : state.admin.error
  }
}

const maptodispatch = dispatch =>{
  return{
    OnFetchEmployeeData : (token) => dispatch(fetch_employeedata_start(token)),
    OnFetchDesignation : (token) => dispatch(get_designations(token)),
    OnAddEmployee : (data,token) => dispatch(add_employee(data,token))
  }
}

export default connect(maptostate,maptodispatch)(Employeedesh)