import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'


const RootLayout = () => {
  return (
    <div className='w-full '>
      <Navbar />
      <section className='flex '>
        <Outlet />
      </section>
      <Footer />
    </div>
  )
}

export default RootLayout