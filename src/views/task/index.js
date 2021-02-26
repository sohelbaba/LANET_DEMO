import React from 'react';
import { Container,Button,makeStyles} from '@material-ui/core';
import Page from 'src/components/Page';
import TaskModel from './TaskModel'
import TaskTable from './TaskTable'
import {connect} from 'react-redux'
import {fetch_userdata_start,add_task} from 'src/store/action/User'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  leaveboard :{
    padding:'15px'
  }

}));

const Dashboard = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [show,setShow] = React.useState(false)
  const newtask = {technology : '',projectname : '',hour :'',desc: ''}
  const handleClick = () =>{setShow(true)}
  
  React.useEffect(()=>{
    props.OnFetchUserData(props.token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[newtask])

  const onclose = (e) =>{
    setShow(false)
  }
  
  const submit = (e) =>{
    e.preventDefault()
    setOpen(true)
    setShow(false)
    props.onTaskAdd(newtask,props.token)
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

  const handlechange = (e) =>{ newtask[e.target.name] = e.target.value}

  let modal = null
  if(show){
    modal =<TaskModel 
    show={show} 
    // handleClose={hideModal}
    submit={submit}
    handlecancle={onclose} 
    handlechange={handlechange} />
  }

  return (
    <>
    <Page className={classes.root} title="Task">
      <Container maxWidth={false}>
        {modal}        
        <div style={{paddingTop:'15px',paddingBottom:'15px'}}>
          <Button variant="outlined" color="primary" onClick={handleClick}>Add Task</Button>
        </div>
        <TaskTable/>
      </Container>
    </Page>
    {showsnak}
    </>
  );
};

const maptostate = state =>{
  return{
    token : state.auth.token,
  }
}

const maptodispatch = dispatch =>{
  return{
    OnFetchUserData : (token) => dispatch(fetch_userdata_start(token)),
    onTaskAdd : (data,token) => dispatch(add_task(data,token))
  }
}

export default connect(maptostate,maptodispatch)(Dashboard);
