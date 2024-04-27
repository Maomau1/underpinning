import React, {useState, useEffect} from 'react'
import ProjectCard from '../components/ProjectCard'
import NavBar from '../components/NavBar'
import { useOutletContext } from 'react-router-dom'

function Projects() {
  const {projects} = useOutletContext(); 
  //console.log(projects)

  console.log("Home rendering")
  if (projects==null){
    console.log("nothing to show")
    return<h1>loading</h1>
  }
  
  const projectsToDisplay=projects.map(project=>{
             // console.log(project)
            return <article key={project.id}><ProjectCard name={project.name} id={project.id}/></article>
          })
          return (
            <div>
              <header>
                <NavBar/>
              </header>
              <main>
              <h2>I am the UFS Engineering Home</h2>
              {projectsToDisplay}
              
              </main>
            </div>
           )
//        // }
//      //  }
//     //</MyConsumer>

}
export default Projects