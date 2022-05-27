import React from 'react'
import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '../app/utils'
// A custom hook is a function that has uses react useState() hook, accepts arguments, does something with them and returns something.

export default function Signup() {
  useDocumentTitle('Sign up')
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [error, setError] = useState(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json().then(json => ({ response, json })))
      .then(({ response, json }) => {
        if (response.status === 400) {
          setError(json.message)
        } else {
          navigate('/login')
        }
      })
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
