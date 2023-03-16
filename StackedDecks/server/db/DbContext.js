import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CardSchema } from "../models/Card";
import { DeckSchema } from '../models/Deck.js';
import { DeckCardSchema } from "../models/DeckCard";
import { ValueSchema } from '../models/Value'
import { NotesSchema } from "../models/Notes";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Cards = mongoose.model('Card', CardSchema);
  Decks = mongoose.model('Deck', DeckSchema);
  DeckCards = mongoose.model('DeckCard',DeckCardSchema )

  Notes = mongoose.model('Note', NotesSchema)
}

export const dbContext = new DbContext()
