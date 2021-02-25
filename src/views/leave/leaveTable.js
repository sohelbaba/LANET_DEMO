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
  
  const [show,setShow] = React.useState(false)
  return(
    <>
      <TableRow key={props.row['Apply Date']}>
      <TableCell >{props.row['Apply Date'].split('.')[0].split(' ')[0]}</TableCell>
      <TableCell >{props.row['Start Date']}</TableCell>
      <TableCell >{props.row['End Date']}</TableCell>
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
  
  let rows = [...props.leaves].reverse()
  return (
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Apply Date</TableCell>
            <TableCell >From</TableCell>
            <TableCell >To</TableCell>
            <TableCell >Status</TableCell>
            <TableCell >Description</TableCell>
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
  
  return{
    // token : state.auth.token,
    leaves : state.user.employee.Employee['Leave Details']
  }
}

export default connect(maptostate)(LeaveTable)



