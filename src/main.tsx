import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/error";
import Authentication from "./pages/auth";
import AuthPage from "./components/auth";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Account from "./pages/account";
import Loading from "./pages/loading";
import Layout from "./components/layouts";
import Settings from "./pages/settings";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "Quicksand",
  },
});

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
      },

      {
        path: "auth",
        element: <Authentication />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "login",
            element: <AuthPage initType="login" />,
          },
          {
            path: "register",
            element: <AuthPage initType="register" />,
          },
        ],
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "*",
        element: <ErrorPage error="404: Page not found." />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Provider store={store}>
        <RouterProvider router={router} fallbackElement={<Loading />} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
