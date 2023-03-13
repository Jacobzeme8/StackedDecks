<template>
  <div class="card p-3 my-4">
    <div class="row justify-content-start">
      <!-- NOTE deck.id is not deckId as it is pulling by prop -->
      <div @click="copyDeck(deck.id)">
        <i class="mdi mdi-star fs-2 selectable"></i>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <p>{{ deck.name }}</p>
    </div>
    <router-link :to="{ name: 'Deck', params: { deckId: deck.id } }">
      <img class="img-fluid cover-img mb-2" :title="`${deck.name} page`" :src="deck.coverImg" alt="">
    </router-link>
    <div v-if="deck.creator" class="d-flex align-items-center justify-content-between">
      <b>{{ deck.creator.name }}</b>
      <img class="img-fluid rounded-circle profile-img" :src="deck.creator.picture" alt="">
    </div>
  </div>
</template>


<script>
import { Deck } from "../models/Deck";
import { logger } from "../utils/Logger";
import { decksServices } from "../services/DecksService";
import Pop from "../utils/Pop";

export default {

  props: {
    deck: {
      type: Deck,
      required: true
    }
  },

  setup() {
    return {

      async copyDeck(deckId) {
        try {
          await decksServices.copyDeck(deckId)
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.profile-img {
  height: 45px;
  width: 45px;
}

.cover-img {
  object-fit: cover;
  width: 100%;
  height: 30vh;
}
</style>