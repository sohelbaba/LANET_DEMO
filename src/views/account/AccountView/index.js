import React from 'react';
import {Container,Grid,makeStyles,CircularProgress} from '@material-ui/core';
import Page from 'src/components/Page';
import ProfileDetails from './ProfileDetails';
import {connect} from 'react-redux'
import {fetch_userdata_start} from 'src/store/action/User'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = (props) => {
  
  const classes = useStyles();

  React.useEffect(() =>{
    props.OnFetchUserData(props.token)
  },[])

  let show = null
  if(props.userdetails !== null){
    show = <ProfileDetails/>
  }else{
    show = <CircularProgress size={80} />
  }

  return (
    <>
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={8} md={6} xs={12}>
          {show}
          </Grid>
        </Grid>
      </Container>
    </Page>
    </>
  );
};

const maptostate = (state) =>{
  
  return {
      token : state.auth.token,
      userdetails : state.user.employee
  }
}

const maptodispatch = (dispatch) =>{
  return{
    OnFetchUserData : (token) => dispatch(fetch_userdata_start(token))
  }
}

export default connect(maptostate,maptodispatch)(Account);