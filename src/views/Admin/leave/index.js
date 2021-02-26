import React from 'react'
import LeaveList from './LeaveList'
import Page from 'src/components/Page';
import {makeStyles,Container} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
}));

const Index = () =>  {
    const classes = useStyles()
    return (
    <Page className={classes.root} title="Leaves">
        <Container>
            <LeaveList/>
        </Container>
    </Page>
    )
}

export default Index
