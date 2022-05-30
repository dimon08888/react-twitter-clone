import React, { useEffect, useState } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useDocumentTitle } from '../app/utils'
import { useUser } from '../providers/user-provider'

type Tweet = {
  id: number
  text: string
  createdAt: string
  userId: number
}

export default function Home() {
  useDocumentTitle('Home')
  const { user } = useUser()
  const { pathname } = useLocation()

  const [textarea, setTextarea] = useState('')
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const accessToken = window.localStorage.getItem('accessToken')

    fetch('http://localhost:5000/tweets', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then(response => response.json())
      .then(setTweets)
  }, [])

  if (user === undefined) {
    return null
  }

  if (user === null) {
    return <Navigate to={`/login?next=${pathname}`} />
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    const response = await fetch('http://localhost:5000/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({ text: textarea }),
    })
    const data = await response.json()
    setTweets([data].concat(tweets))

    setIsSubmitting(false)
    setTextarea('')
  }

  async function handleDelete(id: number) {
    const response = await fetch(`http://localhost:5000/tweets/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
    })
    if (response.ok) {
      setTweets(prevTweets => prevTweets.filter(tweet => tweet.id !== id))
    }
  }

  return (
    <div>
      <div>Home for {user.username}</div>
      <form onSubmit={handleSubmit}>
        <textarea
          maxLength={140}
          onChange={e => setTextarea(e.target.value)}
          value={textarea}
        ></textarea>
        <button type='submit' disabled={textarea.length === 0}>
          {isSubmitting ? 'Submitting...' : 'Tweet'}
        </button>
      </form>
      <ul>
        {tweets.map((tweet, i) => (
          <li key={i}>
            {tweet.text}
            {tweet.createdAt}
            <button onClick={() => handleDelete(tweet.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
