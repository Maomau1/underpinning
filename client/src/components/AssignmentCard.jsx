import React from 'react'

function AssignmentCard({assignments, handleDeleteClick}) {
    const assignmentDisplay = assignments.map((assignment)=>{
        return(
            <li>
                role:{assignment.role} | 
                <button onClick={()=>handleDeleteClick(assignment)}>delete role</button>
            </li>
        )
    })
  return (
    <div>
      {assignmentDisplay}
    </div>
  )
}

export default AssignmentCard
