import express from 'express'
import bodyParser from 'body-parser'
import { Application, Response, Request } from 'express'
import cors from 'cors'

// Modules
import ejemplo from './routes/ejemplo'

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

app.get('/', ( req: Request, res: Response ) => {
    res.send('Hello Snippet');
} )

// Enrutadores
app.use('/v1/ejemplo', ejemplo)

export default app