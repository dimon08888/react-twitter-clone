import React from 'react'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../app/utils'
export default function Index() {
  useDocumentTitle('Social Network')
  return (
    <div>
      <Link to='/signup'>Sign up</Link>
      <Link to='/login'>Sign in</Link>
    </div>
  )
}
