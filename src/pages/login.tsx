import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <form>
      <div>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input type='text' id='password' />
      </div>
      <div>
        Don't have an account? <Link to='/signup'>Sign up</Link>
      </div>
    </form>
  )
}
