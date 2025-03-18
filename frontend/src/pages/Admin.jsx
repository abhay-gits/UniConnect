import React from 'react'
import { Link, Outlet, useLocation } from 'react-router'

import Adminconfession from '../components/adminComponents/Adminconfession.jsx'
import AdminNotices from '../components/adminComponents/AdminNotices.jsx'

const Admin = () => {
  const location = useLocation()
  const paths = {
    '/admin':"Confession",
    '/admin/notice':"Notices"
  }
  return (
    <div>
      <h1 className='text-center bg-blue-400 py-2 text-white font-bold mb-2'>Admin Panel</h1>
      <div className='flex justify-around py-1'>
        <Link to='/admin' className='bg-blue-400 p-2 rounded-full px-3'>
          Confessions
        </Link>
        {paths[location.pathname]}
        <Link to='/admin/notice' className='bg-blue-400 p-2 rounded-full px-6'>
          Notices
        </Link>
      </div>
      <Outlet />
    </div>
  )
}

export default Admin