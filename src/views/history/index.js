import React from 'react'
import { Container,Button,makeStyles} from '@material-ui/core';
import HistoryList from './HistoryList'
import Page from 'src/components/Page';
import CircularProgress  from '@material-ui/core/CircularProgress';
import {connect} from 'react-redux'
import {fetch_employee_history_start} from 'src/store/action/User'

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

const HistoryView = (props) =>{
    const classes = useStyles()
    
    React.useEffect(() =>{
        props.OnFetchGradeHistory(props.token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
            <Page className={classes.root} title="Salary">
            <Container maxWidth={false}>    
                {props.gradehistory !== null ? <HistoryList/> : <div style={{margin:'180px 450px auto'}}><CircularProgress /></div>}
            </Container>
            </Page>
        </>
    )
}


const maptostate = state =>{
    return{
        token: state.auth.token,
        gradehistory :  state.user.gradehistory
    }
}

const maptodispatch = dispatch =>{
    return{
        OnFetchGradeHistory : (token) => dispatch(fetch_employee_history_start(token))
    }
}

export default connect(maptostate,maptodispatch)(HistoryView)