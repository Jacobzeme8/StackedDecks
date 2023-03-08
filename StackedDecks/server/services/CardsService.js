import { dbContext } from "../db/DbContext"

class CardsService{
  async createCard(cardData) {
    const card = await dbContext.Cards.create(cardData)
    return card
  }

}

export const cardsService = new CardsService()