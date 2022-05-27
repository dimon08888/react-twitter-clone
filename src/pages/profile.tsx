import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useDocumentTitle } from '../app/utils'
import { useUser } from '../providers/user-provider'

export default function Profile() {
  useDocumentTitle('Profile')

  const { pathname } = useLocation()
  const { user } = useUser()

  if (user === undefined) {
    return null
  }

  if (user === null) {
    return <Navigate to={`/login?next=${pathname}`} />
  }

  return <div>Profile for {user.username}</div>
}
