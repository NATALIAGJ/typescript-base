import mongoose, { Schema, Document } from 'mongoose'
import SchemaGeneral, { ISchemaGeneral } from './SchemaGeneral'
import { ICuenta } from './SchemaCuenta'

export interface IArrEjemplo {
  test: string
}

export interface IEjemplo extends Document {
  id: string
  cuenta: ICuenta['_id']
  nombre: string | null
  arrEjemplo: IArrEjemplo[]
}

const EjemploSchema: Schema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  cuenta: {
    type: Schema.Types.ObjectId,
    ref: 'Cuenta'
  },
  nombre: {
    type: String,
    default: null
  },
  arrEjemplo: [{
    test: String
  }]
}, {
  collection: 'ejemplos',
  timestamps: { createdAt: 'date', updatedAt: false },
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  versionKey: false
})

export default mongoose.model<IEjemplo>('Ejemplo', EjemploSchema)
