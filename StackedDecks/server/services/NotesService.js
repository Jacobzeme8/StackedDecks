import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden, UnAuthorized } from "../utils/Errors.js"
class NotesService{
  async editNote(noteData, noteId) {
    const note = await dbContext.Notes.findById(noteId)
    if(!note){throw new BadRequest('bad note ID!')}
    note.name = noteData.name || note.name
    note.body= noteData.body || note.body
    await (await note.save()).populate('deck')
    return note
  }
  async createNote(noteData, deckId) {
    noteData.deckId = deckId
    const note = await dbContext.Notes.create(noteData)
    const deck = await dbContext.Decks.findById(deckId)
    if(!deck){throw new BadRequest}
    deck.noteId = note.id
    await deck.save()
    return note
  }

}

export const notesService = new NotesService()