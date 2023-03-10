import { AppState } from "../AppState.js"
import { DeckCard } from "../models/DeckCard.js"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class DeckCardsService {
  async getDeckCardsForDeck(deckId) {
    const res = await api.get(`api/decks/${deckId}/deckCards`)
    logger.log(res.data)
    AppState.deckCards = res.data.map(d => new DeckCard(d))
  }
}

export const deckCardsService = new DeckCardsService()