import { dbContext } from "../db/DbContext.js"
class DecksService {
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