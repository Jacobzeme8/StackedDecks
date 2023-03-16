import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"

class NotesService {
    async createNote(noteData, deckId) {
        logger.log('You here Note?')
        const res = await api.post(`api/notes/${deckId}`, noteData)
        logger.log('creating note in service')





    }

}
export const notesService = new NotesService()