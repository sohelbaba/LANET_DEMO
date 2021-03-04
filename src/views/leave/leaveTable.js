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
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


function Customrow(props){
  console.log(props.row)
  const [show,setShow] = React.useState(false)
  return(
    <>
      <TableRow key={props.row['desc']}>
      <TableCell >{''+format(new Date(props.row['Apply Date']),"EEE, dd MMM yyyy")}</TableCell>
      <TableCell>{props.row.Type}</TableCell>
      <TableCell >{''+format(new Date(props.row['Start Date']),"EEE, dd MMM yyyy")}</TableCell>
      <TableCell >{''+format(new Date(props.row['End Date']),"EEE, dd MMM yyyy")}</TableCell>
      <TableCell >
          {props.row['Status'] === 'Pending' || props.row['Status'] === 'Cancle'
            ? <span style={{color:'red'}}> {props.row['Status']}</span> 
            : <span style={{color:'green'}}>{props.row['Status']}</span>}
      </TableCell>
      <TableCell >
        <IconButton onClick={() => setShow(!show)}>
          <ExpandMoreIcon/>
        </IconButton>
      </TableCell>
      
      </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={show} timeout="auto" unmountOnExit>
              <div style={{whiteSpace: "pre-line", paddingTop:'10px',height:'150px',scrollBehavior:'auto'}}>
                {props.row['Description']}
              </div>
            </Collapse>
          </TableCell>
        </TableRow>
    </>
    )
}

function LeaveTable(props) {
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

  let rows = [...props.leaves].reverse()


  return (
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Apply Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell >From</TableCell>
            <TableCell >To</TableCell>
            <TableCell >Status</TableCell>
            <TableCell >Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows !== null ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <Customrow row={row} key={row.desc}/>
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
  console.log(state.user)
  return{
    // token : state.auth.token,
    leaves : state.user.leaves.Leaves
  }
}

export default connect(maptostate)(LeaveTable)



