import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {IconButton} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Collapse from '@material-ui/core/Collapse';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux'
import format from "date-fns/format"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


function Customrow(props){  
  return(
    <>
      <TableRow key={props.row.id}>
      <TableCell >{''+format(new Date(props.row.generateddate),"EEE, dd MMM yyyy")}</TableCell>
      <TableCell >{props.row.month}</TableCell>
      <TableCell >{props.row.amount.toLocaleString(undefined,{ minimumFractionDigits: 2 })}</TableCell>
      </TableRow>
    </>
    )
}

function SalaryTable(props) {
  const classes = useStyles();
  let rows = [...props.salary].reverse()

  return (
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell >Month</TableCell>
            <TableCell >Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows !== null ? rows.map((row) => (
            <Customrow row={row} key={row.id}/>
          )) : null}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

const maptostate = state =>{
  // console.log(state.user)
  return{
    token : state.auth.token,
    salary : state.user.salarydetails.salary
  }
}

export default connect(maptostate)(SalaryTable)



