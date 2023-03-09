import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Card } from "../models/Card.js"

class CardsService {

  async getAllCards() {
    const res = await api.get('api/cards')
    const cards = res.data
    logger.log(res.data)
    AppState.cards = res.data.map(c => new Card(c))
    logger.log(AppState.cards)
  }

}

export const cardsService = new CardsService()