import { AppState } from "../AppState"
import { Deck } from "../models/Deck"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class DecksServices{

  async createDeck(formData){
    const res = await api.post('api/decks', formData)
    const deck = new Deck(res.data)
    logger.log(deck)
  }

  async getAllDecks(){
    const res = await api.get('api/decks')
    logger.log(res.data)
  }

}

export const decksServices = new DecksServices() 