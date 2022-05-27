import React from 'react'
import { useDocumentTitle } from '../app/utils'
import { useEffect } from 'react'

export default function Home() {
  useDocumentTitle('Home')

  useEffect(() => {
    const accessToken = window.localStorage.getItem('accessToken')

    fetch('http://localhost:5000/tweets', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then(response => response.json())
      .then(console.log)
  })

  return <div>Home</div>
}
