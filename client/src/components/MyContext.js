// import React, { useState, useEffect} from 'react'
// import { createContext } from 'react'

// const myContext=createContext()

// const MyProvider = (props)=>{
// const [projects, setProjects]=useState([])

//     useEffect(()=>{
//       fetch('http://localhost:3000/projects')
//       .then(res=>res.json())
//       .then(data=>setProjects(data))
//       .catch(error=>console.log(error))
//     },[])

// return (<myContext.Provider value={{
//     projects:projects}}>
//         {props.children}
//         </myContext.Provider>)
// }

// const MyConsumer = myContext.Consumer

// export { MyProvider, MyConsumer }

