import React from 'react'
import { useLocation } from 'react-router-dom'

export default function NotFound() {
  const { pathname } = useLocation()
  return (
    <div>
      <h1>Oops, {pathname} was not found.</h1>
    </div>
  )
}
