import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import format from "date-fns/format";
import GetAppIcon from "@material-ui/icons/GetApp";
import TablePagination from "@material-ui/core/TablePagination";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Customrow(props) {
  return (
    <>
      <TableRow key={props.row.Grade}>
        <TableCell>{props.row.Grade}</TableCell>
        <TableCell>
          {"" + format(new Date(props.row.Start_Date), "EEE, dd MMM yyyy")}
        </TableCell>
        <TableCell>
          {props.row["End Date"] !== "None"
            ? format(new Date(props.row["End Date"]), "EEE, dd MMM yyyy")
            : "Present"}
        </TableCell>
        <TableCell>
          {props.row.Basic.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </TableCell>
      </TableRow>
    </>
  );
}

function HistoryList(props) {
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

  let rows = [...props.gradehistory.Grades].reverse();

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Grade</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Basic</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows !== null
              ? rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => <Customrow row={row} key={row.Grade} />)
              : null}
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

const maptostate = (state) => {
  // console.log(state.user)
  return {
    token: state.auth.token,
    gradehistory: state.user.gradehistory,
  };
};

export default connect(maptostate)(HistoryList);
