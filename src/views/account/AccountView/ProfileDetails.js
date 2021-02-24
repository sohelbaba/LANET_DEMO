import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Form from './Forms/Form'
import AddressForm from './Forms/AddressForm'
import QualificationForm from './Forms/Qualification'
import SalaryForm from './Forms/SalaryForm'

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <span>{children}</span>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function ProfileDetails() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
        >
          <Tab label="Personal Details"  />
          <Tab label="Address Details"  />
          <Tab label="Qualification Details"  />
          <Tab label="Salary Details" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Form/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddressForm/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <QualificationForm/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SalaryForm/>
      </TabPanel>
    </div>
  );
}

export default ProfileDetails