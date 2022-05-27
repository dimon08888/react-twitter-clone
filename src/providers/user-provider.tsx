import React from 'react'
import decode from 'jwt-decode'

type User = {
  id: number
  username: string
  bio: string
  image: string | null
  createdAt: string
}

type UserContextType = {
  user: User | null | undefined
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>
}

const UserContext = React.createContext<UserContextType | undefined>(undefined)

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null | undefined>()
  const value = React.useMemo(() => ({ user, setUser }), [user])

  React.useEffect(() => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken === null) {
      setUser(null)
      return
    }

    const payload = decode(accessToken)
    if (typeof payload !== 'object' || payload === null || !('id' in payload)) {
      window.localStorage.removeItem('accessToken')
      setUser(null)
      return
    }

    const { id } = payload as { id: number | string }

    fetch(`http://localhost:5000/users/${id}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then(response => response.json().then(json => ({ response, json })))
      .then(({ response, json }) => {
        if (response.status === 401) {
          window.localStorage.removeItem('accessToken')
          setUser(null)
        } else {
          setUser(json)
        }
      })
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const value = React.useContext(UserContext)

  if (typeof value === 'undefined') {
    throw new Error('useUser() must be used within <UserProvider />>')
  }

  return value
}
