import { AppState } from "../AppState"
import { Deck } from "../models/Deck"
import { DeckCard } from "../models/DeckCard"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class DecksServices {
  async getDeckById(deckId) {
    // this sets only one deck at a time, instead of replacing.
    AppState.deck = null
    const res = await api.get('api/decks/' + deckId)
    logger.log('deck by id', res.data)
    AppState.deck = new Deck(res.data)
  }

  async createDeck(formData) {
    const res = await api.post('api/decks', formData)
    const deck = new Deck(res.data)
    logger.log(deck)
    AppState.decks.push(deck)
  }

  async getAllDecks() {
    const res = await api.get('api/decks')
    logger.log(res.data)
    const publicDecks = res.data.filter(d => d.isPublic == true)
    AppState.decks = publicDecks.map(d => new Deck(d))
    logger.log(AppState.decks, '[appstate decks]')
  }

  async copyDeck(deckId) {
    const res = await api.post('api/decks/' + deckId)
    // AppState.decks.push(new Deck(res.data))
    return res.data
  }

  async deleteDeck(deckId) {
    const res = await api.delete('api/decks/' + deckId)
    logger.log('did you delete?', res.data)
    const deckIndex = AppState.decks.findIndex(d => d.id == deckId)
    if (deckId !== -1) {
      AppState.decks.splice(deckIndex, 1)
    }
  }

  async getMyDecks() {
    const res = await api.get('account/decks')
    logger.log('getting my decks in service',res.data)
    AppState.decks = res.data.map(m => new Deck(m))
  }

  async getUserDecks(creatorId) {

    const res = await api.get(`api/profiles/${creatorId}/decks`)
    logger.log('grabbing creatorId', res.data)
    AppState.decks = res.data.map(m => new Deck(m))

  }

  async postDeck(deckId) {
    const res = await api.put(`api/decks/${deckId}`, { isPublic: true })
    logger.log(res.data)
  }

  async deckCompletionCheck(deckId){
    const res = await api.put(`api/decks/${deckId}/check`)
    logger.log("deck complete check", res.data)
    if(!res.data){
      return
    }
    AppState.deck = new Deck(res.data[0])
    AppState.deckCards = res.data[1].map(d => new DeckCard(d))
    AppState.stackedPercent = res.data[0].exp
  }

}

export const decksServices = new DecksServices() 