import express from 'express'
import bodyParser from 'body-parser'
import { Application, Response, Request } from 'express'
import cors from 'cors'
import docs from './lib/docs'
// Modules
import example from './routes/example'

const swaggerUi = require('swagger-ui-express')

const app: Application = express()

app.use(bodyParser.urlencoded({ extended: false, limit: '500mb' }))
app.use(bodyParser.json({ limit: '500mb' }))

/** Cors */
app.use(cors())

app.all(['/', '/v1', '/v1/ping', '/ping'], (req: Request, res: Response) => {
    res.status(200).json({
      name: 'Snippet',
      provider: 'hangar.js',
      version: 'v1'
    })
})
// swagger-docs
// docs.generateDocFile(app)
const swaggerDoc = require('../swagger.json')
app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

// Router
app.use('/v1/example', example)

export default app