import React from 'react';
import { Container,Card,Grid,Button,Typography,makeStyles} from '@material-ui/core';
import Page from 'src/components/Page';
import LeaveModel from './LeaveModel'
import {connect} from 'react-redux'
import {apply_leave,fetch_leave_start} from 'src/store/action/User'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import LeaveTable from './leaveTable';
import Chart from 'react-apexcharts'
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import ListRoundedIcon from '@material-ui/icons/ListRounded';
import CircularProgress  from '@material-ui/core/CircularProgress';

// import MyChart from 'src/mixins/chartjs'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  leaveboard :{
    padding:'15px'
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 0px',
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  }

}));


const Leaveboard = (props) =>{
  const options = {
        chart: { height: 200, type: 'radialBar'},
        
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: { fontSize: '6px',},
                    value: { fontSize: '16px',},
                    total: {
                      show: true,
                      fontSize:'13px',
                      label: 'Available',
                      formatter: function (w) {
                        return props.value
                      }
                    },
                    style: {
                      colors: ['#F44336', '#E91E63']
                    }
                  }
                }
              },
            labels: ['Total', 'Consumed'],
  }
  const series = [100,((props.Leavevalue - props.value) * Math.floor(100/props.Leavevalue))]
  const classes = useStyles();
  
  return (
    <Grid item lg={2} sm={6} xl={3} xs={12}>
      <Card className={classes.leaveboard}>
        <Grid item>
          <Typography color="textSecondary" align="center" gutterBottom variant="h5">{props.title === 'PL' ? 'PERS. LEAVE' : props.title === 'CL' ? 'CASUAL LEAVE' : props.title === 'SL' ? 'SICK LEAVE' : props.title === 'LWP' ? 'PAID LEAVE' : null}</Typography>
          <Chart options={options} series={series} type="radialBar" height={180} />
        </Grid>
      </Card>
    </Grid>
  )
}

const Dashboard = (props) => { 
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [show,setShow] = React.useState(false)
  const [call,setCall] = React.useState(false)
  const [leavedata,setLeaveData] = React.useState({
    ltype : '',
    startdate : new Date(),
    enddate :new Date(),
    desc : ''
  })

  React.useEffect(() =>{
    props.OnFetchLeaveData(props.token)
    setCall(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[call])

  const handleClickOpen = () => setOpen(true)

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
     setLeaveData(prevstate => ({ 
        ...prevstate,
        [name] : value
      }))
    
      // leavedata[e.target.name] = e.target.value
  }
  
  const enddatehandlechange = (date) =>{
    setLeaveData(prevstate => (
      { ...prevstate,
        enddate : date 
      }))
  }

  const startdatehandlechange = (date) =>{
    setLeaveData(prevstate => (
      { ...prevstate,
        startdate : date
      }))
  }

  const handleClose = () =>{
    setLeaveData({ltype : '',startdate : new Date(),enddate :new Date(),desc : ''})
    setOpen(false)
  }

  const submit = (e) =>{
    e.preventDefault();
    setShow(true)
    setOpen(false)
    setCall(true)
    
    props.OnApplyLeave(leavedata,props.token)
    setLeaveData({ltype : '',startdate : new Date(),enddate :new Date(),desc : ''})
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

  const leave = {PL : 12,CL : 4,SL : 4,LWP : 5}


  return (
    <>
    <Page className={classes.root} title="Leave">
      <Container maxWidth={false}>
        {/* <Demo/> */}
        <Grid container spacing={3}>
          {Object.keys(props.leaves).map(index =>(
            <Leaveboard 
              key={index} 
              title={index} 
              Leavevalue ={leave[index]}
              value={props.leaves[index]}/>
          ))}
          <Grid item lg={4} sm={6} xl={3} xs={12}>
            <Card className={classes.leaveboard}>
              <Grid item>
                <Typography color="textSecondary" align="left" gutterBottom variant="h5">LEAVE ACTIONS</Typography>
                <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{marginTop:'10px',marginBottom:'20px'}}>Apply Leave</Button>
                <Button className={classes.button}>
                    <DescriptionRoundedIcon className={classes.icon} color="primary"/>     
                    <span>Leave Policy Document</span>                
                </Button>
                <Button className={classes.button}>
                    <ListRoundedIcon className={classes.icon} color="primary"/>    
                    <span>Leave History</span>                
                </Button>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Container style={{paddingTop:'15px'}}>
        <LeaveModel 
          open={open} 
          post ={leavedata}
          submit={submit}
          handleClose={handleClose}
          enddatehandlechange = {enddatehandlechange}
          startdatehandlechange = {startdatehandlechange}
          onChangeHandler ={onChangeHandler}
        />
           
      </Container>
      <Container style={{paddingTop:'10px'}}>
        {props.applyleaves !== null ? <LeaveTable/> : <div style={{margin:'180px 450px auto'}}><CircularProgress /></div>}
      </Container>
    </Page>
    {showsnak}
    </>
  );
};

const maptostate = state =>{
  // console.log(state.user.employee.Employee['Annual Leaves'][0])
  return {
    token : state.auth.token,
    applyleaves : state.user.leaves,
    leaves : state.user.employee.Employee['Annual Leaves'][0]
  }
}

const maptodispatch = dispatch =>{
  return{
    OnApplyLeave : (data,token) => dispatch(apply_leave(data,token)),
    OnFetchLeaveData : (token) => dispatch(fetch_leave_start(token))
  }
}
export default connect(maptostate,maptodispatch)(Dashboard);
