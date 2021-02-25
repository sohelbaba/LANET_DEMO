import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Typography,
  Box,
  Grid,
  Divider,
  Drawer,
  Hidden,
  List,
  makeStyles
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import NavItem from './NavItem';
import {connect} from 'react-redux'

const getListItems = (role) =>{
  switch (role) {
    case 'Hr':
      return ([
          {
            href: '/hr/dashboard',
            icon: BarChartIcon,
            title: 'Dashboard'
          },
          {
            href: '/hr/attendance',
            icon: UsersIcon,
            title: 'Manage Attendance'
          },
          {
            href: '/hr/task',
            icon: AssignmentTurnedInOutlinedIcon,
            title: 'Manage Task'
          },
          {
            href: '/hr/leave',
            icon: UserIcon,
            title: 'Manage Leave'
          },
          {
            href: '/hr/salary',
            icon: AssignmentOutlinedIcon,
            title: 'Manage Salary'
          },
          {
            href: '/admin/settings',
            icon: SettingsIcon,
            title: 'Settings'
          }
        ])

    case 'Admin':
      return ([
            {
              href: '/admin/dashboard',
              icon: BarChartIcon,
              title: 'Dashboard'
            },
            {
              href: '/admin/employees',
              icon: UsersIcon,
              title: 'Manage Employees'
            },
            {
              href: '/admin/designation',
              icon: AssignmentTurnedInOutlinedIcon,
              title: 'Manage Designations'
            },
            {
              href: '/admin/leave',
              icon: UserIcon,
              title: 'Manage Leave'
            },
            {
              href: '/admin/salary',
              icon: AssignmentOutlinedIcon,
              title: 'Manage Salary'
            },
            {
              href: '/admin/designation',
              icon: UserPlusIcon,
              title: 'Manage Designation'
            },
            {
              href: '/admin/settings',
              icon: SettingsIcon,
              title: 'Settings'
            }
          ])

    case 'Employee':
      return ([
        {
          href: '/employee/dashboard',
          icon: BarChartIcon,
          title: 'Dashboard'
        },
        {
          href: '/employee/task',
          icon: AssignmentTurnedInOutlinedIcon,
          title: 'Task Desk'
        },
        {
          href: '/employee/leave',
          icon: UserIcon,
          title: 'Leave Desk'
        },
         {
          href: '/employee/changepassword',
          icon: SettingsIcon,
          title: 'Change Password'
        },
        
        // {
        //   href: '/employee/attendance',
        //   icon: UsersIcon,
        //   title: 'Manage Attendance'
        // },
        

       
      ])

    default:
      return null;
  }
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile, displayname}) => {
  const classes = useStyles();
  const role = localStorage.getItem('role')
  const user = {
    avatar: '/static/images/avatars/avatar_5.png',
    jobTitle: role,
  };


  const items = getListItems(role)
  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Avatar className={classes.avatar} src={user.avatar}/>
          </Grid>
          <Grid item xs={8}>
            <Typography color="textPrimary" variant="h5" style={{textTransform:'capitalize',margin:'12px auto'}}>
              {user.jobTitle}
            </Typography>
            
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (<NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

const maptostate = state =>{
  return {
    role : state.auth.role
  }
}
export default connect(maptostate)(NavBar);
