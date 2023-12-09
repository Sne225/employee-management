import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import List from './pages/EmployeeList';
import { useAuthState as onAuthStateChanged  } from 'firebase/auth';
import { auth } from './firebase';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  // Add a loading state to wait for authentication check
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Check if the user is authenticated
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }

      // Set loading to false once authentication check is complete
      setLoading(false);
    });

    // Unsubscribe from the auth state changes when the component unmounts
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className='spinner'>Loading...</div>;
  }

  return authenticated ? element : <Navigate to="/" />;
};



const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute element={<App />} />,
    children: [
      {
        index: true,
        element: <Outlet />,
        children: [
          { path: 'home', element: <PrivateRoute element={<Home />} /> },
          { path: 'list', element: <PrivateRoute element={<List />} /> },
        ],
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/list",
    element: <List />,
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
