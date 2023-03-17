<template>
  <form v-if="!deck.note" @submit.prevent="createNote(deck.id)">
    <div class="modal-body text-dark">
      <div class="mb-3">
        <label for="name" class="form-label">Note Name</label>
        <input v-model="editable.name" required type="text" class="form-control" id="name" aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Note Body</label>
        <textarea v-model="editable.body" name="noteBody" class="form-control" cols="30" rows="10"></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Create Note</button>
    </div>
  </form>
  <form v-if="deck.note" @submit.prevent="editNote(deck)">
    <div class="modal-body text-dark">
      <div class="mb-3">
        <label for="name" class="form-label">Note Name</label>
        <input v-model="deck.note.name" required type="text" class="form-control" id="name" aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Note Body</label>
        <textarea v-model="deck.note.body" name="noteBody" class="form-control" cols="30" rows="10"></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save Note</button>
    </div>
  </form>
</template>


<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { notesService } from "../services/NotesService.js"


export default {
  props: {
    deck: {
      type: Object, required: true
    }
  },
  setup() {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      async createNote(deckId) {
        try {
          logger.log(deckId)
          const noteData = editable.value
          await notesService.createNote(noteData, deckId)
        } catch (error) {
          Pop.error(error.message)
          logger.log('create note??', error)
        }
      },
      async editNote(deck) {
        try {
          const noteData = deck.note
          logger.log(noteData)
          await notesService.editNote(noteData)
        } catch (error) {
          Pop.error(error)
          logger.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>