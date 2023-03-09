import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class DeckCardsService{
  async getDeckCardsForDeck(deckId){
    const res = await api.get(`/${deckId}/deckcards`)
    logger.log(res.data)
  }
}

export const deckCardsService = new DeckCardsService()