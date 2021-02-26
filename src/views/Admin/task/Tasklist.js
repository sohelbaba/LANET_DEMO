import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
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

function TaskList(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);  
  let rows = props.employees

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          {rows !== null ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => (
            <Customrow row={row} key={index}/>
          )) : null}
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </TableContainer>
    </>
  );
}

const maptostate = state =>{
  console.log(state.admin.employees.Employees)
  return{
    // token : state.auth.token,
    employees : state.admin.employees.Employees
  }
}

export default connect(maptostate)(TaskList)



