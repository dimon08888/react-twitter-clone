import React from 'react'
import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import { useDocumentTitle } from '../app/utils'
// A custom hook is a function that has uses react useState() hook, accepts arguments, does something with them and returns something.

export default function Signup() {
  useDocumentTitle('Sign up')
  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordRepeatRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    document.title = 'Sign up'
  }, [])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log({
      username: usernameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      passwordRepeat: passwordRepeatRef.current?.value,
    })
  }

  return (
    <div className=''>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username</label>
          <input ref={usernameRef} type='text' id='username' name='username' />
        </div>

        <div>
          <label htmlFor='email'>Email</label>
          <input ref={emailRef} type='text' id='email' name='email' />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input ref={passwordRef} type='text' id='password' name='password' />
        </div>

        <div>
          <label htmlFor='password-repeat'>Password repeat</label>
          <input
            ref={passwordRepeatRef}
            type='text'
            id='password-repeat'
            name='passwordRepeat'
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
