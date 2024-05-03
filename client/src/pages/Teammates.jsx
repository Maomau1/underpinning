import React, {useState, useEffect} from 'react'
import TeammatesList from '../components/TeammatesList'
import NavBar from '../components/NavBar'
import { useFormik } from 'formik'
import * as yup from 'yup'


function Teammates() {
    const [teammates, setTeammates] = useState([])
    const [newTeammate, setNewTeammate] = useState({})

    useEffect(()=>{
        fetch('/api/teammates')
        .then((r)=> r.json())
        .then((data) => {
            console.log('teammates data',data)
            setTeammates(data)
        })
    },[])

    const formSchema = yup.object().shape({
        name:yup.string().required().min(3).max(15)
    })
    const teammateFormik = useFormik({
        initialValues:{
            name:""
        },
        validationSchema: formSchema,
        onSubmit:(values)=>{
            fetch('/api/teammates', {
                method: "POST",
                headers:{
                    "Content-Type":"Application/JSON"
                },
                body:JSON.stringify(values)
            })
            .then((r)=>{
                if(r.status == 201){
                    return r.json()}})
            .then((data)=>{
                console.log('newteammate', data)
                setNewTeammate(data)
                handleAddTeammate(data)
                teammateFormik.values.name=""}
                )
            .catch((error) => {
                console.error("Error:", error)})
            
        }

    })

    function handleAddTeammate(newTeammate){
        setTeammates([...teammates,newTeammate])
    }

    function handleDeleteTeammate(deleteTeammate){
        const updatedTeammates = teammates.filter((teammate)=>teammate.id !== deleteTeammate.id)
        console.log('updated teammates', updatedTeammates)
        setTeammates(updatedTeammates)
    }

    function handleDeleteClick(teammate){
        console.log(teammate)
        fetch(`/api/teammates/${teammate.id}`,{
            method:'DELETE',
        })
        .then((r)=>{
            if(r.status == 204){
                console.log('teammate deleted')
                handleDeleteTeammate(teammate)
            }
            else {
                throw new Error("deletion failed");
              }
        })
        .catch((error) => {
            console.error(error);
          })
    }
  return (
    <div>
      <header>
        <NavBar/>
      </header>
      <main>
        <h1>Teammates</h1>
        <TeammatesList teammates={teammates} handleDeleteClick={handleDeleteClick} />
        <br/>
        <form onSubmit={teammateFormik.handleSubmit} style = {{margin: "30px"}}>
            <h2>Add a teammate</h2>
            <label htmlFor='Teammate-name'>Name</label>
            
            <input 
            type='text'
            name='name'
            value={teammateFormik.values.name}
            onChange={teammateFormik.handleChange}
            onBlur={teammateFormik.handleBlur} />
            <p style = {{color: "red"}}> {teammateFormik.touched.name && teammateFormik.errors.name}</p>
            <br/>
            <button type='submit'>add teammate</button>
        </form>
      </main>
    </div>
  )
}

export default Teammates
