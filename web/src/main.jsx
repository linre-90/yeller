import React from 'react'
import ReactDOM from 'react-dom/client'
import{ createBrowserRouter, RouterProvider } from "react-router-dom"
import { Root } from "./routes/root"
import { JoinRoom } from './routes/joinroom'
import { Chat } from './routes/chat'
import { Help } from './routes/help'
import "./App.css"

// Application pages, components are in routes directory.
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>
    },
    {
        path: "/join",
        element: <JoinRoom/>
    },
    {
        path: "/help",
        element: <Help/>
    },
    {
        path: "/chat/:room/:user",
        element: <Chat/>
    }
]);

// Render in strict mode
if(import.meta.env.VITE_ENABLE_STRICT_MODE === "1"){
    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>,
    )
}else{
    console.log("Strict mode disabled.")
    ReactDOM.createRoot(document.getElementById('root')).render(
        <RouterProvider router={router} />
    )
}


