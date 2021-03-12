import React from "react";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import AddIcon from "@material-ui/icons/Add";
import { Button, Card, Container, makeStyles, Grid } from "@material-ui/core";
import Page from "src/components/Page";

import { connect } from "react-redux";
import {
  add_designation_start,
  get_designations,
} from "src/store/action/Admin";
import DesList from "./deslist";
import Modal from "./Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Designation = (props) => {
  const classes = useStyles();
  const [show, setShow] = React.useState(false);
  const [data, setData] = React.useState({
    designation: "",
    basic: 0.0,
  });
  const [call, setCall] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChageHandle = (e) => {
    const { name, value } = e.target;
    // console.log(value);
    setData((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };

  React.useEffect(() => {
    setCall(false);
    props.OnFetchDesignation(props.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [call]);

  const adddesignation = (e) => {
    e.preventDefault();
    setShow(true);
    setCall(true);
    setOpen(false);
    props.OnAddDesignation(data, props.token);

    setData({
      designation: "",
      basic: 0.0,
    });
  };

  let showsnak = null;
  if (show) {
    showsnak = (
      <div>
        <Snackbar
          open={show}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={2000}
          onClose={() => setShow(false)}
        >
          <Alert severity="success">Designation Added Succesfully.</Alert>
        </Snackbar>
      </div>
    );
  }

  return (
    <>
      <Page className={classes.root} title="Designations">
        <Container>
          <Card
            style={{
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              <AddIcon />
              &nbsp; Add Designation
            </Button>
          </Card>
          <Modal
            open={open}
            adddesignation={adddesignation}
            handleClose={handleClose}
            onChageHandle={onChageHandle}
            post={data}
          />
          <DesList />
        </Container>
      </Page>
      {showsnak}
    </>
  );
};

const maptostate = (state) => {
  return {
    token: state.auth.token,
  };
};

const maptodispatch = (dispatch) => {
  return {
    OnAddDesignation: (data, token) =>
      dispatch(add_designation_start(data, token)),
    OnFetchDesignation: (token) => dispatch(get_designations(token)),
  };
};
export default connect(maptostate, maptodispatch)(Designation);
