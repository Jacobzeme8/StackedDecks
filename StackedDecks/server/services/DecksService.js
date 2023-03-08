import { dbContext } from "../db/DbContext.js"
class DecksService {
    async createDeck(deckData) {
        const deck = await dbContext.Decks.create(deckData)
        await deck.populate('creator', 'name picture')
        return deck
    }

}
export const decksService = new DecksService()