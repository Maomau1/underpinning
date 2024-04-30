import React from 'react'
import { Link } from "react-router-dom"

function TeammatesList({teammates, handleDeleteClick}) {
    const teammatesDisplay = teammates.map((teammate) =>{
        return (
            <li key={teammate.id}>{teammate.name}   |   <span/><Link
            to={`/teammates/${teammate.id}`}>View Profile</Link>
            <button onClick={()=>handleDeleteClick(teammate)}>delete profile</button>
            </li>
            
        )
    })
  return (
    <ul>
      {teammatesDisplay}
    </ul>
  )
}

export default TeammatesList
