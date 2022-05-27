import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'

export default function Layout() {
  const navigate = useNavigate()

  function handleLogout() {
    window.localStorage.removeItem('accessToken')
    navigate('/login')
  }

  return (
    <div>
      <nav className='flex flex-col'>
        <Link to='/home'>Home</Link>
        <Link to='/profile'>Profile</Link>
        <Link to='/bookmarks'>Bookmarks</Link>
      </nav>
      <Outlet />
      <button onClick={handleLogout}>Log out</button>
    </div>
  )
}
