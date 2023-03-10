import { AppState } from "../AppState"
import { Deck } from "../models/Deck"
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
  }

  async getAllDecks() {
    const res = await api.get('api/decks')
    logger.log(res.data)
    AppState.decks = res.data.map(d => new Deck(d))
  }


  async getMyDecks(){
    const res = await api.get('account/decks')
    logger.log(res.data)
  }

}

export const decksServices = new DecksServices() 