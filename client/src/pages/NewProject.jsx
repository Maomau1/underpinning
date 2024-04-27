import React, {useState} from 'react'
import NavBar from '../components/NavBar'
import { useOutletContext, useNavigate } from 'react-router-dom';

function NewProject() {
    const navigate=useNavigate();
    const {handleNewProject}=useOutletContext()
    console.log(handleNewProject)
    const [formData, setFormData]=useState({
        name:"",
        location:"New York, NY",
        description:"",
    })
    function handleChange(e){
        
        const name=e.target.name;
        let value=e.target.value;
        setFormData({...formData,
        [name]:value})
        //console.log(formData)
    }
    function handleSubmit(e){
        e.preventDefault()
        //console.log(formData)
        const newData=formData
        //console.log(newData)
        const configObj={
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(newData)
        }
        fetch('http://localhost:3000/projects',configObj)
        .then(res=>res.json())
        .then(data=>{
            handleNewProject(data)
            navigate(`../project/${data.id}`)
            })

        const clearForm={...formData,
            name:"",
            location:"New York, NY",
            description:"",
        }

        setFormData(clearForm)
    }
    //console.log(formData)
    return (
        <>
        <header>
            <NavBar/>
        </header>
        <form onSubmit={handleSubmit}>
        <h2>New Project Form</h2>
        <label htmlFor="project-name ">Project Name</label>
        <input type="text" name="name" value={formData.name} placeholder='Project Name' onChange={handleChange}/>
        <br/>
        <label htmlFor='project-location '>Project Location</label>
        <select name="location" value={formData.location} id="" onChange={handleChange}>Project Location
            <option value="New York">New York, NY</option>
            <option value="Brooklyn">Brooklyn, NY</option>
            <option value="Queens">Queens, NY</option>
            <option value="Bronx">Bronx, NY</option>
            <option value="Staten Island">Staten Island, NY</option>
            <option value="Long Island">Long Island, NY</option>
            <option value="New Jersey">New Jersey</option>
        </select>
        <br/>
        <label htmlFor="project-description">Project Description</label>
        <textarea type="text" name='description' value={formData.description} placeholder='Project description' onChange={handleChange}></textarea>
        <br/>
        <button type="submit">Add Project</button>
    </form>
    </>
  )
}

export default NewProject
