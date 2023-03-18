import { AppState } from "../AppState.js"
import { Deck } from "../models/Deck.js"
import { DeckCard } from "../models/DeckCard.js"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService"

class DeckCardsService {

  async saveExerciseInfo(updatedInfo, deckCardId) {
    const res = await api.put(`api/deckcards/${deckCardId}`, updatedInfo)
    logger.log(res.data)
    const index = AppState.deckCards.findIndex(d => d.id == deckCardId)
    const newDeckCard = new DeckCard(res.data)
    AppState.deckCards.splice(index, 1, newDeckCard)
  }
  async calculateXp() {
    let currentXp = 0
    AppState.deckCards.forEach(c => {
      if (c.completed == true) {
        currentXp++
        logger.log(currentXp, "currentXp")
      }
    })

    const completedExercise = AppState.deckCards.find(c => c.completed == false)

    logger.log("completed exercies", completedExercise)
    // logger.log(AppState.deckCards.length);
    let calc = currentXp / AppState.deckCards.length
    // logger.log('Percentage', calc)
    AppState.deckPercent = (calc * 100)
    // return (calc)
  }
  async saveCompletedInfo(deckCardId) {
    let foundCard = AppState.deckCards.find(d => d.id == deckCardId)
    foundCard.completed = true
    const res = await api.put(`api/deckcards/${deckCardId}`, foundCard)
    logger.log('Completed in Service', res.data)
  }

  async getAccountDeckCards() {
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