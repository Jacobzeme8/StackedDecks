import { Auth0Provider } from "@bcwdev/auth0provider";
import { cardsService } from "../services/CardsService";
import BaseController from "../utils/BaseController";


export class CardsController extends BaseController {

  constructor() {
    super('api/cards')
    this.router
      .post('', this.createCard)
      .get('', this.getAllCards)
      .put('/:cardId', this.editCard)

  }
  async getAllCards(req, res, next) {
    try {
      const cards = await cardsService.getAllCards()
      return res.send(cards)
    } catch (error) {
      next(error)
    }
  }
  async createCard(req, res, next) {
    try {
      const cardData = req.body
      const card = await cardsService.createCard(cardData)
      return res.send(card)
    } catch (error) {
      next(error)
    }
  }

  async editCard(req, res, next) {
    try {
      const cardData = req.body
      const id = req.params.cardId
      const card = await cardsService.editCard(id, cardData)
      return res.send(card)
    } catch (error) {
      next(error)
    }
  }

}