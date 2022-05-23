import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/layout'
import Index from './pages'
import Bookmarks from './pages/bookmarks'
import Home from './pages/home'
import Login from './pages/login'
import NotFound from './pages/not-found'
import Profile from './pages/profile'
import Signup from './pages/signup'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Layout />}>
          <Route path='home' element={<Home />} />
          <Route path='profile' element={<Profile />} />
          <Route path='bookmarks' element={<Bookmarks />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
