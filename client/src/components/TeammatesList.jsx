import React from 'react'

function TeammatesList({teammates}) {
    const teammatesDisplay = teammates.map((teammate) =>{
        return (
            <li key={teammate.id}>{teammate.name}</li>
        )
    })
  return (
    <ul>
      {teammatesDisplay}
    </ul>
  )
}

export default TeammatesList
