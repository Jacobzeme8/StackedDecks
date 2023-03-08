import { deckCardsService } from "../services/DeckCardsService";
import BaseController from "../utils/BaseController";


export class DeckCardsController extends BaseController{

  constructor(){
    super('api/deckcards')
    this.router
    .post('', this.createDeckCard)
  }
  async createDeckCard(req, res, send) {
    try {
      const deckCardData = req.body
      const deckCard = await deckCardsService.createDeckCard(deckCardData)
      return res.send(deckCard)
    } catch (error) {
      
    }
  }

}