import React from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';

import {connect} from 'react-redux'
import {logout_start} from '../../store/action/Auth'

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  },
  font:{
    // color: theme.palette.text.secondary,
    justifyContent: 'flex-start',
    letterSpacing: 1.2,
    padding: '10px 8px',
    textTransform: 'capitalize',
    fontWeight: theme.typography.fontWeightMedium,
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  onLogout,
  token,
  username,
  ...rest
  
}) => {
  const classes = useStyles();
  const navigate = useNavigate()

  const logoutHandler = () =>{
    try{
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      onLogout(token)
    }catch(error){
      console.log(error)
    }
    navigate('/',{replace:true})
  }
  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
          <Logo />
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit" onClick={logoutHandler}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

const maptosatate = state =>{
  return {
    token : state.auth.token
  }
}

const maptodispatch = dispatch =>{
  return {
    onLogout : (token) => dispatch(logout_start(token))
  }
}
export default connect(maptosatate,maptodispatch)(TopBar);
