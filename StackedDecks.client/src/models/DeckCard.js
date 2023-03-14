import { Card } from "./Card.js"

export class DeckCard {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.deckId = data.deckId
    this.cardId = data.cardId
    this.reps = data.reps || 0
    this.sets = data.sets || 0
    this.time = data.time || 0
    this.weight = data.weight || 0
    this.card = new Card(data.card)
  }
}