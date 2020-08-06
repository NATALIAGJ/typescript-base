import express from 'express'

import {
  listExamples,
  addExample,
  addManyExamples,
  editExample,
  getExample,
  deleteEjemplo
} from '../controllers/ControllerEjemplo'

const EjemploRouter = express.Router()

EjemploRouter.get('/', listExamples)
EjemploRouter.post('/', addExample)
EjemploRouter.post('/bulk', addManyExamples)
EjemploRouter.put('/:id', editExample)
EjemploRouter.get('/:id', getExample)
EjemploRouter.delete('/:id', deleteEjemplo)

export default EjemploRouter