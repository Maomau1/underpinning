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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(()=>{
      fetch(`/api/projects/${projectID}`)
      .then((res)=> res.json())
      .then((data)=>{
        console.log(data)
        setProject(data)
        setIsLoaded(true)})
      .catch(error=>console.log(error))
  },[projectID])
  
  if (!isLoaded) 
  {return <h3>Loading...</h3>};

  console.log(project.assignments)
  const assignments = project.assignments
  const membersDisplay = assignments.map(assignment =>{
    return <li key = {assignment}>name: {assignment.teammate.name} | role: {assignment.role}</li>
  })
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
        <h3> Team</h3>
        <p>{membersDisplay}</p>
      </main>
    </div>
  )
}

export default Project


 //const projectToDisplay=project.find(project=>project.id===parseInt(projectID))
    //console.log(projectToDisplay)
    // useEffect(()=>{
    //     setProject(projectToDisplay)

    // },[projectID])
    //console.log(project.location)
