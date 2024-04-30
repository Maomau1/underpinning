import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'
import TeammateCard from '../components/TeammateCard'


function TeammateId() {
    const params = useParams()
    const teammateId = params.id
    const [teammate, setTeammate] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(()=>{
        fetch(`/api/teammates/${teammateId}`)
        .then((r)=>r.json())
        .then((data)=>{
            console.log('single teammate data', data)
            setTeammate(data)
            setIsLoaded(true)
        })
    },[teammateId])

    if(!isLoaded) return <h1>...loading</h1>
    // const teammateProjectsDisplay = teammate.projects.map((project) =>{
    //     return <li key={project.id}>{project.name}</li>
    // })
    

  return (
    <div>
      <header>
        <NavBar/>
      </header>
      <main>
        {/* <h1>Teammate Profile </h1>
        <h2>Name: {teammate.name}</h2>
        <ul>{teammateProjectsDisplay}</ul> */}
        <TeammateCard teammate={teammate}/>
        
      </main>
    </div>
  )
}

export default TeammateId
