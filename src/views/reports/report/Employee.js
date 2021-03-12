import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import MUIDataTable from "mui-datatables";
import CircularProgress from "@material-ui/core/CircularProgress";
import format from "date-fns/format";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Page from "src/components/Page";
import {
  Container,
  Card,
  CardContent,
  Button,
  makeStyles,
} from "@material-ui/core";
import { connect } from "react-redux";
import { fetch_employee_report, clean_stuff } from "src/store/action/Admin";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

function Employee(props) {
  const classes = useStyles();
  const [to, setTo] = React.useState();
  const [from, setFrom] = React.useState();

  React.useEffect(() => {
    //clean stuff
    props.OnCleanStuff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = ["Username", "Role", "Designation", "Status", "JoiningDate"];
  let data = [];
  if (props.employeereport !== null) {
    data = props.employeereport.Employee.map((row) => [
      row.username,
      row["role"] === "Hr" ? "HR" : row["role"],
      row["Grade Details"][0].Grade,
      row["isActive"] ? "Active" : "DeActive",
      format(
        new Date(row["Joining Details"][0]["Join Date"]),
        "EEE, dd MMM yyyy"
      ),
    ]);
  }

  const fetchreport = (e) => {
    e.preventDefault();
    const data = { fromdate: from, todate: to };
    props.OnFetchEmployeeReport(data, props.token);
  };

  const options = {
    filterType: "dropdown",
    rowsPerPageOptions: [5, 10, 15, 25, 50, 100],
    rowsPerPage: 5,
  };

  return (
    <>
      <Page className={classes.root} title="Employee Reports">
        <Container maxWidth={false}>
          <Card style={{ marginBottom: "10px" }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        disableToolbar
                        variant="dialog"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inlines"
                        label="From"
                        value={from}
                        onChange={(date) => setFrom(date)}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={3}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        disableToolbar
                        variant="dialog"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="To"
                        value={to}
                        onChange={(date) => setTo(date)}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid
                  item
                  xs={1}
                  style={{ marginTop: "27px", marginLeft: "-10px" }}
                >
                  <Grid container justify="space-around">
                    <Button
                      variant="outlined"
                      onClick={fetchreport}
                      color="primary"
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <MUIDataTable
            title={"Employee List"}
            data={data}
            columns={columns}
            options={options}
          />
        </Container>
      </Page>
    </>
  );
}

const maptostate = (state) => {
  console.log(state.admin);
  return {
    token: state.auth.token,
    employeereport: state.admin.employeeReport,
  };
};
const maptodispatch = (dispatch) => {
  return {
    OnFetchEmployeeReport: (data, token) =>
      dispatch(fetch_employee_report(data, token)),
    OnCleanStuff: () => dispatch(clean_stuff()),
  };
};

export default connect(maptostate, maptodispatch)(Employee);
