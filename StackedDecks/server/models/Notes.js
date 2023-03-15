import { Schema } from "mongoose";


export const NotesSchema = new Schema({
  accountId: { type: Schema.Types.ObjectId, required: true},
  name: { type: String, required: true },
  body: { type: String}
},
{ timestamps: true, toJSON: { virtuals: true } },
)

NotesSchema.virtual('creator', {
  localField: 'accountId',
  foreignField: 'id',
  justOne: true,
  ref: 'Account'
})


