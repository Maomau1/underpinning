import React, { useState, useEffect} from 'react'
import NavBar from '../components/NavBar'
import { } from 'react-router-dom'
import AssignmentCard from '../components/AssignmentCard'


function Assignments() {

    const [assignments, setAssignments] = useState([])

    useEffect(()=>{
        fetch('/api/assignments')
        .then((r)=> r.json())
        .then((data)=> setAssignments(data))
    },[])

    function handleDeleteClick(deleteAssignment){
        console.log(deleteAssignment)
    }

  return (
    <div>
        <header>
            <NavBar/>
        </header>
        <main>
            <AssignmentCard assignments={assignments} handleDeleteClick={handleDeleteClick}/>
        </main>
      
    </div>
  )
}

export default Assignments
