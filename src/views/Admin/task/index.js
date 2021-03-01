import React from 'react'
import TaskList from './Tasklist'
import Page from 'src/components/Page';
import {makeStyles,Container} from '@material-ui/core';
import {connect} from 'react-redux'
import {fetch_tasks_start} from 'src/store/action/Admin'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
}));

const TaskIndex = (props) =>  {
    const classes = useStyles()

  React.useEffect(()=>{
    props.OnTaskGet(props.token)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <Page className={classes.root} title="Tasks">
        <Container>
            <TaskList/>
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
    OnTaskGet : (token) => dispatch(fetch_tasks_start(token))
  }
}
export default connect(maptostate,maptodispatch)(TaskIndex)
