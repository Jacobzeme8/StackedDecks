import mongoose, { Mongoose, Schema, Types } from "mongoose"
import { dbContext } from "../db/DbContext.js"
import { DeckCardSchema } from "../models/DeckCard.js"
import { BadRequest, Forbidden, UnAuthorized } from "../utils/Errors.js"
import { deckCardsService } from "./DeckCardsService.js"
class DecksService {
    async deckCompletionCheck(deckId) {
        const deckCards = await dbContext.DeckCards.find({deckId})
        const deck = await dbContext.Decks.findById(deckId).populate('creator')
        if(!deck){throw new BadRequest}
        const deckCardsCheck = deckCards.find(d => d.completed == false)
        if(!deckCardsCheck){
            deck.exp += 25
            deck.save()
            const resetDeckCards = await deckCardsService.resetDeckCards(deckId)
            const resultArray = [deck, resetDeckCards]
            return resultArray
        }
        else return null
    }
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
    async copydeck(deckId, accountId) {
        const deck = await dbContext.Decks.findById(deckId)
        if (!deck) { throw new BadRequest('deck doesnt exist!') }
        if (deck.creatorId == accountId) { throw new BadRequest('cannot favorite your own deck!') }
        const deckCards = await dbContext.DeckCards.find({deckId: deck.id})
        const cardsIds = deckCards.map(d => d.cardId.toString())
        
        let deckObject = {
            name: deck.name,
            description: deck.description,
            coverImg: deck.coverImg,
            exerciseType: deck.exerciseType,
            isPublic: false,
            creatorId: accountId,
            isCopied: true,
        }
        const copiedDeck = await dbContext.Decks.create(deckObject)

        // const ObjectId = mongoose.Types.ObjectId
        // ObjectId.prototype.valueOf = function  () {
        //     return this.toString
        // }

        // let deckCardObject = {
        //     deckId: copiedDeck.id,
        //     creatorId: accountId,
        //     cardId: accountId
        // }   


    cardsIds.forEach(async cId=>{
    let deckCardData = 
    {
     deckId:copiedDeck.id,
    creatorId: accountId,
    cardId:cId
    }
    await deckCardsService.createDeckCard(deckCardData)
})
        await copiedDeck.populate('creator')
        return copiedDeck
    }
    async editDeck(id, deckData, creatorId) {
        const deck = await dbContext.Decks.findById(id).populate('creator')
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
        deck.exp = deckData.exp
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