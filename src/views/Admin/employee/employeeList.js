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


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


function Customrow(props){
  const joindate = props.row['Joining Details'][0] !== undefined ? props.row['Joining Details'][0]['Join Date'] : ''
  return(
    <>
      <TableRow>
        <TableCell >{props.row['username']}</TableCell>
        <TableCell >{props.row['role']}</TableCell>
        <TableCell >{props.row['isActive'] ? 'Active' : 'DeActive'}</TableCell>
        <TableCell >{joindate}</TableCell>
      </TableRow>
    </>
    )
}
// [
//     {   'ID' : "1",
//         'Username': "Samir.shah",
//         'Designation' : "Sr. Developer",
//         'Status' : 'Active',
//         'JoiningDate' : '12/06/2000',
//         'details' : 'xyz'
//     }
//   ]

function EmployeeList(props) {
  const classes = useStyles();

  console.log(props.employees)
  
  let rows = props.employees

  return (
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Username</TableCell>
            <TableCell >Designation</TableCell>
            <TableCell >Status</TableCell>
            <TableCell >JoiningDate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows !== null ? rows.map((row,index) => (
            <Customrow row={row} key={index}/>
          )) : null}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

const maptostate = state =>{
  
  return{
    // token : state.auth.token,
    employees : state.admin.employees.Employees
  }
}

export default connect(maptostate)(EmployeeList)



