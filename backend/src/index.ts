import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import invariant from 'tiny-invariant'
import prisma from './utils/db'
import auth from './middleware/auth'

const JWT_SECRET = process.env.JWT_SECRET
invariant(JWT_SECRET, 'JWT_SECRET environment variable must be set.')

const app = express()

app.use(cors())
app.use(express.json())

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

  const { password: _, ...userWithoutPassword } = user
  const token = jwt.sign({ id: user.id }, JWT_SECRET)
  return res.json({ accessToken: token, user: userWithoutPassword })
})

app.get('/tweets', auth, async (req, res) => {
  const tweets = await prisma.tweet.findMany()
  res.json(tweets)
})

app.post('/tweets', auth, async (req, res) => {
  const { text } = req.body
  invariant(req.user !== undefined)

  const tweet = await prisma.tweet.create({
    data: { text, userId: req.user.id },
  })

  res.json(tweet)
})

app.delete('/tweets/:id', auth, async (req, res) => {
  const { id } = req.params
  console.log({ id })
  await prisma.tweet.delete({ where: { id: Number(id) } })
  res.status(204).send()
})

app.get('/users/:id', auth, async (req, res) => {
  const { id } = req.params
  const userData = await prisma.user.findUnique({ where: { id: Number(id) } })

  if (userData === null) {
    return res.status(404).send({ message: 'User does not exist.' })
  }

  const { password: _, ...userWithoutPassword } = userData
  res.send(userWithoutPassword)
})

const PORT = process.env.PORT ?? 5000

app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}`)
})
