import React from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "src/layouts/DashboardLayout";

import SettingsView from "src/views/settings/SettingsView";
import LoginView from "src/views/auth/LoginView";
import ServerError from "src/views/errors/ServerError";
import NotFoundView from "src/views/errors/NotFoundView";

//employe components
import AccountView from "src/views/account/AccountView";
import LeaveView from "src/views/leave";
import TaskView from "src/views/task";
import SalaryView from "src/views/salary";
import HistoryView from "src/views/history";

// admin components
import AdminDashBoardView from "src/views/Admin/dashboard";
import EmployeesView from "src/views/Admin/employee";
import DesignationView from "src/views/Admin/Designation";
import TaskListView from "src/views/Admin/task";
import LeaveListView from "src/views/Admin/leave";
import SalaryListView from "src/views/Admin/salary";

//reports
import SalaryReportView from "src/views/reports/report/Salary";
import TaskReportView from "src/views/reports/report/Tasks";
import LeaveReportView from "src/views/reports/report/Leave";
import EmployeeReportView from "src/views/reports/report/Employee";

const routes = (isLoggedIn, role) => [
  {
    path: "employee",
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/" />,
    children: [
      {
        path: "dashboard",
        element: role === "Employee" ? <AccountView /> : <Navigate to="/404" />,
      },
      {
        path: "task",
        element: role === "Employee" ? <TaskView /> : <Navigate to="/404" />,
      },
      {
        path: "leave",
        element: role === "Employee" ? <LeaveView /> : <Navigate to="/404" />,
      },
      {
        path: "salary",
        element: role === "Employee" ? <SalaryView /> : <Navigate to="/404" />,
      },
      {
        path: "history",
        element: role === "Employee" ? <HistoryView /> : <Navigate to="/404" />,
      },
      {
        path: "changepassword",
        element:
          role === "Employee" ? <SettingsView /> : <Navigate to="/404" />,
      },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "admin",
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/" />,
    children: [
      {
        path: "dashboard",
        element:
          role === "Admin" ? <AdminDashBoardView /> : <Navigate to="/404" />,
      },
      {
        path: "employees",
        element: role === "Admin" ? <EmployeesView /> : <Navigate to="/404" />,
      },
      {
        path: "designation",
        element:
          role === "Admin" ? <DesignationView /> : <Navigate to="/404" />,
      },
      {
        path: "task",
        element: role === "Admin" ? <TaskListView /> : <Navigate to="/404" />,
      },
      {
        path: "leave",
        element: role === "Admin" ? <LeaveListView /> : <Navigate to="/404" />,
      },
      {
        path: "salary",
        element: role === "Admin" ? <SalaryListView /> : <Navigate to="/404" />,
      },
      {
        path: "changepassword",
        element: role === "Admin" ? <SettingsView /> : <Navigate to="/404" />,
      },
      {
        path: "reports/employee",
        element:
          role === "Admin" ? <EmployeeReportView /> : <Navigate to="/404" />,
      },
      {
        path: "reports/tasks",
        element: role === "Admin" ? <TaskReportView /> : <Navigate to="/404" />,
      },
      {
        path: "reports/leave",
        element:
          role === "Admin" ? <LeaveReportView /> : <Navigate to="/404" />,
      },
      {
        path: "reports/salary",
        element:
          role === "Admin" ? <SalaryReportView /> : <Navigate to="/404" />,
      },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "hr",
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/" />,
    children: [
      {
        path: "dashboard",
        element:
          role === "Hr" ? <AdminDashBoardView /> : <Navigate to="/404" />,
      },
      {
        path: "profile",
        element: role === "Hr" ? <AccountView /> : <Navigate to="/404" />,
      },
      {
        path: "employees",
        element: role === "Hr" ? <EmployeesView /> : <Navigate to="/404" />,
      },
      {
        path: "task",
        element: role === "Hr" ? <TaskListView /> : <Navigate to="/404" />,
      },
      {
        path: "leave",
        element: role === "Hr" ? <LeaveListView /> : <Navigate to="/404" />,
      },
      {
        path: "salary",
        element: role === "Hr" ? <SalaryListView /> : <Navigate to="/404" />,
      },
      {
        path: "changepassword",
        element: role === "Hr" ? <SettingsView /> : <Navigate to="/404" />,
      },
      {
        path: "reports/employee",
        element:
          role === "Hr" ? <EmployeeReportView /> : <Navigate to="/404" />,
      },
      {
        path: "reports/tasks",
        element: role === "Hr" ? <TaskReportView /> : <Navigate to="/404" />,
      },
      {
        path: "reports/leave",
        element: role === "Hr" ? <LeaveReportView /> : <Navigate to="/404" />,
      },
      {
        path: "reports/salary",
        element: role === "Hr" ? <SalaryReportView /> : <Navigate to="/404" />,
      },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    children: [
      { path: "/", element: <LoginView /> },
      { path: "404", element: <NotFoundView /> },
      { path: "500", element: <ServerError /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
