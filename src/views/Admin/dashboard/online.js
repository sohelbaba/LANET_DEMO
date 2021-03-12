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
import DvrIcon from "@material-ui/icons/Dvr";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56,
  },
  differenceIcon: {
    color: colors.green[900],
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1),
  },
}));

const Online = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Completed Projects
            </Typography>
            <Typography color="textPrimary" variant="h3">
              32
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <DvrIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Online.propTypes = {
  className: PropTypes.string,
};

export default Online;
