<template>
  <div v-if="deck">
    <h1>{{ deck.name }}</h1>
    <div v-for="d in deckCard">
      <Card />
    </div>
  </div>
</template>


<script>
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { deckCardsService } from "../services/DeckCardsService"
import { useRoute } from "vue-router";
import { watchEffect, computed } from "vue";
import { AppState } from "../AppState.js";
import { decksServices } from "../services/DecksService.js";
import { Card } from "../models/Card.js";

export default {
  setup() {
    const route = useRoute();
    async function getDeckCardsForDeck() {
      try {
        const deckId = route.params.deckId;
        await deckCardsService.getDeckCardsForDeck(deckId);
      }
      catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    }
    async function getDeckById() {
      try {
        const deckId = route.params.deckId;
        await decksServices.getDeckById(deckId);
      }
      catch (error) {
        logger.error(error);
        Pop.error("How did deck get here?", error);
      }
    }
    watchEffect(() => {
      if (route.params.deckId) {
        getDeckCardsForDeck();
        getDeckById();
      }
    });
    return {
      route,
      deck: computed(() => AppState.deck),
      deckCard: computed(() => AppState.deckCard)
    };
  },
  components: { Card }
}
</script>


<style lang="scss" scoped></style>