import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { decksService } from "../services/DecksService"
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('', this.editAccount)
      .get('/decks', this.getAccountDecks)
  }
  async getAccountDecks(req, res, next) {
    try {
      const accoundId = req.userInfo.id
      const decks = await decksService.getAccountDecks(accoundId)
      return res.send(decks)
    } catch (error) {
      next(error)
    }
  }
  async editAccount(req, res, next) {
    try {
      const accountId = req.userInfo.id
      const accountData = req.body
      const account = await accountService.editAccount(accountId, accountData)
      return res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
}
