import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useDocumentTitle } from '../app/utils'
import { useUser } from '../providers/user-provider'

export default function Bookmarks() {
  useDocumentTitle('Bookmarks')
  const { user } = useUser()
  const { pathname } = useLocation()

  if (user === undefined) {
    return null
  }

  if (user === null) {
    return <Navigate to={`/login?next=${pathname}`} />
  }

  return <div>Bookmarks for {user.username}</div>
}
