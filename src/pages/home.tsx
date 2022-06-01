import React, { useEffect, useRef, useState } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useDocumentTitle } from '../app/utils'
import { useUser } from '../providers/user-provider'

type Tweet = {
  id: number
  text: string
  createdAt: string
  userId: number
  likes: ReadonlyArray<Like>
}

type Like = {
  userId: number
  tweetId: number
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

  async function handleLike(id: number) {
    const response = await fetch(`http://localhost:5000/tweets/${id}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
    })
    const data = await response.json()
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
        {tweets.map(tweet => {
          const isLiked = tweet.likes.some(like => like.userId === user.id)
          return (
            <li key={tweet.id}>
              {tweet.text}
              {isLiked ? (
                <div>Liked: {tweet.likes.length}</div>
              ) : (
                <div>
                  <button onClick={() => handleLike(tweet.id)}>Like</button>
                  {tweet.likes.length}
                </div>
              )}
              {tweet.createdAt}
              <DropDownMenu tweet={tweet} handleDelete={handleDelete} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function DropDownMenu({
  tweet,
  handleDelete,
}: {
  tweet: Tweet
  handleDelete: (id: Tweet['id']) => void
}) {
  const [show, setShow] = useState(false)
  const dropMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!dropMenuRef.current?.contains(e.target as HTMLElement)) {
        setShow(false)
      }
    }

    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  })

  return (
    <div ref={dropMenuRef} className='inline-block'>
      <button onClick={() => setShow(!show)}>...</button>
      {show && (
        <ul>
          <li>
            <button>Pin</button>
          </li>
          <li>
            <button onClick={() => handleDelete(tweet.id)}>Delete</button>
          </li>
        </ul>
      )}
    </div>
  )
}
