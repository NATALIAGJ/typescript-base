import { Request, Response, NextFunction } from 'express'
import ExampleService from '../services/ServiceEjemplo'
import { IExample } from '../schemas/SchemaExample'

const uuid = require('uuid-base62')
const exampleService = new ExampleService()

export async function listExamples (req: Request, res: Response, next: NextFunction) {
  try {
    const { tags } = req.query
    const examples = await exampleService.getExamples(tags)

    res.status(200).json({
      examples
    })
  } catch (error) {
    next({ estado: 500, original: error })
  }
}

export async function addExample (req: Request, res: Response, next: NextFunction) {
  try {
    const example = req.body as IExample
    example.id = uuid.v4()

    const newExample = await exampleService.createExample(example)

    res.status(201).json({
      example: newExample
    })
  } catch (error) {
    next({ estado: 500, original: error })
  }
}

export async function addManyExamples (req: Request, res: Response, next: NextFunction) {
  try {
    const { lista } = req.body
    const examples = await exampleService.createManyExamples(lista)

    res.status(201).json({
      message: `Examples created`
    })
  } catch (error) {
    next({ estado: 500, original: error })
  }
}

export async function editExample (req: Request, res: Response, next: NextFunction) {
  try {
    const { body, params } = req

    const example = await exampleService.updateExample(params.id, body)

    res.status(201).json({
      example
    })

  } catch (error) {
    next({ estado: 500, original: error })
  }
}

export async function getExample (req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params

    const example = await exampleService.detailExample(id)

    if (example) {
      res.status(201).json({
        example
      })
    } else {
      res.status(404).json({
        message: 'Does not found example'
      })
    }
  } catch (error) {
    next({ estado: 500, original: error })
  }
}

/**
 * Delete Example
 * This endpoint delete an example by id
 *
 * @method DELETE
 * @params id
 */
export async function deleteExample (req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params

    await exampleService.deleteExample(id)

    res.status(201).json({
      message: 'Example has been deleted'
    })
  } catch (error) {
    next({ estado: 500, original: error })
  }
}