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

// admin components
import AdminDashBoardView from 'src/views/Admin/dashboard'
import EmployeesView from 'src/views/Admin/employee'
import DesignationView from 'src/views/Admin/Designation'
import TaskListView from 'src/views/Admin/task'
import LeaveListView from 'src/views/Admin/leave'

const routes  = (isLoggedIn,role) => [
  {
    path: 'employee',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to='/'/> ,
    children: [
      { path: 'dashboard', element: role === 'Employee' ? <AccountView /> : <Navigate to="/404" /> },
      { path: 'task', element: role === 'Employee' ? <TaskView /> : <Navigate to="/404" /> },
      { path: 'leave', element: role === 'Employee' ? <LeaveView /> : <Navigate to="/404"/> },
      { path: 'changepassword', element: role === 'Employee' ? <SettingsView /> : <Navigate to="/404"/> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'admin',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to='/'/> ,
    children: [
      { path: 'dashboard', element: role === 'Admin' ? <AdminDashBoardView /> : <Navigate to="/404" />},
      { path: 'employees', element: role === 'Admin' ? <EmployeesView /> : <Navigate to="/404" /> },
      { path: 'designation', element: role === 'Admin' ? <DesignationView /> : <Navigate to="/404" /> },
      { path: 'task', element: role === 'Admin' ? <TaskListView /> : <Navigate to="/404" />},
      { path: 'leave', element: role === 'Admin' ? <LeaveListView /> : <Navigate to="/404" />},
      { path: 'salary', element: <SettingsView /> },
      { path: 'changepassword', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'hr',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to='/'/> ,
    children: [
      { path: 'dashboard', element: <AccountView /> },
      { path: 'personal', element: <AccountView /> },
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
