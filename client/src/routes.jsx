import React from 'react';
import Projects from './pages/Projects';
import Project from './pages/Project';
import ErrorPage from './pages/ErrorPage';
import About from './pages/About';
import App from './App';
import NewProject from './pages/NewProject';
import Home from './pages/Home';
import Teammates from './pages/Teammates';
import TeammateId from './pages/TeammateId';
import Assignments from './pages/Assignments';
import Assignment from './pages/Assignment';

const routes= [
    {
        path:"/",
        element:<App/>,
        errorElement:<ErrorPage/>,
        children: [

            {
                path:"/",
                element:<Home/>,
               // errorElement:<ErrorPage/>
            },
            {
                path:"/projects",
                element:<Projects/>,
                //errorElement:<ErrorPage/>
            },
            {
                path:"/projects/:id",
                element:<Project/>,
                //errorElement:<ErrorPage/>
            },
            {
                path:"/about",
                element:<About/>,
                //errorElement:<ErrorPage/>
            },
            {
                path:"/newproject",
                element:<NewProject/>,
                //errorElement:<ErrorPage/>
            },
            {
                path:"/teammates",
                element:<Teammates/>,
            },
            {
                path:"teammates/:id",
                element:<TeammateId/>,
            },
            {
                path:"/assignments",
                element:<Assignments/>,
            },
        ]
    }
]

export default routes
