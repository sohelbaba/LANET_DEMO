import React from "react";
import { Container, Button, makeStyles } from "@material-ui/core";
import SalaryList from "./SalaryList";
import Page from "src/components/Page";
import CircularProgress from "@material-ui/core/CircularProgress";
import SalarySlip from "./salaryslip";
import { connect } from "react-redux";
import { fetch_employee_salardetails_start } from "src/store/action/User";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  leaveboard: {
    padding: "15px",
  },
}));

const SalaryView = (props) => {
  const classes = useStyles();

  React.useEffect(() => {
    // console.log('useEffect salary index')
    props.OnFetchSalary(props.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Page className={classes.root} title="Salary">
        <Container maxWidth={false}>
          {props.salary !== null ? (
            <SalaryList />
          ) : (
            <div style={{ margin: "180px 450px auto" }}>
              <CircularProgress />
            </div>
          )}
        </Container>
      </Page>
    </>
  );
};

const maptostate = (state) => {
  // console.log(state.user)
  return {
    token: state.auth.token,
    salary: state.user.salarydetails,
  };
};

const maptodispatch = (dispatch) => {
  return {
    OnFetchSalary: (token) =>
      dispatch(fetch_employee_salardetails_start(token)),
  };
};

export default connect(maptostate, maptodispatch)(SalaryView);
