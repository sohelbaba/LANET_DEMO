import React from 'react';
import { Container,Button,makeStyles} from '@material-ui/core';
import Page from 'src/components/Page';
import EmployeeList from './employeeList'
import Modal from './Modal'
import {connect} from 'react-redux'
import {add_employee,get_designations,fetch_employeedata_start} from 'src/store/action/Admin'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


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
  const [emp,setEmp] = React.useState(null)
  const [error,setError] = React.useState(null)

  const employee = {
    username : '',
    password : '',
    role : '',
    email: '',
    designation :'',
    joiningdate: ''
  }
  
  const handleClick = () =>{setShow(true)}

  React.useEffect(()=>{
    props.OnFetchDesignation(props.token)
    props.OnFetchEmployeeData(props.token)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[emp])

  const handlechange = (e) =>{ 
    employee[e.target.name] = e.target.value
  }

  const onclose = (e) =>{setShow(false)}
  
  const submit = (e) =>{
    
    e.preventDefault()
    setOpen(true)
    setShow(false)
    
    // auto generated password get
    employee.password = e.target.password.value
    
    setEmp(employee)
    setError(null)

    props.OnAddEmployee(employee,props.token)
    
    
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
    handlecancle={onclose} 
    handlechange={handlechange} />
  }

  return (
    <>
    <Page className={classes.root} title="Employees">
      
      <Container style={{paddingTop:'15px'}}>
      {modal}
      <div style={{paddingTop:'15px',paddingBottom:'15px'}}>
          <Button variant="outlined" color="primary" onClick={handleClick}>Add Employee</Button>
      </div>
      </Container>
      <Container style={{paddingTop:'10px'}}>
        <EmployeeList/>
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