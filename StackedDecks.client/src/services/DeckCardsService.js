import { AppState } from "../AppState.js"
import { DeckCard } from "../models/DeckCard.js"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService"

class DeckCardsService {

 async  getAccountDeckCards(){
  const res = await api.get(`account/deckcards`)
  AppState.accountDeckCards = res.data
  logger.log(AppState.accountDeckCards)
 }
  async getDeckCardsForDeck(deckId) {
    const res = await api.get(`api/decks/${deckId}/deckCards`)
    logger.log(res.data)
    AppState.deckCards = res.data.map(d => new DeckCard(d))
  }

  async addCardToDeck(deckId, cardId) {
    const res = await api.post('api/deckcards', { deckId, cardId })
    logger.log(res.data)
  }
}



export const deckCardsService = new DeckCardsService()