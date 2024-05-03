import React from 'react'

function AssignmentCard({assignments, handleDeleteClick}) {
    const assignmentDisplay = assignments.map((assignment)=>{
      if(assignment.project.name)console.log(assignment.project.name)
        return(
            <article key={assignment.id}>
                <br/>
                Role: {assignment.role}<br/>
                Project: {assignment.project.name?assignment.project.name:""}<br/>
                Teammate: {assignment.teammate.name}<br/> 
                <button onClick={()=>handleDeleteClick(assignment)}>delete role</button>
                <br/>
            </article>
        )
    })
  return (
    <div>
      {assignmentDisplay}
    </div>
  )
}

export default AssignmentCard
