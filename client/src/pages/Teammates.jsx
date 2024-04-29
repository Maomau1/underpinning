import React, {useState, useEffect} from 'react'
import TeammatesList from '../components/TeammatesList'

function Teammates() {
    const [teammates, setTeammates] = useState([])

    useEffect(()=>{
        fetch('/api/teammates')
        .then((r)=> r.json())
        .then((data) => {
            console.log('teammates data',data)
            setTeammates(data)
        })
    },[])
  return (
    <div>
      
    </div>
  )
}

export default Teammates
