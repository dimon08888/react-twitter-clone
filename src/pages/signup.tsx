import React from 'react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
export default function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordRepeatRef = useRef<HTMLInputElement>(null)

  // function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault()
  //   const { username, email, password, passwordRepeat } = (e.target as any).elements
  //   console.log({
  //     username: username.value,
  //     email: email.value,
  //     password: password.value,
  //     passwordRepeat: passwordRepeat.value,
  //   })
  // }

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
