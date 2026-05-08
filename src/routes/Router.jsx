import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../Layout';
import Dashboard from '../pages/Dashboard';
import Deposit from '../pages/Deposit';
import Extract from '../pages/Extract';
import Payment from '../pages/Payment';
import Transfer from '../pages/Transfer';
import Header from '../components/Header';
import Login from '../pages/Login';
import Index from '../pages/Index';
import Logout from '../pages/Logout';
import PaymentSlip from '../pages/PaymentSlip';
import DepositPaymentSlip from '../pages/DepositPaymentSlip';
import ErrorPage from '../components/ErrorBoundary';
import PrivateRoute from '../components/PrivateRoute';

export const router = createBrowserRouter([
  {
    element: <Header />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Index /> },
      { path: '/login', element: <Login /> },
    ],
  },
  {
    path: '/user',
    errorElement: <ErrorPage />,
    element: <PrivateRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'deposit', element: <Deposit /> },
          {
            path: 'deposit/paymentslip/detail',
            element: <DepositPaymentSlip />,
          },
          { path: 'extract', element: <Extract /> },
          { path: 'payment', element: <Payment /> },
          { path: 'payment/paymentslip/detail', element: <PaymentSlip /> },
          { path: 'transfer', element: <Transfer /> },
        ],
      },
      {
        path: 'error',
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: '/logout',
    element: <Logout />,
  },
  {
    path: '/error',
    element: <ErrorPage />,
  },
]);
