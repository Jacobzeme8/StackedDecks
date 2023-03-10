<template>
  <div class="container-fluid">
    <div class="row">
      <div v-for="deck in decks" class="col-md-3">
        <Deck :deck="deck" />
      </div>
    </div>
  </div>
</template>


<script>
import { onMounted, computed } from "vue";
import { decksServices } from "../services/DecksService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";

export default {
  setup() {

    async function getAllDecks() {
      try {
        await decksServices.getAllDecks()
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }

    onMounted(() =>
      getAllDecks()
    )

    return {
      decks: computed(() => AppState.decks)
    }
  }
}
</script>


<style lang="scss" scoped></style>