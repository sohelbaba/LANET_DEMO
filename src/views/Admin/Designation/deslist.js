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
import CircularProgress  from '@material-ui/core/CircularProgress';
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});


function Customrow(props){
  return(
    <>
      <TableRow key={props.row.Designation}>
        <TableCell >{props.row.Designation}</TableCell>
        <TableCell>{props.row.Basic}</TableCell>
      </TableRow>
    </>
    )
}

function DesList(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let rows = null
  if(props.designations !== null){
    rows = [...props.designations.designation].reverse()
  }
  


  return (
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Designation</TableCell>
            <TableCell>Basic</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows !== null ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => (
            <Customrow row={row} key={index}/>
          )) : <div style={{margin:'180px 450px auto'}}><CircularProgress /></div>}
        </TableBody>
      </Table>
       <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows !== null ? rows.length : 0}
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
  console.log(state.user)
  return{
    // token : state.auth.token,
    designations : state.admin.designation
  }
}

export default connect(maptostate)(DesList)



