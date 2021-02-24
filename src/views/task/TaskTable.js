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
import EditModel from './EditModal'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


function Customrow(props){
  
  const [show,setShow] = React.useState(false)
  return(
    <>
      <TableRow key={props.row.id}>
      <TableCell >{props.row.DateTime.split(' ')[0]}</TableCell>
      <TableCell >{props.row.Technology}</TableCell>
      <TableCell >{props.row.ProjectName}</TableCell>
      <TableCell >{props.row.hour}</TableCell>
      <TableCell >
        <IconButton onClick={() => setShow(!show)}>
          <ExpandMoreIcon/>
        </IconButton>
      </TableCell>
      <TableCell >
        {+props.row.DateTime.split(' ')[0].split('-')[2] === new Date().getDate() ? <EditModel data={props.row} /> : null}
      </TableCell>
      </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={show} timeout="auto" unmountOnExit>
              <div style={{whiteSpace: "pre-line", paddingTop:'10px',height:'250px'}}>
                {props.row.desc}
              </div>
            </Collapse>
          </TableCell>
        </TableRow>
    </>
    )
}

function TaskTable(props) {
  const classes = useStyles();
  let rows = [...props.tasks].reverse()

  return (
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>DateTime</TableCell>
            <TableCell >Technology</TableCell>
            <TableCell >ProjectName</TableCell>
            <TableCell >Hours</TableCell>
            <TableCell >Description</TableCell>
            <TableCell >Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows !== null ? rows.slice(0,6).map((row) => (
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
    token : state.auth.token,
    tasks : state.user.employee.Employee.Task
  }
}

export default connect(maptostate)(TaskTable)



