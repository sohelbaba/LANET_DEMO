import React from 'react';
import { Container,Card,Grid,Button,Divider,Typography,makeStyles} from '@material-ui/core';
import Page from 'src/components/Page';
import EmployeeList from './employeeList'
import Modal from './Modal'
import {connect} from 'react-redux'
import {get_designations,fetch_employeedata_start} from 'src/store/action/Admin'
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

  const employee = {
    username : '',
    password : '',
    role : '',
    designation :'',
    joiningdate: ''
  }
  
  const handleClick = () =>{setShow(true)}

  React.useEffect(()=>{
    props.OnFetchDesignation(props.token)
    props.OnFetchEmployeeData(props.token)
  },[])

  const handlechange = (e) =>{ employee[e.target.name] = e.target.value}

  const onclose = (e) =>{setShow(false)}
  
  const submit = (e) =>{
    e.preventDefault()
    setOpen(true)
    setShow(false)

    // auto generated password get
    employee.password = e.target.password.value
    console.log(employee)    
    // props.onTaskAdd(newtask,props.token)
  }

  let showsnak = null
  if(open){
      showsnak = (
        <div>
          <Snackbar open={open} anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={2000} onClose={() => setOpen(false)}>
            <Alert onClose={() => setOpen(false)} severity="success">
              {/* {props.AddressDetails === undefined ? 'Details Are Added.' : 'Details Are Updated.'} */}
              Task Added..
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
    handlecancle={onclose} 
    handlechange={handlechange} />
  }

  return (
    <>
    <Page className={classes.root} title="Leave">
      
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
    designation : state.admin.designation
  }
}

const maptodispatch = dispatch =>{
  return{
    OnFetchEmployeeData : (token) => dispatch(fetch_employeedata_start(token)),
    OnFetchDesignation : (token) => dispatch(get_designations(token))
  }
}

export default connect(maptostate,maptodispatch)(Employeedesh)