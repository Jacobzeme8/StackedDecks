import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class DeckCardsService{
  async getDeckCardsForDeck(deckId){
    const res = await api.get(`/${deckId}/deckcards`)
    logger
  }
}

export const deckCardsService = new DeckCardsService()