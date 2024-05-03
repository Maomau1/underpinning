import React, {useState, useEffect} from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import NavBar from '../components/NavBar'
import { useOutletContext, useNavigate } from 'react-router-dom';

function EditProject({project, handleUpdateProject,teammates, setIsEdit, isEdit, setProject}) {
    const navigate=useNavigate();

    const formSchema = yup.object().shape({
        name: yup.string().required("must enter project name").max(15),
        location: yup.string().required(),
        description: yup.string().min(20).max(250).required("description is required")
    });


    const formikEdit = useFormik({
        initialValues: {
            name: project.name,
            location: project.location,
            description: project.description,
            teammates: project.teammates.map((teammate=>teammate.name)),
            
            assignments: project.assignments.map((assignment)=>assignment.role),
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log(values)
            fetch(`/api/projects/${project.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),}
                )
                .then ((res) => {
                    if (res.status == 200) {
                        console.log(res.status, res)
                        return res.json()}}
                        )
                .then ((data) => {
                    console.log(data)
                    handleUpdateProject(data)
                    setIsEdit(!isEdit)
                    setProject(data)
                    
                    // navigate(`../projects/${data.id}`)
                    })
                .catch((error) => {
                    console.error("Error:", error)
                });
                
                
        },
        })
        console.log(formikEdit.values.teammates, formikEdit.values.assignments)
        
    return (
            <>
            <header>
                <NavBar/>
            </header>
            <form onSubmit={formikEdit.handleSubmit} style = {{margin: "30px"}}>
            <h2>Edit Project: {project.name}</h2>

            <label htmlFor="project-name ">Project Name</label>
            <input 
            type="text" 
            name="name" 
            value={formikEdit.values.name} 
            placeholder='Project Name' 
            onChange={formikEdit.handleChange}
            onBlur={formikEdit.handleBlur}/>
            <p style = {{color: "red"}}> {formikEdit.errors.email}</p>
            <br/>

            <label htmlFor='project-location '>Project Location</label>
            <select 
            name="location" 
            value={formikEdit.values.location} 
            id="location" 
            onChange={formikEdit.handleChange}
            onBlur={formikEdit.handleBlur}>Project Location
                <option value="New York">New York, NY</option>
                <option value="Brooklyn">Brooklyn, NY</option>
                <option value="Queens">Queens, NY</option>
                <option value="Bronx">Bronx, NY</option>
                <option value="Staten Island">Staten Island, NY</option>
                <option value="Long Island">Long Island, NY</option>
                <option value="New Jersey">New Jersey</option>
            </select>
            <p style = {{color: "red"}}> {formikEdit.touched.location && formikEdit.errors.location}</p>
            <br/>

            <label htmlFor= "project-team"> Project Team</label> 
            <br/>
            <select 
            name = "teammates[0]"
            value = {formikEdit.values.teammates[0]}
            id = "teammates[0]"
            onChange={formikEdit.handleChange}>teammates
                <option value = "">Select Member</option>
                {teammates.map((teammate)=>(
                    <option key={teammate.id} value={teammate.name}>{teammate.name}</option>
                ))}
            </select> 
            <span/>
            <select
            name = "assignments[0]"
            value = {formikEdit.values.assignments[0]}
            onChange={formikEdit.handleChange}>
                <option value = "">Select Role</option>
                <option value = "Quality staff"> Quality staff</option>
                <option value = "Engineer">Engineer</option>
                <option value = "Operation">Operations</option>
                <option value = "Estimator">Estimator</option>
            </select>
            <br/>
            <select 
            name = "teammates[1]"
            value = {formikEdit.values.teammates[1]}
            id = "teammates[1]"
            onChange={formikEdit.handleChange}>teammates
                <option value = "">Select Member</option>
                {teammates.map((teammate)=>(
                    <option key={teammate.id} value={teammate.name}>{teammate.name}</option>
                ))}
            </select>
            <span/>
            <select
            name = "assignments[1]"
            value = {formikEdit.values.assignments[1]}
            onChange={formikEdit.handleChange}>
                <option value = "">Select Role</option>
                <option value = "Quality staff"> Quality staff</option>
                <option value = "Engineer">Engineer</option>
                <option value = "Operation">Operations</option>
                <option value = "Estimator">Estimator</option>
            </select>
            <br/>
            <select 
            name = "teammates[2]"
            value = {formikEdit.values.teammates[2]}
            id = "teammates[2]"
            onChange={formikEdit.handleChange}>teammates
                <option value = "">Select Member</option>
                {teammates.map((teammate)=>(
                    <option key={teammate.id} value={teammate.name}>{teammate.name}</option>
                ))}
            </select>
            <span/>
            <select
            name = "assignments[2]"
            value = {formikEdit.values.assignments[2]}
            onChange={formikEdit.handleChange}>
                <option value = "Quality staff"> Quality staff</option>
                <option value = "Engineer">Engineer</option>
                <option value = "Operation">Operations</option>
                <option value = "Estimator">Estimator</option>
            </select>
                       
            <br/>
            <br/>
            
            <label 
            htmlFor="project-description">Project Description</label>
            <br/>
            <textarea 
            type="text" 
            name='description' 
            value={formikEdit.values.description} 
            placeholder='Project description' 
            onChange={formikEdit.handleChange}
            onBlur={formikEdit.handleBlur}></textarea>
            <p style = {{color: "red"}}> {formikEdit.touched.description && formikEdit.errors.description}</p>
            <br/>
            <button type="submit">Add Project</button>
        </form>
        </>
    )
}

export default EditProject


//     const teammates = [] 
//     for (let i=0; i<project.assignment.length; i++) {
//         teammates [i]= project.assignment[i].teammate.name
//         console.log (teammates)
//     }

//     const assignments = []
//     for (let i=0; i<project.assignments.length; i++){
//         assignments[i] = project.assignments[i].role
//         console.log(assignments)
//     }

//    for (const [i, element] of teammates.entries())
//    {
//     <select 
//             name = {`teammates[${i}]`}
//             value = {formikEdit.values.teammates[0]}
//             id = "teammates[0]"
//             onChange={formikEdit.handleChange}>teammates
//                 <option value = "">Select Member</option>
//                 <option value = "Maurice">Maurice</option>
//                 <option value = "Mickey">Mickey</option>
//                 <option value = "Ana">Ana</option>
//             </select> }

    // if (teammates == []){
        
    //     for (let i=0; i<teammates.length; i++) {
    //         console.log (teammates)
    //         teammates [i]= teammates[i].name
    //     }
    // }

    // const assignments = project.assignments
    // if (assignments == []){
    //     assignments = assignments
    // }
    // else{
    //     for (let i=0; i<assignments.length; i++) {
    //         console.log (assignments)
    //         assignments [i]= assignments[i].role
    //     }
    // }