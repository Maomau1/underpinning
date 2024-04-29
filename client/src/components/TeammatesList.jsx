import React from 'react'
import { Link } from "react-router-dom"

function TeammatesList({teammates}) {
    const teammatesDisplay = teammates.map((teammate) =>{
        return (
            <li key={teammate.id}>{teammate.name}   |   <span/><Link
            to={`/teammates/${teammate.id}`}>View Profile</Link></li>
        )
    })
  return (
    <ul>
      {teammatesDisplay}
    </ul>
  )
}

export default TeammatesList
