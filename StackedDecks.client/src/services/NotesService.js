import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"

class NotesService {
    async createNote(noteData, deck) {
        const res = await api.post(`api/notes/${deck.id}`, noteData)
        const index = AppState.decks.findIndex(d => d.id == deck.id)
        deck.note = res.data
        AppState.decks.splice(index, 1, deck)

    }

    async editNote(noteData){
        const res = await api.put(`api/notes/${noteData.id}`, noteData)
        logger.log(res.data)
    }

}
export const notesService = new NotesService()