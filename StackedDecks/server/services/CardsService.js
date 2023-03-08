import { dbContext } from "../db/DbContext"

class CardsService{
  async getAllCards() {
    const cards = await dbContext.Cards.find()
    return cards
  }
  async createCard(cardData) {
    const card = await dbContext.Cards.create(cardData)
    return card
  }

}

export const cardsService = new CardsService()