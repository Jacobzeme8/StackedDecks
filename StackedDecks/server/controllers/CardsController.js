import { cardsService } from "../services/CardsService";
import BaseController from "../utils/BaseController";


export class CardsController extends BaseController {

  constructor(){
    super('api/cards')
    this.router
    .post('', this.createCard)
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

}