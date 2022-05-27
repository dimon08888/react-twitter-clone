import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useUser } from '../providers/user-provider'

export default function Layout() {
  const navigate = useNavigate()
  const { setUser } = useUser()

  function handleLogout() {
    window.localStorage.removeItem('accessToken')
    setUser(null)
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
