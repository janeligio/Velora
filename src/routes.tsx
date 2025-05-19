import { createBrowserRouter, RouterProvider } from 'react-router';
import { RouteObject } from 'react-router';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';
import ErrorPage from './pages/Error/Error';
import AccountSettings from './pages/AccountSettings/AccountSettings';
import TableExample from './pages/TableExample/TableExample';

const routes: RouteObject[] = [
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'error', element: <ErrorPage /> },
      { path: 'account', element: <AccountSettings /> },
      { path: '*', element: <NotFound /> },
      { path: 'table-example', element: <TableExample /> }, // Example route for the table
    ],
  },
];

const router = createBrowserRouter(routes);

function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;
