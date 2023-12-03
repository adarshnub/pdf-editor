import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'


const RootLayout = () => {
  return (
    <div className='w-full px-10'>
      <Navbar />
      <section className='flex flex-1 h-full'>
        <Outlet />
      </section>
      <Footer />
    </div>
  )
}

export default RootLayout