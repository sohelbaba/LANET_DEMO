import React from "react";
import MUIDataTable from "mui-datatables";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "./Modal";
import { update_designation, get_designations } from "src/store/action/Admin";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function DesList(props) {
  const [desdata, setData] = React.useState({
    designation: "",
    basic: 0.0,
  });
  const [show, setShow] = React.useState(false);
  const [call, setCall] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const columns = ["Designation", "Basic Salary", "Edit", "Delete"];

  React.useEffect(() => {
    setCall(false);
    props.OnFetchDesignation(props.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [call]);

  let rows = null;
  let data = null;
  if (props.designations !== null) {
    rows = [...props.designations.designation].reverse();
    data = rows.map((row) => [
      row.Designation,
      row.Basic.toLocaleString(undefined, {
        minimumFractionDigits: 2,
      }),
      <IconButton
        variant="outlined"
        color="secondary"
        onClick={() => edithandle(row)}
      >
        <EditIcon />
      </IconButton>,
      <IconButton variant="outlined" color="secondary">
        <DeleteIcon />
      </IconButton>,
    ]);
  }

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

  const edithandle = (row) => {
    // console.log(row);
    setOpen(true);
    setData((prevstate) => ({
      designation: row.Designation,
      basic: row.Basic,
    }));
  };

  const adddesignation = (e) => {
    e.preventDefault();
    setOpen(false);
    setShow(true);

    props.onUpdateDesignation(desdata, props.token);
    setCall(true);
    setData((prevstate) => ({
      designation: "",
      basic: 0.0,
    }));
  };

  const options = {
    filterType: "dropdown",
    rowsPerPageOptions: [5, 10, 15, 25, 50, 100],
    rowsPerPage: 5,
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
          <Alert severity="success">Designation Updated Succesfully.</Alert>
        </Snackbar>
      </div>
    );
  }

  return (
    <>
      {rows !== null ? (
        <>
          <Modal
            open={open}
            adddesignation={adddesignation}
            handleClose={handleClose}
            onChageHandle={onChageHandle}
            post={desdata}
          />
          <MUIDataTable
            title={"Designation List"}
            data={data}
            columns={columns}
            options={options}
          />
        </>
      ) : (
        <div style={{ margin: "180px 450px auto" }}>
          <CircularProgress />
        </div>
      )}
      {showsnak}
    </>
  );
}

const maptostate = (state) => {
  console.log(state.admin);
  return {
    token: state.auth.token,
    designations: state.admin.designation,
  };
};

const maptodispatch = (dispatch) => {
  return {
    OnFetchDesignation: (token) => dispatch(get_designations(token)),
    onUpdateDesignation: (data, token) =>
      dispatch(update_designation(data, token)),
  };
};
export default connect(maptostate, maptodispatch)(DesList);
