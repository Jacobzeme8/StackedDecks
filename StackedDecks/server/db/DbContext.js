import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CardSchema } from "../models/Card";
import { DeckSchema } from '../models/Deck.js';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Cards = mongoose.model('Card', CardSchema);
  Decks = mongoose.model('Deck', DeckSchema);
}

export const dbContext = new DbContext()
