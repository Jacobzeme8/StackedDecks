<template>
  <form @submit.prevent="createNote(deck.id)">
    <div class="modal-body text-dark">
      <div class="mb-3">
        <label for="name" class="form-label">Note Name</label>
        <input v-model="editable.name" required type="text" class="form-control" id="name" aria-describedby="emailHelp">
      </div>
    </div>
    <div class="modal-footer">
      <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Create Note</button>
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
          editable.value = {}
        } catch (error) {
          Pop.error(error.message)
          logger.log('create note??', error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>