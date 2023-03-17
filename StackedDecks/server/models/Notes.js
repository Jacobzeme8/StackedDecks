import { Schema } from "mongoose";


export const NotesSchema = new Schema({
  deckId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  body: { type: String}
},
{ timestamps: true, toJSON: { virtuals: true } },
)



NotesSchema.virtual('deck', {
  localField: 'deckId',
  foreignField: 'id',
  justOne: true,
  ref: 'Deck'
})




