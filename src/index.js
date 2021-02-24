import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux'
import {createStore,applyMiddleware,combineReducers,compose} from 'redux'
import thunk from 'redux-thunk'
// ------------------------------------------------------------------------
import * as serviceWorker from './serviceWorker';
import App from './App';
import AuthReducer from './store/reducer/Auth'
import UserReducer from './store/reducer/User'

const rootReducer =combineReducers({
  auth : AuthReducer,
  user : UserReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
