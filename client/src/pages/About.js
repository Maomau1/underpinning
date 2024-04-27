import React from 'react'
import NavBar from '../components/NavBar'

function About() {
    console.log("About rendering")
  return (
    <div>
      <header>
      <NavBar/>
      </header>
      <main>
        <h1>About this Concept</h1>
        <p>welcome to UFs first custom database system. this app shall
          be deployed in several phase in hope of adding functionalities
          at each phase.
          currently, you will find basic historical information on
          projects UFS has worked on. there is a form that will allow 
          you to add new projects to the existing list.
          potential updates: editing projects | add images | add a map 
          showing the location of the projects. 
        </p>
      </main>
    </div>
  )
}

export default About