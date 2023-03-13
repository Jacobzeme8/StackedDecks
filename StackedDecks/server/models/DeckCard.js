import { Schema } from "mongoose";


export const DeckCardSchema = new Schema({
  deckId: { type: Schema.Types.ObjectId, required: true},
  cardId: { type: Schema.Types.ObjectId, required: true },
  creatorId: { type: Schema.Types.ObjectId, required: true },
  reps: { type: Number, max:100 },
  sets: { type: Number, max:20 },
  weight: { type: Number, max:700 },
  time: { type: Number, max: 180 }
},
{ timestamps: true, toJSON: { virtuals: true } },

)

DeckCardSchema.virtual('deck',{
  localField: 'deckId',
  foreignField: '_id',
  ref: 'Deck',
  justOne: true
}),

DeckCardSchema.virtual('card',{
  localField: 'cardId',
  foreignField: '_id',
  ref: 'Card',
  justOne: true
}),
DeckCardSchema.index({ deckId: 1, cardId: 1 }, { unique: true })