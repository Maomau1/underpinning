import React, { useState, useEffect} from 'react'
import NavBar from '../components/NavBar'
import AssignmentCard from '../components/AssignmentCard'
import {useFormik} from "formik"
import * as yup from 'yup'
import { useOutletContext, } from 'react-router-dom';



function Assignments() {

    // const [assignments, setAssignments] = useState([])
    // const [teammates, setTeammates] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);

    const {projects, teammates, assignments, setAssignments, setTeammates} =  useOutletContext()
    console.log('we go the teammates', teammates)

    const assignmentFormSchema = yup.object().shape({
        role:yup.string().required().min(2).max(10)
    })

    const assignmentFormik = useFormik({
        initialValues:{
            role:"",
            project:"",
            teammate:""
        },
        validationSchema:assignmentFormSchema,
        onSubmit:(values)=>{
            fetch('/api/assignments', {
                method:"POST",
                headers:{
                    "Content-Type":"application/JSON"
                },
                body:JSON.stringify(values)
            })
            .then((r)=>{
                if(r.status == 201){
                    return r.json()}})
            .then((data)=>{
                console.log("IM BACK", data)
                setAssignments([...assignments, data])
            })
            .catch((error)=>console.log('check this',error))
        }
    })

    function handleDeleteClick(deleteAssignment){
        console.log(deleteAssignment)
    }
// if (!isLoaded) {
//     return<h1>...loading</h1>}
  return (
    <div>
        <header>
            <NavBar/>
        </header>
        <main>
            <h1>Assigments</h1>
            <form onSubmit={assignmentFormik.handleSubmit}>
                <h2>Add Assignment</h2>
                <label htmlFor='assignment-role'>Enter new assignment role</label>
                <input 
                type='text'
                name='role'
                value={assignmentFormik.values.role}
                onChange={assignmentFormik.handleChange}
                />
                <p style = {{color: "red"}}> 
                {assignmentFormik.touched.role && assignmentFormik.errors.role}
                </p>
                
                 <select
                 name = "project"
                 value = {assignmentFormik.values.project}
                 onChange={assignmentFormik.handleChange}>
                    {projects.map((project) => (
                    <option key={project.id} value={project.name}>{project.name}</option>))}
                 </select>
                 <select
                 name='teammate'
                 value={assignmentFormik.values.teammate}
                 onChange={assignmentFormik.handleChange}>
                    <option value="">Select teammate</option>
                    {teammates.map((teammate)=>(
                    <option key={teammate.id} value={teammate.name}>{teammate.name}</option>))}
                 </select>
                 <button type='submit'>submit</button>
            </form>
            <br/>
            <h2>Posted assignments</h2>
            <AssignmentCard 
            assignments={assignments} 
            handleDeleteClick={handleDeleteClick}/>

        </main>
    </div>
  )
}

export default Assignments



    // useEffect(()=>{
    //     Promise.all([
    //         fetch('/api/assignments')
    //         .then((r)=> r.json()),
    //         fetch('/api/teammates')
    //         .then((r)=>r.json())])
    //         .then(([data1, data2]) => {
    //             setAssignments(data1)
    //             setTeammates(data2)
    //             setIsLoaded(!isLoaded)
    //             })
    //             .catch((error)=> {
    //                 console.error('Error fetching data:', error);
    //             });             
    // },[])