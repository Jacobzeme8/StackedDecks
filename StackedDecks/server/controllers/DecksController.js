import BaseController from "../utils/BaseController.js"
import { Auth0Provider } from "@bcwdev/auth0provider"
import { decksService } from "../services/DecksService.js"
import { deckCardsService } from "../services/DeckCardsService.js"

export class DecksController extends BaseController {
    constructor() {
        super('api/decks')
        this.router
            .get('', this.getAllDecks)
            .get('/:deckId', this.getDeckById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('/:deckId/deckcards', this.getDeckCardsByDeck)
            .post('', this.createDeck)
            .delete('/:deckId', this.deleteDeck)

    }
    async getDeckCardsByDeck(req, res, next) {
        try {
            const deckId = req.params.deckId
            const deckCards = await deckCardsService.getDeckCardsByDeck(deckId)
            return res.send(deckCards)
        } catch (error) {
            next(error)
        }
    }
    async deleteDeck(req, res, next) {
        try {
            const deckId = req.params.deckId
            const requestorId = req.userInfo.id
            const deck = await decksService.deleteDeck(deckId, requestorId)
            return res.send(deck)
        } catch (error) {
            next(error)
        }
    }
    async getDeckById(req, res, next) {
        try {
            const deckId = req.params.deckId
            const deck = await decksService.getDeckById(deckId)
            return res.send(deck)
        } catch (error) {
            next(error)
        }
    }
    async getAllDecks(req, res, next) {
        try {
            const decks = await decksService.getAllDecks()
            return res.send(decks)
        } catch (error) {
            next(error)
        }
    }
    async createDeck(req, res, next) {
        try {
            const deckData = req.body
            deckData.creatorId = req.userInfo.id
            const deck = await decksService.createDeck(deckData)
            return res.send(deck)
        } catch (error) {
            next(error)
        }
    }

}