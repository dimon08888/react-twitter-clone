import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AssertionError } from 'assert'

const prisma = new PrismaClient()
const app = express()

app.use(cors())
app.use(express.json())

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  throw new AssertionError({ message: 'JWT_SECRET environment variable must be set.' })
}

app.post('/signup', async (req, res) => {
  const { username, password } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({ data: { username, password: hashedPassword } })
  const { password: _, ...userWithoutPassword } = user

  res.json(userWithoutPassword)
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await prisma.user.findUnique({ where: { username } })
  if (user === null) {
    return res.status(401).send({ message: 'Invalid username and/or password.' })
  }

  const passwordMatches = await bcrypt.compare(password, user.password)
  if (!passwordMatches) {
    return res.status(401).send({ message: 'Invalid username and/or password.' })
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET)
  return res.json({ accessToken: token })
})

const PORT = process.env.PORT ?? 5000

app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}`)
})
