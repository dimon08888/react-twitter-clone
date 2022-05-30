import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import invariant from 'tiny-invariant'
import prisma from '../utils/db'

const JWT_SECRET = process.env.JWT_SECRET
invariant(JWT_SECRET, 'JWT_SECRET environment variable must be set.')

const auth = (req: Request, res: Response, next: NextFunction) => {
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

    req.user = user
    next()
  })
}

export default auth
