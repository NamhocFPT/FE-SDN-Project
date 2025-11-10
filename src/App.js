import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AllRoute from './components/AllRoute/index';
import AdminLayout from "./pages/Admin/AdminLayout/AdminLayout";
import DashboardPage from "./pages/Admin/Dashboard/DashboardPage";
import OrderListPage from "./pages/Admin/OrderList/OrderListPage";
import UserListPage from "./pages/Admin/UserList/UserListPage";
function App() {
  return (
    <BrowserRouter>
      <AllRoute></AllRoute>
    </BrowserRouter>
  );
}

export default App;