import { Request, Response, NextFunction }  from 'express'

import chalk from 'chalk'
import MongoDb from './lib/mongo'
import logger from './lib/logger'
import app from './index'
import http from 'http'
import dotenv from 'dotenv'

dotenv.config();

const port = process.env.SERVER_PORT

const figlet = require('figlet')
const server = http.createServer(app)

MongoDb.connect()

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.estado === 500) {
    logger.error(err.original)
    res.status(500).json({
      mensaje: 'Service not available'
    })
  } else {
    res.status(err.estado).json({
      mensaje: err.mensaje
    })
  }
})

app.use((req: Request, res: Response) => {
  res.status(404).json({
    mensaje: 'Resource not found'
  })
})

server.listen(port, () => {
  figlet('TYPESCRIPT - API', (err: any, figletText: any) => {
    if (err) {
      throw err
    }
    process.stdout.write(chalk.yellow(figletText + '\n'))
    logger.info(`API is running on: ${port}`)
  })
})