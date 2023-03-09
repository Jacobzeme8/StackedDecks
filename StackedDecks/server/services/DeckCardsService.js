import { dbContext } from "../db/DbContext"
import { BadRequest, UnAuthorized } from "../utils/Errors"

class DeckCardsService{
  async deleteDeckCard(deckCardId, accountId) {
    const deckCard = await dbContext.DeckCards.findById(deckCardId)
    if(!deckCard){throw new BadRequest}
    if(deckCard.creatorId != accountId){
      throw new UnAuthorized('not your card to delete!')
    }

    const deletedDeckCard = await dbContext.DeckCards.remove(deckCard)
    return deletedDeckCard
  }
  async createDeckCard(deckCardData) {
    const deckCard = await dbContext.DeckCards.create(deckCardData)
    await deckCard.populate('deck card')
    return deckCard
  }

}

export const deckCardsService = new DeckCardsService()