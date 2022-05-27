import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import invariant from 'tiny-invariant'

const prisma = new PrismaClient()
const app = express()

app.use(cors())
app.use(express.json())

const JWT_SECRET = process.env.JWT_SECRET
invariant(JWT_SECRET, 'JWT_SECRET environment variable must be set.')

app.post('/signup', async (req, res) => {
  const { username, password } = req.body

  if ((await prisma.user.count({ where: { username } })) > 0) {
    return res.status(400).send({ message: 'User with this username already exists.' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({ data: { username, password: hashedPassword } })
  const { password: _, ...userWithoutPassword } = user

  res.json(userWithoutPassword)
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  const user = await prisma.user.findUnique({ where: { username } })
  if (user === null) {
    return res
      .status(401)
      .send({ message: 'No active account found with the given credentials.' })
  }

  const passwordMatches = await bcrypt.compare(password, user.password)
  if (!passwordMatches) {
    return res
      .status(401)
      .send({ message: 'No active account found with the given credentials.' })
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET)
  return res.json({ accessToken: token })
})

const tweets = [
  { id: 1, text: 'Tweet 1' },
  { id: 2, text: 'Tweet 2' },
]

// [METHOD] /path ? dfdf=ddvdf
// HEADERS
// Content-Type applicatoin/json
// Content-Length 86
// Authorization Bearer 2390490238jkldvsklds
// BODY

app.get('/tweets', (req, res) => {
  const authHeader = req.headers.authorization

  if (authHeader === undefined) {
    return res
      .status(401)
      .setHeader('WWW-Authenticate', 'Bearer')
      .send({ message: 'No authentication credentials provided.' })
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .setHeader('WWW-Authenticate', 'Bearer')
      .send({ message: 'No authentication credentials provided.' })
  }

  const token = authHeader.slice(7)

  jwt.verify(token, JWT_SECRET, async (err, payload) => {
    if (err) {
      return res
        .status(401)
        .setHeader('WWW-Authenticate', 'Bearer')
        .send({ message: 'Invalid token.' })
    }

    if (typeof payload === 'undefined' || typeof payload === 'string') {
      return res
        .status(401)
        .setHeader('WWW-Authenticate', 'Bearer')
        .send({ message: 'Invalid token.' })
    }

    const user = await prisma.user.findUnique({ where: { id: payload.id } })
    if (user === null) {
      return res
        .status(401)
        .setHeader('WWW-Authenticate', 'Bearer')
        .send({ message: 'Invalid token.' })
    }

    res.json(tweets)
  })

  // if user is not authenticated -> throw an error
  // else retreive tweets from the database
  // send them to the user
})

const PORT = process.env.PORT ?? 5000

app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}`)
})
