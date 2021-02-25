import React from 'react'
import Budget from './Budget';
import Online from './online'
import Offline from './offline'
import {
  Container,
  Grid,
  CircularProgress,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Request from './Request'
// import Tasks from './Tasks'
import {connect} from 'react-redux'
import {fetch_employeedata_start} from 'src/store/action/Admin'


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const Dashboard = (props) => {
    const classes = useStyles();

    React.useEffect(() =>{
        // console.log('admin dash')
        props.OnFetchEmployeesData(props.token)
    },[])


    return (
       <Page className={classes.root} title="Dashboard">
           {props.userdetails !== null 
            ? <>
                <Container maxWidth={false}>
                    <Grid container spacing={3}>
                        <Grid item lg={3} sm={6} xl={3} xs={12}>
                            <Budget />
                        </Grid>
                        <Grid item lg={3} sm={6} xl={3} xs={12}>
                            <Online />
                        </Grid>
                        <Grid item lg={3} sm={6} xl={3} xs={12}>
                            <Offline />
                        </Grid>
                    </Grid>
                </Container>
                <Container maxWidth={false}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Request />
                        </Grid>
                        <Grid item xs={6}>
                            {/* <Tasks /> */}
                        </Grid>
                    </Grid>
                </Container>
              </>
            : <CircularProgress size={80} />}
            
        </Page>
    )
}


const maptostate = (state) =>{
  console.log(state)
  return {
      token : state.auth.token,
      details : state.admin.employees
  }
}

const maptodispatch = (dispatch) =>{
  return{
    OnFetchEmployeesData : (token) => dispatch(fetch_employeedata_start(token))
  }
}

export default connect(maptostate,maptodispatch)(Dashboard)