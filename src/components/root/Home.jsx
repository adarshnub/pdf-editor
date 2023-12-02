import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
    <div className='flex flex-col gap-8 font-bold'>
    <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
    </div>
  )
}

export default Home