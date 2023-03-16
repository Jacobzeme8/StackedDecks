import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider"
import { notesService } from "../services/NotesService";


export class NotesController extends BaseController{

  constructor(){
    super('api/notes')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('/:deckId', this.createNote)
    .put('/:noteId', this.editNote)
  }
  async editNote(req, res, next) {
    try {
      const noteData = req.body
      const noteId = req.params.noteId
      const note = await notesService.editNote(noteData, noteId)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }
  
  async createNote(req, res, next) {
    try {
      const noteData = req.body
      const deckId = req.params.deckId
      const note = await notesService.createNote(noteData, deckId)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }
}

