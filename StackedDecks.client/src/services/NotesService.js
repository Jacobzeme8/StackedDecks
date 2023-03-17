import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"

class NotesService {
    async createNote(noteData, deckId) {
        const res = await api.post(`api/notes/${deckId}`, noteData)
        logger.log(res.data)

    }

    async editNote(noteData){
        const res = await api.put(`api/notes/${noteData.id}`, noteData)
        logger.log(res.data)
    }

}
export const notesService = new NotesService()