import { dbContext } from "../db/DbContext"
import { BadRequest, UnAuthorized } from "../utils/Errors.js"

class CardsService {
  async getAllCards() {
    const cards = await dbContext.Cards.find()
    return cards
  }
  async createCard(cardData) {
    const card = await dbContext.Cards.create(cardData)
    return card
  }
  async editCard(id, cardData) {
    const card = await dbContext.Cards.findById(id)
    if (!card) { throw new BadRequest('Invalid card ID') }
    card.name = cardData.name || card.name
    card.muscleGroup = cardData.muscleGroup || card.muscleGroup
    card.instruction = cardData.instruction || card.instruction
    card.difficulty = cardData.difficulty || card.difficulty
    card.equipment = cardData.equipment || card.equipment
    await card.save()
    return card
  }

}

export const cardsService = new CardsService()