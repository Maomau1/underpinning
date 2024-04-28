import React from 'react';
import { Link } from 'react-router-dom';

function ProjectCard({name, id, image}) {
 // console.log("ProjectCard rendering")
 // console.log(name,id)
  return (
    <article>
      <h2>{name}</h2>
      {/*<img src={image} alt={name}/>*/} 
      {<Link to={`/projects/${id}`}>View Details</Link>}
    </article>
  )
}

export default ProjectCard