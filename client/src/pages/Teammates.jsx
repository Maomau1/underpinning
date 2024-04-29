import React, {useState, useEffect} from 'react'
import TeammatesList from '../components/TeammatesList'
import NavBar from '../components/NavBar'


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
      <header>
        <NavBar/>
      </header>
      <main>
        <h1>Teammates</h1>
        <TeammatesList teammates={teammates}/>
      </main>
    </div>
  )
}

export default Teammates
