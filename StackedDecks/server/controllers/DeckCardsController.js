import { deckCardsService } from "../services/DeckCardsService";
import BaseController from "../utils/BaseController";
import { Auth0Provider } from '@bcwdev/auth0provider'


export class DeckCardsController extends BaseController{

  constructor(){
    super('api/deckcards')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createDeckCard)
    .delete('/:deckCardId', this.deleteDeckCard)
  }
  async createDeckCard(req, res, send) {
    try {
      const deckCardData = req.body
      deckCardData.creatorId = req.userInfo.id
      const deckCard = await deckCardsService.createDeckCard(deckCardData)
      return res.send(deckCard)
    } catch (error) {
      
    }
  }

  async deleteDeckCard(req, res, next){
    try {
      const deckCardId = req.params.deckCardId
      const accountId = req.userInfo.id
      const deckCard = await deckCardsService.deleteDeckCard(deckCardId, accountId )
      return res.send(deckCard)
    } catch (error) {
      next(error)
    }
  }

}