import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import EventsPage from './pages/EventsPage/EventsPage';
import SpeakersPage from './pages/SpeakersPage/SpeakersPage';
import SponsorsPage from './pages/SponsorsPage/SponsorsPage';
import SpeakerDetail from './pages/SpeakerDetail/SpeakerDetail';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';

import "./index.css"

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/about",
        element: <AboutPage />,
    },
    {
        path: "/speakers",
        children: [
            {
                index: true,
                element: <SpeakersPage />,
            },
            {
                path: "/speakers/:speakerId",
                element: <SpeakerDetail />
            },
        ],
    },
    {
        path: "/events",
        element: <EventsPage />
    },
    {
        path: "/sponsors",
        element: <SponsorsPage />
    },
    {
        path: "/contact",
        element: <ContactPage />
    },
    {
        path: "/auth/login",
        element: <Login />
    },
    {

        path: "/auth/signup",
        element: <SignUp />
    },
])

/**
 * The createRoot() function takes the target DOM element 
 * as an argument and returns a root component that can be
 * used to render React elements into that target element.
 * 
 * In this case, a root React component is created that will
 * render its content inside the <div> element with the
 * "root" ID.
 */
createRoot(document.getElementById("root")).render(
    // RouterProvider takes a prop, router, and it
    // available to the entire application, enabling
    // navigation based on the defined routes.
    <RouterProvider router={router} />
)