import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden, UnAuthorized } from "../utils/Errors.js"
class DecksService {
    async getDeckByUser(creatorId) {
        const userDeck = await dbContext.Decks.find({ creatorId })
            .populate('creator', 'name picture')
        if (!userDeck) {
            throw new BadRequest('No user deck by ID')
        }

        return userDeck
    }
    async getAccountDecks(accountId) {
        const creatorId = accountId
        const decks = await dbContext.Decks.find({ creatorId }).populate('note')
        
        if(!decks){throw new BadRequest}
        return decks
    }
    async copydeck(deckId, accoundId) {
        const deck = await dbContext.Decks.findById(deckId)
        if (!deck) { throw new BadRequest('deck doesnt exist!') }
        if (deck.creatorId == accoundId) { throw new BadRequest('cannot favorite your own deck!') }
        let deckObject = {
            name: deck.name,
            description: deck.description,
            coverImg: deck.coverImg,
            exerciseType: deck.exerciseType,
            isPublic: false,
            creatorId: accoundId,
            isCopied: true,
        }
        const copiedDeck = await dbContext.Decks.create(deckObject)

        await copiedDeck.populate('creator')
        return copiedDeck
    }
    async editDeck(id, deckData, creatorId) {
        const deck = await dbContext.Decks.findById(id)
        if (!deck) {
            throw new BadRequest('invalid deck ID.')
        }
        if (deck.creatorId != creatorId) {
            throw new UnAuthorized('Not your Deck to edit!')
        }
        deck.name = deckData.name || deck.name
        deck.description = deckData.description || deck.description
        deck.coverImg = deckData.coverImg || deck.coverImg
        deck.isPublic = deckData.isPublic || deck.isPublic
        await deck.save()
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

    async deleteDeck(deckId, requestorId) {
        const deck = await this.getDeckById(deckId)
        if (deck.creatorId.toString() != requestorId) {
            throw new Forbidden('Stop it! You cannot delete this!')
        }
        const noteId = deck.noteId
        if(noteId){
            const note = await dbContext.Notes.findById(noteId)
            await note.remove()
        }

        await deck.remove()
        return deck
    }

}
export const decksService = new DecksService()