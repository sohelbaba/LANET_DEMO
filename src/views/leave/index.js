import React from 'react';
import { Container,Card,Grid,Button,Divider,Typography,makeStyles} from '@material-ui/core';
import Page from 'src/components/Page';
import LeaveModel from './LeaveModel'
import {connect} from 'react-redux'
import {apply_leave,fetch_userdata_start} from 'src/store/action/User'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import LeaveTable from './leaveTable'

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


const Leaveboard = (props) =>{
  const classes = useStyles();
  return (
    <Grid item lg={3} sm={6} xl={3} xs={12}>
      <Card className={classes.leaveboard}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h4">{props.title}</Typography>
          <Typography color="textPrimary" variant="h5">Remaining  : {props.value}</Typography>
        </Grid>
      </Card>
    </Grid>
  )
}

const Dashboard = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [show,setShow] = React.useState(false)
  const [data,setData] = React.useState(null)
  const leavedata = {ltype : '',startdate : '',enddate :'',desc : ''}

  React.useEffect(() =>{
    props.OnFetchData(props.token)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  

  const handleClickOpen = () => setOpen(true)
  const onChangeHandler = (e) => leavedata[e.target.name] = e.target.value
  
  const handleClose = () =>{
    // leavedata = {ltype : '',startdate : '',enddate :'',desc : ''}
    setOpen(false)
  }

  const submit = (e) =>{
    e.preventDefault();
    setShow(true)
    setOpen(false)
    //api call
    setData(leavedata)
    props.OnApplyLeave(data,props.token)
  }
  let showsnak = null
  if(show){
      showsnak = (
        <div>
          <Snackbar open={show} anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={2000} onClose={() => setShow(false)}>
            <Alert severity="success">
              Leave Application Sent..
            </Alert>
          </Snackbar>
        </div>
      )
  }

  return (
    <>
    <Page className={classes.root} title="Leave">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {Object.keys(props.leaves).map(index =>(
            <Leaveboard key={index} title={index} value={props.leaves[index]}/>
          ))}
        </Grid>
      </Container>
      <Container style={{paddingTop:'15px'}}>
      <LeaveModel 
        open={open} 
        data ={leavedata}
        submit={submit}
        handleClose={handleClose}
        // handleApply ={handleApply}
        onChangeHandler ={onChangeHandler}
      />
      <Divider/>
      {/* <Container style={{marginTop:'15px'}}></Container> */}
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Apply Leave
      </Button>
      </Container>
      <Container style={{paddingTop:'10px'}}>
        <LeaveTable/>
      </Container>

    </Page>
    {showsnak}
    </>
  );
};

const maptostate = state =>{
  return {
    token : state.auth.token,
    leaves : state.user.employee.Employee['Annual Leaves'][0]
  }
}

const maptodispatch = dispatch =>{
  return{
    OnApplyLeave : (data,token) => dispatch(apply_leave(data,token)),
    OnFetchData : (token) => dispatch(fetch_userdata_start(token))
  }
}
export default connect(maptostate,maptodispatch)(Dashboard);
