import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import {get_designations} from 'src/store/action/Admin'

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Container,
  makeStyles,
  Grid
} from '@material-ui/core';
import Page from 'src/components/Page';

import {connect} from 'react-redux'
import {add_designation_start} from 'src/store/action/Admin'
import DesList from './deslist'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
}));

const Designation = (props) => {
  const classes = useStyles()
  const [show,setShow] = React.useState(false)
  const [designation, setDesignation] = React.useState('')
  const [basic,setBasic] = React.useState(0.0)
  const [call,setCall] = React.useState(false)

  React.useEffect(()=>{
    props.OnFetchDesignation(props.token)
    setCall(false)
    console.log('useEffect')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[call])

  const adddesignation = (e) =>{
    e.preventDefault()
    setShow(true)
    setCall(true)

    const data = {
        designation : designation,
        basic : basic
    }
    
    props.OnAddDesignation(data,props.token)
    setDesignation('')
    setBasic(0.0)
  }

  let showsnak = null
  if(show){
      showsnak = (
        <div>
          <Snackbar open={show} anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={2000} onClose={() => setShow(false)}>
            <Alert severity="success">
              Designation Added Succesfully.
            </Alert>
          </Snackbar>
        </div>
      )
  }

  return (
    <>
    <Page className={classes.root} title="Designations">
      <Container>
        <Grid container>
          <Grid item xs={4}>
              <form onSubmit={adddesignation}>
                <Card>
                <CardHeader title="Add Designation"/>
                <Divider />
                <CardContent>
                  <TextField
                    fullWidth
                    label="New Designation"
                    margin="normal"
                    required
                    name="desg"
                    onChange={(e) => setDesignation(e.target.value)}
                    type="text"
                    value={designation}
                    variant="outlined"
                    style={{marginRight:'10px'}}
                  />
                  <TextField
                    fullWidth
                    label="Basic"
                    margin="normal"
                    name="basic"
                    required
                    type="number"
                    onChange={(e) => setBasic(+e.target.value)}
                    value={basic}
                    variant="outlined"
                  />
                </CardContent>
                <Divider />
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  p={2}
                >
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                  >
                    Save
                  </Button>
                </Box>
              </Card>
            </form>
          </Grid>
          <Grid xs={1}></Grid>
          <Grid item xs={7}>
            <DesList/>
          </Grid>
        </Grid>
      </Container>
    </Page>
    {showsnak}
    </>
  );
};

const maptostate = state =>{
  return {
    token : state.auth.token
  }
}

const maptodispatch = dispatch =>{
  return {
    OnAddDesignation : (data,token) => dispatch(add_designation_start(data,token)),
    OnFetchDesignation : (token) => dispatch(get_designations(token))
  }
}
export default connect(maptostate,maptodispatch)(Designation);
