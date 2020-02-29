import mongoose from 'mongoose'
import express from 'express'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import session from 'express-session'
import {
  MONGO_URI, 
  MONGO_OPTIONS, 
  REDIS_OPTIONS, 
  SESSION_OPTIONS, 
  APP_PORT
} from './config'

;(async () => {
  await mongoose.connect(MONGO_URI, MONGO_OPTIONS)

  const RedisStore = connectRedis(session)
  const client = new Redis(REDIS_OPTIONS)

  const app = express()

  app.use(
    session({
      ...SESSION_OPTIONS, 
      store: new RedisStore({client})
    })
  )

  app.get('/', (req, res) => res.json({message: 'beep beep boop!'}))

  app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}`))

})()

