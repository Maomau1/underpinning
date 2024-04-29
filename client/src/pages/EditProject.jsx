import React, {useState, useEffect} from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import NavBar from '../components/NavBar'
import { useOutletContext, useNavigate } from 'react-router-dom';

function EditProject({project, handleUpdateProject}) {
    const navigate=useNavigate();
    // const {handleUpdateProject, projects}=useOutletContext()

    const formSchema = yup.object().shape({
        name: yup.string().required("must enter project name").max(15),
        location: yup.string().required(),
        description: yup.string().min(20).max(250).required("description is required")
    });
    const formik = useFormik({
        initialValues: {
            name: project.name,
            location: project.location,
            description: project.description,
            teammates: [
                project.assignments[0].teammate.name,
                project.assignments[1].teammate.name,
                project.assignments[2].teammate.name],
            assignments: [
                project.assignments[0].role,
                project.assignments[1].role,
                project.assignments[2].role,]
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log(values)
            fetch("/api/projects", {
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
                    navigate(`../projects/${data.id}`)
                    })
                .catch((error) => {
                    console.error("Error:", error)
                });
        },
        })
        console.log(formik.values.teammates, formik.values.assignments)
        
    return (
            <>
            <header>
                <NavBar/>
            </header>
            <form onSubmit={formik.handleSubmit} style = {{margin: "30px"}}>
            <h2>Edit Project: {project.name}</h2>

            <label htmlFor="project-name ">Project Name</label>
            <input 
            type="text" 
            name="name" 
            value={formik.values.name} 
            placeholder='Project Name' 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}/>
            <p style = {{color: "red"}}> {formik.errors.email}</p>
            <br/>

            <label htmlFor='project-location '>Project Location</label>
            <select 
            name="location" 
            value={formik.values.location} 
            id="location" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}>Project Location
                <option value="New York">New York, NY</option>
                <option value="Brooklyn">Brooklyn, NY</option>
                <option value="Queens">Queens, NY</option>
                <option value="Bronx">Bronx, NY</option>
                <option value="Staten Island">Staten Island, NY</option>
                <option value="Long Island">Long Island, NY</option>
                <option value="New Jersey">New Jersey</option>
            </select>
            <p style = {{color: "red"}}> {formik.touched.location && formik.errors.location}</p>
            <br/>

            <label htmlFor= "project-team"> Project Team</label> 
            <br/>
            <select 
            name = "teammates[0]"
            value = {formik.values.teammates[0]}
            id = "teammates[0]"
            onChange={formik.handleChange}>teammates
                <option value = "">Select Member</option>
                <option value = "Maurice">Maurice</option>
                <option value = "Mickey">Mickey</option>
            </select> 
            <span/>
            <select
            name = "assignments[0]"
            value = {formik.values.assignments[0]}
            onChange={formik.handleChange}>
                <option value = "">Select Role</option>
                <option value = "QS"> Quality staff</option>
                <option value = "Engineer">Engineer</option>
            </select>
            <br/>
            <select 
            name = "teammates[1]"
            value = {formik.values.teammates[1]}
            id = "teammates[1]"
            onChange={formik.handleChange}>teammates
                <option value = "">Select Member</option>
                <option value = "Maurice">Maurice</option>
                <option value = "Mickey">Mickey</option>
            </select>
            <span/>
            <select
            name = "assignments[1]"
            value = {formik.values.assignments[1]}
            onChange={formik.handleChange}>
                <option value = "">Select Role</option>
                <option value = "QS"> Quality staff</option>
                <option value = "Engineer">Engineer</option>
            </select>
            <br/>
            <select 
            name = "teammates[2]"
            value = {formik.values.teammates[2]}
            id = "teammates[2]"
            onChange={formik.handleChange}>teammates
                <option value = "">Select Member</option>
                <option value = "Maurice">Maurice</option>
                <option value = "Mickey">Mickey</option>
            </select>
            <span/>
            <select
            name = "assignments[2]"
            value = {formik.values.assignments[2]}
            onChange={formik.handleChange}>
                <option value = "">Select Role</option>
                <option value = "QS"> Quality staff</option>
                <option value = "Engineer">Engineer</option>
            </select>
                       
            <br/>
            <br/>
            
            <label 
            htmlFor="project-description">Project Description</label>
            <br/>
            <textarea 
            type="text" 
            name='description' 
            value={formik.values.description} 
            placeholder='Project description' 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}></textarea>
            <p style = {{color: "red"}}> {formik.touched.description && formik.errors.description}</p>
            <br/>
            <button type="submit">Add Project</button>
        </form>
        </>
    )
}

export default EditProject