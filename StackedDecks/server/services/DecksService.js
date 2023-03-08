import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
class DecksService {
    async deleteDeck(deckId, requestorId) {
        const deck = await this.getDeckById(deckId)
        if (deck.creatorId.toString() != requestorId) {
            throw new Forbidden('Stop it! You cannot delete this!')
        }
        await deck.remove()
        return deck
    }
    async getDeckById(deckId) {
        const deck = await dbContext.Decks.findById(deckId)
            .populate('creator', 'name picture')

        if (!deck) {
            throw new BadRequest('Invalid ID')

        }

        return deck
    }
    async getAllDecks() {
        const decks = await dbContext.Decks.find()
            .populate('creator', 'name picture')
        return decks
    }

    async createDeck(deckData) {
        const deck = await dbContext.Decks.create(deckData)
        await deck.populate('creator', 'name picture')
        return deck
    }

}
export const decksService = new DecksService()