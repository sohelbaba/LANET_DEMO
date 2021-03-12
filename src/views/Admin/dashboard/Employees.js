import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
} from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.lightBlue[600],
    height: 56,
    width: 56,
  },
  differenceIcon: {
    color: colors.lightBlue[900],
  },
  differenceValue: {
    color: colors.lightBlue[900],
    marginRight: theme.spacing(1),
  },
}));

const Employees = ({ className, NoOfemployees, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Employees
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {NoOfemployees.employees !== null
                ? NoOfemployees.employees.Employees.length
                : 0}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <GroupIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Employees.propTypes = {
  className: PropTypes.string,
};

const maptostate = (state) => {
  return {
    NoOfemployees: state.admin,
  };
};
export default connect(maptostate)(Employees);
