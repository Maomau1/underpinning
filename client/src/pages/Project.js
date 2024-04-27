import React, {useState, useEffect} from 'react'
import NavBar from '../components/NavBar'
import { useParams } from 'react-router-dom'

function Project() {
    console.log("Project Display")
    const [project, setProject]=useState({});
    console.log(project)
    const params =useParams();
    const projectID=params.id;
    console.log(projectID)

    useEffect(()=>{
        fetch(`http://localhost:3000/projects/${projectID}`)
        .then(res=>res.json())
        .then(data=>setProject(data))
        .catch(error=>console.log(error))
    },[projectID])
    
    //const projectToDisplay=project.find(project=>project.id===parseInt(projectID))
    //console.log(projectToDisplay)
    // useEffect(()=>{
    //     setProject(projectToDisplay)

    // },[projectID])
    //console.log(project.location)
    if (project=={}){
        return <h1>Loading...</h1>
    }
  return (
    <div>
      <header>
        <NavBar/>
      </header>
      <main>
        <h1>Project Details</h1>
        <h2>{project.name}</h2>
        <h3>{project.location}</h3>
        <p>{project.description}</p>
      </main>
    </div>
  )
}

export default Project
