import React from 'react'

function TeammateCard({teammate}) {
    const projectsDisplay = teammate.projects.map((project)=>{
        return (
            <li key={project.id}>{project.name}</li>
        )
    })
  return (
    <article>
      <h1>Teammate Profile</h1>
      <h2>name: {teammate.name}</h2>
      <h3>Projects:
        <ul>{projectsDisplay}</ul>
      </h3>
    </article>
  )
}

export default TeammateCard
