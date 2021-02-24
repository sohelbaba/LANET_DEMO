import React from 'react';
import {Container,makeStyles} from '@material-ui/core';
import Page from 'src/components/Page';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AuthDetails from './AuthDetails';
import ListItem from '@material-ui/core/ListItem';
import Password from './Password';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  paper:{
    paddingTop:'25px'
  }
}));

const SettingsView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Change Password">
      <Container maxWidth="lg">
        <Grid item xs={6}>
          <Grid container justify="center" spacing={3}>
              <Grid item xs={12}>
                <Paper>
                  <Password/>
                </Paper>        
              </Grid>
          </Grid>
          
        </Grid>
        
      
      </Container>
    </Page>
  );
};

export default SettingsView;
