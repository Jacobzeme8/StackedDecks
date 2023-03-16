import { dbContext } from "../db/DbContext"
import { BadRequest, UnAuthorized } from "../utils/Errors"

class DeckCardsService {
  async getAccountDeckCards(accountId) {
    const deckCards = await dbContext.DeckCards.find({ creatorId: accountId }).populate('deck card')
    return deckCards
  }
  async editDeckCard(id, deckCardData, creatorId) {
    const deckCard = await dbContext.DeckCards.findById(id)
    if (!deckCard) { throw new BadRequest('No deck card with that ID!') }
    if (deckCard.creatorId != creatorId) { throw new UnAuthorized('Not your DeckCard to Edit!') }
    deckCard.reps = deckCardData.reps || deckCard.reps
    deckCard.sets = deckCardData.sets || deckCard.sets
    deckCard.weight = deckCardData.weight || deckCard.weight
    deckCard.time = deckCardData.time || deckCard.time
    deckCard.completed = deckCardData.completed
    await deckCard.save()
    await deckCard.populate('deck card')
    return deckCard
  }
  async getDeckCardsByDeck(deckId) {
    const deckCards = await dbContext.DeckCards.find({ deckId }).populate('deck card')
    return deckCards
  }
  async deleteDeckCard(deckCardId, accountId) {
    const deckCard = await dbContext.DeckCards.findById(deckCardId)
    if (!deckCard) { throw new BadRequest }
    if (deckCard.creatorId != accountId) {
      throw new UnAuthorized('not your card to delete!')
    }

    const deletedDeckCard = await dbContext.DeckCards.remove(deckCard)
    return deletedDeckCard
  }
  async createDeckCard(deckCardData) {
    const deckCardCheck = await dbContext.DeckCards.findOne({ deckId: deckCardData.deckId, cardId: deckCardData.cardId })
    if (deckCardCheck) { throw new BadRequest("card already in this deck!") }
    const deckCardLimitCheck = await dbContext.DeckCards.find({ deckId: deckCardData.deckId })
    if (deckCardLimitCheck.length >= 6) { throw new BadRequest('Already at 6 card limit in this deck!') }
    const deckCard = await dbContext.DeckCards.create(deckCardData)
    await deckCard.populate('deck card')
    return deckCard
  }

}

export const deckCardsService = new DeckCardsService()