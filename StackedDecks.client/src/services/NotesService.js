import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"

class NotesService {
    async createNote(noteData, deckId) {
        const res = await api.post(`api/notes/${deckId}`, noteData)
        logger.log('creating note in service')





    }

}
export const notesService = new NotesService()