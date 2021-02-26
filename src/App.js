import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import {AutoSignInCheck} from './store/action/Auth'
import {connect} from 'react-redux'


const App = ({onAutoSignIn}) => {

  const token = localStorage.getItem('token') 
  const role = localStorage.getItem('role')

  const routing = useRoutes(routes(token !== null,role));

  React.useEffect(() =>{
    onAutoSignIn()
  })

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

const maptodispatch =dispatch =>{
  return {
      onAutoSignIn: () => dispatch(AutoSignInCheck()),
  }
}

export default connect(null,maptodispatch)(App);
