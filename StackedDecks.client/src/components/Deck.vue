<template>
  <div class="card p-3 my-4" v-if="route">
    <div class="d-flex flex-row justify-content-between">
      <!-- NOTE deck.id is not deckId as it is pulling by prop -->
      <div title="Bookmark this deck" @click="copyDeck(deck.id)" v-if="deck.creatorId != account.id">
        <i class="mdi mdi-star text-warning fs-2 selectable"></i>
      </div>
      <div title="Post this deck" v-if="account.id == deck.creatorId && route.path == '/account'"
        @click="postDeck(deck.id)">
        <i class="mdi mdi-postage-stamp fs-2 selectable text-secondary"></i>
      </div>
      <div title="Delete this deck" v-if="account.id == deck.creatorId" @click="deleteDeck(deck.id)">
        <i class="mdi mdi-delete text-danger fs-2 selectable"></i>
      </div>
    </div>

    <div class="d-flex justify-content-center">
      <p>{{ deck.name }}</p>
    </div>
    <router-link :to="{ name: 'Deck', params: { deckId: deck.id } }">
      <img class="img-fluid cover-img mb-2" :title="`${deck.name} page`" :src="deck.coverImg" alt="">
    </router-link>
    <router-link :to="{ name: 'Profile', params: { creatorId: deck.creatorId } }">
      <div v-if="deck.creator" class="d-flex align-items-center justify-content-between">
        <b>{{ deck.creator.name }}</b>
        <img class="img-fluid rounded-circle profile-img" :src="deck.creator.picture" alt="">
      </div>
    </router-link>
  </div>
</template>


<script>
import { Deck } from "../models/Deck";
import { logger } from "../utils/Logger";
import { decksServices } from "../services/DecksService";
import Pop from "../utils/Pop";
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import { useRoute } from "vue-router";

export default {

  props: {
    deck: {
      type: Deck,
      required: true
    }
  },

  setup() {
    const route = useRoute()
    onMounted(() => { logger.log(route) })
    return {
      route,
      account: computed(() => AppState.account),

      async postDeck(deckId) {
        try {
          await decksServices.postDeck(deckId)
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      },

      async copyDeck(deckId) {
        try {
          await decksServices.copyDeck(deckId)
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      },
      async deleteDeck(deckId) {
        try {
          if (await Pop.confirm('Are you sure you want to delete this deck?')) {
            await decksServices.deleteDeck(deckId)
          }
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