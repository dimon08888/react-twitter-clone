import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '../app/utils'

//

export default function Login() {
  useDocumentTitle('Log in')
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          setError(data.message)
        } else {
          window.localStorage.setItem('accessToken', data.accessToken)
          navigate('/home')
        }
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div role='alert' className='text-red-500'>
          {error}
        </div>
      )}
      <div>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div>
        Don't have an account? <Link to='/signup'>Sign up</Link>
      </div>
      <button type='submit'> Log in</button>
    </form>
  )
}
