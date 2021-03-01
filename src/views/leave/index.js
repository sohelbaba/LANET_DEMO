import React from 'react';
import { Container,Card,Grid,Button,Divider,Typography,makeStyles} from '@material-ui/core';
import Page from 'src/components/Page';
import LeaveModel from './LeaveModel'
import {connect} from 'react-redux'
import {apply_leave,fetch_userdata_start} from 'src/store/action/User'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import LeaveTable from './leaveTable';
import Chart from 'react-apexcharts'
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import ListRoundedIcon from '@material-ui/icons/ListRounded';

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
                      formatter: function (w) {return props.Leavevalue}
                    },
                    style: {
                      colors: ['#F44336', '#E91E63']
                    }
                  }
                }
              },
            // labels: ['Total', 'Consumed'],
  }
  const series = [100,0]
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

  const leave = {
    PL : 12,
    CL : 4,
    SL : 4,
    LWP : 5
  }
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
        data ={leavedata}
        submit={submit}
        handleClose={handleClose}
        // handleApply ={handleApply}
        onChangeHandler ={onChangeHandler}
      />
           
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
