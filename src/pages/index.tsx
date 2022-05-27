import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useDocumentTitle } from '../app/utils'
import { useUser } from '../providers/user-provider'

export default function Index() {
  useDocumentTitle('Social Network')
  const { user } = useUser()

  if (user === undefined) {
    return null
  }

  if (user !== null) {
    return <Navigate to='/home' />
  }

  return (
    <div>
      <Link to='/signup'>Sign up</Link>
      <Link to='/login'>Sign in</Link>
    </div>
  )
}
