import { dbContext } from "../db/DbContext"

class DeckCardsService{
  async createDeckCard(deckCardData) {
    const deckCard = await dbContext.DeckCards.create(deckCardData)
    await deckCard.populate(' deck card ')
    return deckCard
  }

}

export const deckCardsService = new DeckCardsService()