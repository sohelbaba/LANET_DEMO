import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import format from "date-fns/format";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { connect } from "react-redux";
import { fetch_leaves_start } from "src/store/action/Admin";

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
  image: {
    height: 48,
    width: 48,
  },
});

const LatestProducts = ({
  className,
  OnLeavesGet,
  token,
  role,
  leaves,
  ...rest
}) => {
  const classes = useStyles();
  React.useEffect(() => {
    OnLeavesGet(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let arr = [];
  if (leaves !== null) {
    if (role === "Admin") {
      leaves.Leaves.map((val) =>
        val["Status"] === "Forward" ? arr.push(val) : null
      );
    }
    if (role === "Hr") {
      leaves.Leaves.map((val) =>
        val["Status"] === "Pending" ? arr.push(val) : null
      );
      console.log(arr);
    }
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Leave Request List" />
      <Divider />
      <List>
        {arr.length !== 0 ? (
          arr.map((val, i) => (
            <ListItem divider={i < arr.length - 1} key={val.id}>
              <ListItemText
                primary={val.Username}
                secondary={
                  "Apply on " +
                  format(new Date(val["Apply Date"]), "EEE, dd MMM yyyy")
                }
              />
              <IconButton edge="end" size="small">
                <MoreVertIcon />
              </IconButton>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText>No Pending Request</ListItemText>
          </ListItem>
        )}
      </List>
      <Divider />
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string,
};

const maptostate = (state) => {
  console.log(state.auth);
  return {
    token: state.auth.token,
    role: state.auth.role,
    leaves: state.admin.AllLeaves,
  };
};

const maptodispatch = (dispatch) => {
  return {
    OnLeavesGet: (token) => dispatch(fetch_leaves_start(token)),
  };
};

export default connect(maptostate, maptodispatch)(LatestProducts);
