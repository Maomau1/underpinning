import React, {useState, useEffect} from 'react'
import NavBar from '../components/NavBar'
import NewProject from './NewProject'
import { Navigate, useNavigate, useParams, useOutletContext } from 'react-router-dom'
import EditProject from './EditProject'

function Project() {
  console.log("Project Display")
  const [project, setProject]=useState({});
  console.log(project)
  const params =useParams();
  const projectID=params.id;
  console.log(projectID)
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate()
  const {handleDeleteProject, handleUpdateProject} = useOutletContext()
  const [isEdit, setIsEdit] = useState(false)

  useEffect(()=>{
      fetch(`/api/projects/${projectID}`)
      .then((res)=> res.json())
      .then((data)=>{
        console.log(data)
        setProject(data)
        setIsLoaded(true)})
      .catch(error=>console.log(error))
  },[projectID])

  function handleDeleteClick() {
    console.log(project)
    fetch(`/api/projects/${projectID}`, {
      method: "DELETE",
    })
    .then ((r) => {
      if(r.status == 204) {
        console.log("deleted!")
        handleDeleteProject(project)
        navigate("../projects")
      }
      else {
        throw new Error("deletion failed");
      }
    })  
    .catch((error) => {
      console.error(error);
    })
  }

  function handleUpdateClick(){
    setIsEdit(!isEdit)
  
    
    // fetch(`/api/projects/${projectID}`,{
    //   method: "PATCH",
    //   headers:{
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({

    //   })
    // })

  }
  
  if (!isLoaded) 
  {return <h3>Loading...</h3>};

  if(isEdit)
  {
    return <EditProject 
    project = {project}
    setProject={setProject} 
    handleUpdateProject={handleUpdateProject}
    setIsEdit={setIsEdit}
    isEdit={isEdit}/>
  }
  // console.log(project.assignments)
  const assignments = project.assignments
  const membersDisplay = assignments.map(assignment =>{
    return <li key = {assignment.id}>name: {assignment.teammate.name} | role: {assignment.role}</li>
  })
  return (
    <div>
      <header>
        <NavBar/>
      </header>
      <main>
        <h1>Project Details</h1>
        <button onClick = {handleDeleteClick}>delete project</button>
        <span/>
        <button onClick={ handleUpdateClick }>edit project</button>
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
