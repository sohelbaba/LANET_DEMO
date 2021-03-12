import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Button } from "@material-ui/core";
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
import SalarySlip from "./salaryslip";
import Pdf from "react-to-pdf";
import Dialog from "@material-ui/core/Dialog";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Customrow(props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const ref = React.createRef();
  const options = {
    orientation: "landscape",
    unit: "in",
    format: [4, 2],
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableRow key={props.row.id + Math.random() * 10}>
        <TableCell>
          {"" + format(new Date(props.row.generateddate), "EEE, dd MMM yyyy")}
        </TableCell>
        <TableCell>{props.row.month}</TableCell>
        <TableCell>
          {props.row.amount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </TableCell>
        <TableCell>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            View
          </Button>
        </TableCell>
      </TableRow>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Salary Slip
            </Typography>
            <Pdf
              targetRef={ref}
              filename={props.row.month + ".pdf"}
              options={options}
            >
              {({ toPdf }) => (
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={toPdf}
                  aria-label="close"
                >
                  <GetAppIcon />
                </IconButton>
              )}
            </Pdf>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div ref={ref}>
          <SalarySlip />
        </div>
      </Dialog>
    </>
  );
}

function SalaryList(props) {
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

  let rows = [...props.salary].reverse();

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Month</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows !== null
              ? rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => <Customrow row={row} key={row.id} />)
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
    salary: state.user.salarydetails.salary,
  };
};

export default connect(maptostate)(SalaryList);
