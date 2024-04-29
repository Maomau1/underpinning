import React from 'react'

function TeammateCard({teammate}) {
    console.log(teammate)
    console.log(teammate.assignments)
    const projectsDisplay = teammate.assignments.map((assignment)=>{
        return (
            <li key={assignment.id}>{assignment.project.name} role: {assignment.role}</li>
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
