import React from "react";
import LeaveList from "./LeaveList";
import Page from "src/components/Page";
import { makeStyles, Container, Card } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import LeaveView from "../../leave";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const LeaveIndex = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page className={classes.root} title="Leaves">
      <Container>
        {props.role === "Admin" ? (
          <LeaveList />
        ) : (
          <>
            <Paper square>
              <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
              >
                <Tab label="All Leaves List " />
                <Tab label="Apply Leave" />
              </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
              <LeaveList />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Card>
                <LeaveView />
              </Card>
            </TabPanel>
          </>
        )}
      </Container>
    </Page>
  );
};

const maptostate = (state) => {
  return {
    role: state.auth.role,
  };
};

export default connect(maptostate)(LeaveIndex);
