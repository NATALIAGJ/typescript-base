import mongoose, { Schema, Document } from 'mongoose'
import { IAccount } from './SchemaAccount'

export interface IArrExample {
  test: string
}

export interface IExample extends Document {
  id: string
  account: IAccount['_id']
  name: string | null
  arrExample: IArrExample[]
}

const ExampleSchema: Schema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  name: {
    type: String,
    default: null
  },
  arrExample: [{
    test: String
  }]
}, {
  collection: 'examples',
  timestamps: { createdAt: 'date', updatedAt: false },
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  versionKey: false
})

export default mongoose.model<IExample>('Example', ExampleSchema)
