import express from 'express'

import {
  listExamples,
  addExample,
  addManyExamples,
  editExample,
  getExample,
  deleteExample
} from '../controllers/ControllerExample'

const ExampleRouter = express.Router()

ExampleRouter.get('/', listExamples)
ExampleRouter.post('/', addExample)
ExampleRouter.post('/bulk', addManyExamples)
ExampleRouter.put('/:id', editExample)
ExampleRouter.get('/:id', getExample)
ExampleRouter.delete('/:id', deleteExample)

export default ExampleRouter