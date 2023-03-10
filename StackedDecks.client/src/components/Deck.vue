<template>
  <div class="card p-3 my-4">
    <div class="row justify-content-start">
      <div>
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

export default {

  props: {
    deck: {
      type: Deck,
      required: true
    }
  },

  setup() {
    return {}
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