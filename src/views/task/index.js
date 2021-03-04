import React from 'react';
import { Container,Button,makeStyles} from '@material-ui/core';
import Page from 'src/components/Page';
import TaskModel from './TaskModel'
import TaskTable from './TaskTable'
import {connect} from 'react-redux'
import {fetch_tasks_start,add_task} from 'src/store/action/User'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CircularProgress  from '@material-ui/core/CircularProgress';

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
  const [taskdata,setTaskData] = React.useState({technology : '',projectname : '',hour :'',desc: ''})
  const [call,setCall] = React.useState(false)

  const handleClick = () =>{setShow(true)}
  
  React.useEffect(()=>{
    props.OnFetchTaskData(props.token)
    setCall(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[call])

  const onclose = (e) =>{
    setShow(false)
  }
  
  const submit = (e) =>{
    e.preventDefault()
    setOpen(true)
    setShow(false)
    setCall(true)

    props.onTaskAdd(taskdata,props.token)
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

  const handlechange = (e) =>{ 
    const {name,value}= e.target
    setTaskData(prevstate =>({
        ...prevstate,
        [name] :value 
      }))
  }

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
        {props.tasks !== null ? <TaskTable/> : <div style={{margin:'180px 450px auto'}}><CircularProgress /></div>}
      </Container>
    </Page>
    {showsnak}
    </>
  );
};

const maptostate = state =>{
  return{
    token : state.auth.token,
    tasks : state.user.tasks
  }
}

const maptodispatch = dispatch =>{
  return{
    OnFetchTaskData : (token) => dispatch(fetch_tasks_start(token)),
    onTaskAdd : (data,token) => dispatch(add_task(data,token))
  }
}

export default connect(maptostate,maptodispatch)(Dashboard);
