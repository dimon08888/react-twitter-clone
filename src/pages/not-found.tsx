import React from 'react'
import { useLocation } from 'react-router-dom'
import { useDocumentTitle } from '../app/utils'

export default function NotFound() {
  useDocumentTitle('Not found')
  const { pathname } = useLocation()
  return (
    <div>
      <h1>Oops, {pathname} was not found.</h1>
    </div>
  )
}
