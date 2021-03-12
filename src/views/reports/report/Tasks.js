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
import { fetch_task_report, clean_stuff } from "src/store/action/Admin";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

function Tasks(props) {
  const classes = useStyles();
  const [to, setTo] = React.useState();
  const [from, setFrom] = React.useState();

  React.useEffect(() => {
    //clean stuff
    props.OnCleanStuff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    "Date",
    "Username",
    "Project Name",
    "Technology",
    "Working Hours",
  ];
  let data = [];
  if (props.taskreport !== null) {
    data = props.taskreport.Tasks.map((row) => [
      format(new Date(row["DateTime"]), "EEE, dd MMM yyyy"),
      row.Username,
      row.ProjectName,
      row.Technology,
      row.hour,
    ]);
  }

  const fetchreport = (e) => {
    e.preventDefault();
    const data = { fromdate: from, todate: to };
    props.OnFetchTaskReport(data, props.token);
  };

  const options = {
    filterType: "dropdown",
    rowsPerPageOptions: [5, 10, 15, 25, 50, 100],
    rowsPerPage: 5,
  };

  return (
    <>
      <Page className={classes.root} title="Tasks Reports">
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
            title={"Task Report"}
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
  //   console.log(state.admin);
  return {
    token: state.auth.token,
    taskreport: state.admin.taskreport,
  };
};
const maptodispatch = (dispatch) => {
  return {
    OnFetchTaskReport: (data, token) =>
      dispatch(fetch_task_report(data, token)),
    OnCleanStuff: () => dispatch(clean_stuff()),
  };
};

export default connect(maptostate, maptodispatch)(Tasks);
