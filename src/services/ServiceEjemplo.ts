import Ejemplo, { IExample } from '../schemas/SchemaExample'

const { ObjectId } = require('mongodb')
const uuid = require('uuid-base62')

export default class ExampleService {
  async getExamples (tags: any) {
    const query = tags
    const ejemplos = await Ejemplo.find(query)
    return ejemplos || []
  }

  async createExample (example: IExample) {
    const newExample = await Ejemplo.create({
      ...example
    })
    return newExample
  }

  async createManyExamples (lista: []) {

    const ejemplos = lista.map((bodyEjemplo: IExample) => {
      return new Ejemplo({
        ...bodyEjemplo,
        id: uuid.v4()
      })
    })

    await Ejemplo.create(ejemplos)

    const payload = []
    for (let i = 0, len = lista.length; i < len; i++) {
      const example = lista[i]
      const reg = new Ejemplo(example)
      await reg.save()
      payload.push(reg)
    }
    return ejemplos.length
  }

  async updateExample (exampleId: string, example: IExample ) {
    const exampleUpdated = await Ejemplo.updateOne({ _id: ObjectId(exampleId) }, { $set: example })
    return exampleUpdated
  }


  async detailExample (exampleId: string) {
    const ejemplo = await Ejemplo.find({ id: exampleId })
    return ejemplo || []
  }

  async deleteExample (exampleId: string) {
    const deletedExample = await Ejemplo.deleteOne({ _id: ObjectId(exampleId) })
    return deletedExample
  }
}
