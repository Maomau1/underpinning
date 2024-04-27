import React from 'react';
import Projects from './pages/Projects';
import Project from './pages/Project';
import ErrorPage from './pages/ErrorPage';
import About from './pages/About';
import App from './App';
import NewProject from './pages/NewProject';
import Home from './pages/Home';

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
                path:"/project/:id",
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
            }
        ]
    }
]

export default routes
