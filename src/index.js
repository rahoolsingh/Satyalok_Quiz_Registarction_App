import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Success from "./Pages/Success";
import Pass from "./Pages/Pass";
import QuizForm from "./Pages/QuizForm";
import Check from "./Pages/Check";
import Closed from "./Pages/Closed";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path:"register",
        element: <QuizForm />,
    },
    {
        path: "/check",
        element: <Check />,
    },
    {
        path: "/success",
        children: [
            {
                path: ":passId",
                element: <Success />,
            },
            {
                path: "pass/:passId",
                element: <Pass />,
            },
        ],
    },
]);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
