import { AppState } from "../AppState.js"
import { Card } from "../models/Card.js"
import { DeckCard } from "../models/DeckCard.js"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class DeckCardsService {
  async getDeckCardsForDeck(deckId) {
    const res = await api.get(`api/decks/${deckId}/deckCards`)
    logger.log(res.data)
    AppState.deckCard = new DeckCard(res.data)
  }
}

export const deckCardsService = new DeckCardsService()