import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function layout() {
  return (
    <div>
      <nav className='flex flex-col'>
        <Link to='/home'>Home</Link>
        <Link to='/profile'>Profile</Link>
        <Link to='/bookmarks'>Bookmarks</Link>
      </nav>
      <Outlet />
    </div>
  )
}
