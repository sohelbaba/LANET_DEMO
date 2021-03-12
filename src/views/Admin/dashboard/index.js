import React from "react";
import Budget from "./Budget";
import Online from "./online";
import Offline from "./offline";
import Employees from "./Employees";
import {
  Card,
  CardHeader,
  Container,
  Grid,
  Typography,
  CircularProgress,
  makeStyles,
  Avatar,
} from "@material-ui/core";
import Page from "src/components/Page";
import Request from "./Request";
import Birthdays from "./birthdays";
import Tasks from "./Tasks";
import { connect } from "react-redux";
import { fetch_userdata_start } from "src/store/action/User";
import { fetch_employeedata_start } from "src/store/action/Admin";
import format from "date-fns/format";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(0),
    paddingTop: theme.spacing(0),
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();

  React.useEffect(() => {
    // console.log('admin dash')
    props.OnFetchEmployeesData(props.token);
    props.OnFetchPersonalData(props.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page className={classes.root} title="Dashboard">
      {/* {props.role === "Admin" ? (
        <Container style={{ marginBottom: "10px" }}>
          <Grid container direction="row" alignItems="flex-start">
            <Typography color="textPrimary" gutterBottom variant="h1">
              Welcome Admin!
            </Typography>
          </Grid>
        </Container>
      ) : (
        <Container>
          <Card>
            <CardHeader
              avatar={
                <Avatar
                  aria-label="recipe"
                  src="/static/images/avatars/avatar_7.png"
                  className={classes.large}
                />
              }
              title={
                <Typography
                  style={{ textTransform: "capitalize" }}
                  color="textPrimary"
                  gutterBottom
                  variant="h3"
                >
                  Welcome,{" "}
                  {props.userdetails !== null
                    ? props.userdetails.Employee.username.split(".")[0]
                    : null}
                </Typography>
              }
              subheader={"" + format(new Date(), "EEE, dd MMM yyyy")}
            />
          </Card>
        </Container>
      )} */}
      {props.userdetails !== null ? (
        <>
          <Container maxWidth={false} style={{ marginTop: "15px" }}>
            <Grid container spacing={3}>
              <Grid item xs={7}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Employees />
                  </Grid>
                  <Grid item xs={6}>
                    <Online />
                  </Grid>
                </Grid>
                <div style={{ marginTop: "10px" }}>
                  <Tasks />
                </div>
              </Grid>
              <Grid item xs={5}>
                <Container style={{ marginBottom: "10px" }}>
                  <Request />
                </Container>
                <Container>
                  <Birthdays />
                </Container>
              </Grid>
            </Grid>
          </Container>
        </>
      ) : (
        <div style={{ margin: "180px 450px auto" }}>
          <CircularProgress />
        </div>
      )}
    </Page>
  );
};

const maptostate = (state) => {
  console.log(state.user.employee);
  return {
    token: state.auth.token,
    role: state.auth.role,
    userdetails: state.user.employee,
  };
};

const maptodispatch = (dispatch) => {
  return {
    OnFetchEmployeesData: (token) => dispatch(fetch_employeedata_start(token)),
    OnFetchPersonalData: (token) => dispatch(fetch_userdata_start(token)),
  };
};

export default connect(maptostate, maptodispatch)(Dashboard);
