import React from 'react'
import LeaveList from './LeaveList'
import Page from 'src/components/Page';
import {makeStyles,Container} from '@material-ui/core';
import {fetch_leaves_start} from 'src/store/action/Admin'
import {connect} from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
}));

const LeaveIndex = (props) =>  {
    const classes = useStyles()
    console.log(props.token)

    React.useEffect(()=>{
      props.OnLeavesGet(props.token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return (
    <Page className={classes.root} title="Leaves">
        <Container>
            <LeaveList/>
        </Container>
    </Page>
    )
}

const maptostate = state=>{
  console.log(state.admin)
  return {
    token: state.auth.token
  }
}
const maptodispatch = (dispatch) =>{
  return{
    OnLeavesGet : (token) => dispatch(fetch_leaves_start(token))
  }
}
export default connect(maptostate,maptodispatch)(LeaveIndex)
