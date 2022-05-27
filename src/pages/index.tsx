import React from 'react'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../app/utils'

export default function Index() {
  useDocumentTitle('Social Network')

  // fetch('http://localhost:5000/login', {
  //   method: 'POST',
  //   body: JSON.stringify({ username: 'john', password: 'doe' }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
  //   .then(response => response.json())
  //   .then(data => console.log(data))

  return (
    <div>
      <Link to='/signup'>Sign up</Link>
      <Link to='/login'>Sign in</Link>
    </div>
  )
}
