import React from 'react'
import { Link } from 'react-router-dom'

export default function Index() {
  return (
    <div>
      <Link to='/signup'>Sign up</Link>
      <Link to='/login'>Sign in</Link>
    </div>
  )
}
