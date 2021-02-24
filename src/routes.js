import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import ServerError from 'src/views/errors/ServerError'
import NotFoundView from 'src/views/errors/NotFoundView';
import LeaveView from 'src/views/leave';
import TaskView from 'src/views/task';
import ProductListView from 'src/views/product/ProductListView';
import SettingsView from 'src/views/settings/SettingsView';

const routes  = (isLoggedIn) => [
  {
    path: 'employee',
    element: <DashboardLayout />,
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to='/'/> ,
    children: [
      { path: 'dashboard', element: <AccountView /> },
      { path: 'task', element: <TaskView /> },
      { path: 'leave', element: <LeaveView /> },
      { path: 'changepassword', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'admin',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to='/'/> ,
    children: [
      { path: 'dashboard', element: <AccountView /> },
      { path: 'attendance', element: <CustomerListView /> },
      { path: 'task', element: <DashboardView /> },
      { path: 'leave', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'salary', element: <SettingsView /> },
      { path: 'designation', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'hr',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to='/'/> ,
    children: [
      { path: 'dashboard', element: <AccountView /> },
      { path: 'attendance', element: <CustomerListView /> },
      { path: 'task', element: <DashboardView /> },
      { path: 'leave', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'salary', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    children: [
      { path: '/', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '500', element : <ServerError/>},
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
