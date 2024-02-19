import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import AdminPage from "./pages/Admin/AdminPage/AdminPage";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import CreateSpeaker from "./pages/Admin/Speakers/CreateSpeaker";
import UpdateSpeaker from "./pages/Admin/Speakers/UpdateSpeaker";
import ViewSpeakers from "./pages/Admin/Speakers/ViewSpeakers";
import Venues from "./pages/Admin/Venues/Venues";
import Schedules from "./pages/Admin/Schedules/Schedules";
import Sponsors from "./pages/Admin/Sponsors/Sponsors";
import Events from "./pages/Admin/Events/Events";
import DeleteSpeaker from "./pages/Admin/Speakers/DeleteSpeaker";
import "./index.css";
import LoginForm from "./pages/Admin/Dashboard/LoginForm";


const router = createBrowserRouter([
  {

    path: "/admin",
    element: <AdminPage/>,
    children: [

      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/speakers",
        element: <ViewSpeakers />,
        // element: <CreateSpeaker />,
      },
      {
        path: "/admin/login",
        element: <LoginForm />
        //element: <ViewSpeakers />,
        // element: <CreateSpeaker />,
      },
      {
        path: "/admin/dashboard",
        element: <Dashboard />
      },
      {
        path: "/admin/speakers/update/:speakerId",
        element: <UpdateSpeaker />,
      },
      {
        path: "/admin/speakers/delete/:speakerId",
        element: <DeleteSpeaker />,
      },
      {
        path: "/admin/venues",
        //element: <Venues />,
      },
      {
        path: "/admin/events",
       // element: <Events />,
      },
      {
        path: "/admin/schedules",
        //element: <Schedules />,
      },
      {
        path: "/admin/sponsors",
        //element: <Sponsors />,
      },

    ],


  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);