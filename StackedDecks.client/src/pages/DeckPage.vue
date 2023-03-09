<template>
  <div class="component">


  </div>
</template>


<script>
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { deckCardsService } from "../services/DeckCardsService"
import { useRoute } from "vue-router";
import { onMounted } from "vue";

export default {
  setup() {

    const route = useRoute()

    async function getDeckCardsForDeck() {
      try {
        const deckId = route.params.deckId
        await deckCardsService.getDeckCardsForDeck(deckId)
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }

    onMounted(() =>
      getDeckCardsForDeck()
    )

    return {}
  }
}
</script>


<style lang="scss" scoped></style>