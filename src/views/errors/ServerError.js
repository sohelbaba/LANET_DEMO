import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  makeStyles
} from '@material-ui/core';
import {Navigate} from 'react-router-dom'
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const ServerError = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="500"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography
            align="center"
            color="textPrimary"
            variant="h1"
          >
            500 - OUR SERVER IS ON BREAK

          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="subtitle2"
          >
            Oops! There was internal Server Error. 
            Don't worry, our development team have automatically been notified of this issue and they are working on it. Please try again in few minutes.
          </Typography>
          <Box textAlign="center">
            {/* <img
              alt="Under development"
              className={classes.image}
              src=""
            /> */}
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default ServerError;
