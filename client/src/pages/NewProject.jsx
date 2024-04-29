import React, {useState, useEffect} from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import NavBar from '../components/NavBar'
import { useOutletContext, useNavigate, useFetcher } from 'react-router-dom';

function NewProject() {
    const [refreshPage, setRefreshPage] = useState(false);
    const navigate=useNavigate();
    const {handleNewProject}=useOutletContext()

    const formSchema = yup.object().shape({
        name: yup.string().required("must enter project name").max(25).min(5),
        location: yup.string().required().min(2).max(20),
        description: yup.string().min(20).max(250).required("description is required")
    });
    const formik = useFormik({
        initialValues: {
            name: "",
            location: "",
            description: "",
            teammates: [],
            assignments: []
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log('form submitted',values)
            fetch("/api/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),}
                )
                .then ((res) => {
                    if (res.status == 201) {
                        console.log(res.status, res)
                        return res.json()}}
                        )
                .then ((data) => {
                    console.log(data)
                    handleNewProject(data)
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
            <h2>New Project Form</h2>

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

export default NewProject


// return (
//     <>
//     <header>
//         <NavBar/>
//     </header>
//     <form onSubmit={handleSubmit}>
//     <h2>New Project Form</h2>
//     <label htmlFor="project-name ">Project Name</label>
//     <input type="text" name="name" value={formData.name} placeholder='Project Name' onChange={handleChange}/>
//     <br/>
//     <label htmlFor='project-location '>Project Location</label>
//     <select name="location" value={formData.location} id="" onChange={handleChange}>Project Location
//         <option value="New York">New York, NY</option>
//         <option value="Brooklyn">Brooklyn, NY</option>
//         <option value="Queens">Queens, NY</option>
//         <option value="Bronx">Bronx, NY</option>
//         <option value="Staten Island">Staten Island, NY</option>
//         <option value="Long Island">Long Island, NY</option>
//         <option value="New Jersey">New Jersey</option>
//     </select>
//     <br/>
//     <label htmlFor="project-description">Project Description</label>
//     <textarea type="text" name='description' value={formData.description} placeholder='Project description' onChange={handleChange}></textarea>
//     <br/>
//     <button type="submit">Add Project</button>
// </form>
// </>
// )


// export default NewProject


// function NewProject() {
//     const navigate=useNavigate();
//     const {handleNewProject}=useOutletContext()
//     console.log(handleNewProject)
//     const [formData, setFormData]=useState({
//         name:"",
//         location:"New York, NY",
//         description:"",
//     })
//     function handleChange(e){
        
//         const name=e.target.name;
//         let value=e.target.value;
//         setFormData({...formData,
//         [name]:value})
//         //console.log(formData)
//     }
//     function handleSubmit(e){
//         e.preventDefault()
//         //console.log(formData)
//         const newData=formData
//         //console.log(newData)
//         const configObj={
//             method:'POST',
//             headers:{'Content-Type':'application/json'},
//             body:JSON.stringify(newData)
//         }
//         fetch('/api/projects',configObj)
//         .then(res=>res.json())
//         .then((data)=>{
//             console.log(data)
//             handleNewProject(data)
//             navigate(`../projects/${data.id}`)
//             })

//         const clearForm={...formData,
//             name:"",
//             location:"New York, NY",
//             description:"",
//         }

//         setFormData(clearForm)
//     }
    //console.log(formData)