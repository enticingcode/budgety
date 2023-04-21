import React from 'react'
import { useLocation } from 'react-router-dom'
function ViewAll() {
    const location = useLocation();

    console.log(location);
  return (
    <h2>View All:</h2>
  )
}

export default ViewAll