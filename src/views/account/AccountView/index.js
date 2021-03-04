import React from 'react';
import {Container,Grid,makeStyles,Avatar,CircularProgress,Card,CardHeader,Typography,CardContent} from '@material-ui/core';
import Page from 'src/components/Page';
import ProfileDetails from './ProfileDetails';
import {connect} from 'react-redux'
import {fetch_userdata_start} from 'src/store/action/User'
import format from "date-fns/format"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(0),
    paddingTop: theme.spacing(0),
    marginTop:theme.spacing(0),
  },
  pos: {
    marginBottom: 12,
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
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
    show = <div style={{margin:'180px 450px auto'}}><CircularProgress /></div>
  }

  return (
    <>
    <Page className={classes.root} title="Account">
      <Container>
        <Card>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe"  src="/static/images/avatars/avatar_7.png" className={classes.large}/>
            }
            title={
                <Typography style={{textTransform:'capitalize'}} color="textPrimary" gutterBottom variant="h3">
                  Welcome, {props.userdetails !== null ? props.userdetails.Employee.username.split('.')[0] : null}
                </Typography>
            }
            subheader={''+format(new Date(),"EEE, dd MMM yyyy")}
          />
        </Card>
      </Container>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
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