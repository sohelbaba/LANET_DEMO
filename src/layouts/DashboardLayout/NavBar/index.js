import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  Hidden,
  List,
  makeStyles
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  Users as UsersIcon
} from 'react-feather';
import ListRoundedIcon from '@material-ui/icons/ListRounded';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import NavItem from './NavItem';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {connect} from 'react-redux'
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

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
              icon: HowToRegIcon,
              title: 'Manage Designations'
            },
            {
              href: '/admin/task',
              icon: AssignmentIcon,
              title: 'Manage Task'
            },
            {
              href: '/admin/leave',
              icon: TransferWithinAStationIcon,
              title: 'Manage Leave'
            },
            {
              href: '/admin/salary',
              icon: AccountBalanceWalletIcon,
              title: 'Manage Salary'
            },
            {
              href: '/admin/changepassword',
              icon: SettingsIcon,
              title: 'Change Password'
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
          icon: TransferWithinAStationIcon,
          title: 'Leave Desk'
        },
        {
          href: '/employee/salary',
          icon: AccountBalanceWalletIcon,
          title: 'Salary Desk'
        },
        {
          href: '/employee/history',
          icon: ListRoundedIcon,
          title: 'History Desk'
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
