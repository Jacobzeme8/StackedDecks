<template>
  <div v-if="deck">
    <h1>{{ deck.name }}</h1>

    <div v-for="d in deckCards">
      <Card :card="d.card" />
    </div>
  </div>
</template>


<script>
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { deckCardsService } from "../services/DeckCardsService"
import { useRoute } from "vue-router";
import { watchEffect, computed, onUpdated } from "vue";
import { AppState } from "../AppState.js";
import { decksServices } from "../services/DecksService.js";
import Card from "../components/Card.vue";

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




    onUpdated(() => {
      let kards = document.querySelectorAll('.kard');
      [...kards].forEach((kard) => {
        kard.addEventListener('click', function () {
          kard.classList.toggle('is-flipped');
        });
      });
    }
    )

    return {
      route,
      deck: computed(() => AppState.deck),
      deckCards: computed(() => AppState.deckCards)
      // card: computed(() => AppState.deckCard.card)

    };
  },
  components: { Card }
}
</script>


<style lang="scss" scoped></style>