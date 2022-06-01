import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '../app/utils'
import { useUser } from '../providers/user-provider'

export default function Signup() {
  useDocumentTitle('Sign up')
  const { user } = useUser()

  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const json = await response.json()
      if (!response.ok) {
        throw new Error(json.message)
      }
      navigate('/login')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }

  if (user === undefined) {
    return null
  }

  if (user !== null) {
    return <Navigate to='/home' />
  }

  return (
    <div className=''>
      {error ? (
        <div role='alert' className='text-red-600'>
          User already exist
        </div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            name='username'
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <label htmlFor='password-repeat'>Password repeat</label>
          <input
            type='password'
            id='password-repeat'
            name='passwordRepeat'
            onChange={e => setPasswordRepeat(e.target.value)}
            value={passwordRepeat}
          />
        </div>

        <button type='submit'>Create account</button>
      </form>
      <div>
        Already have an account? <Link to='/login'>Log In</Link>
      </div>
    </div>
  )
}
