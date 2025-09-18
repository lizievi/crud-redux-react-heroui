import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App.jsx";
import UserForm from "./Pages/UserForm.jsx";
import UsersTable from "./Pages/UsersTable.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <UsersTable />,
      },
      {
        path: "/form",
        element: <UserForm />,
      },
    ],
  },

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
