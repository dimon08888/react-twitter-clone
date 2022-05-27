import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '../app/utils'
import { useUser } from '../providers/user-provider'

export default function Home() {
  useDocumentTitle('Home')
  const { user } = useUser()
  const { pathname } = useLocation()

  if (user === undefined) {
    return null
  }

  if (user === null) {
    return <Navigate to={`/login?next=${pathname}`} />
  }

  // useEffect(() => {
  //   const accessToken = window.localStorage.getItem('accessToken')

  //   fetch('http://localhost:5000/tweets', {
  //     headers: {
  //       Authorization: 'Bearer ' + accessToken,
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(console.log)
  // })

  return <div>Home for {user.username}</div>
}
