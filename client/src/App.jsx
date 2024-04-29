import React, {useState, useEffect} from 'react';
import './App.css';
import { Outlet, useNavigate} from 'react-router-dom'


function App() {
  const [projects, setProjects]=useState([])

    useEffect(()=>{
      fetch('/api/projects')
      .then(res=>res.json())
      .then(data=>setProjects(data))
      .catch(error=>console.log(error))
    },[])

  console.log("App rendering",projects)
  const navigate = useNavigate();
  function handleClick(e){
    console.log(e.target.value)
    navigate(`${e.target.value}`)
  }

  function handleDeleteProject(deletedProject) {
    const updatedProjects = projects.filter((project)=> project.id !== deletedProject.id);
    setProjects(updatedProjects);
  }

  function handleUpdateProject(updateProject) {
    const updatedProjects = projects.map((project)=>{
      if (project.id == updateProject){ 
        return updateProject}
      else{
        return project
      }
    })
    setProjects(updatedProjects);
  }
  function handleNewProject(projectAdded){
    console.log(projectAdded)
    // const newProject = {...projectAdded,description:"Hello Nancy"}
   setProjects([...projects,projectAdded])
  }
  return (<>
  <Outlet context={{
    projects:projects, 
    handleNewProject: handleNewProject, 
    handleDeleteProject: handleDeleteProject,
    handleUpdateProject: handleUpdateProject}}/>
  </>
  );
}

export default App;


// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App