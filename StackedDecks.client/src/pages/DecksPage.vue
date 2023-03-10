<template>
  <div class="container-fluid bg-pic">
    <div class="row" v-if="decks">
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


<style lang="scss" scoped>
.bg-pic {
  background-image: url(https://s3-alpha-sig.figma.com/img/c18b/c619/66e4aec6a0b9109642c48b4be8160384?Expires=1679270400&Signature=ki65DIggD4AN4p59c-5-tKaotHn95DOL4Y6s4Cvc8sFHUoM7YfbKNDJfexMMe4dsuuK8xCbaWD9NdckDee~H9cf04zRKpfE1jWRqRrdMbJLSaZ1TmrATLc6mhQAzRFuthht2SMVXbp15n3xCA2EIf33iRc88-W~kKGWUIvaBSvDs2UX33rIJIei-8KWquN-ZWN-ewppJ5xNMeTq3wxEiguQ0QXbZCKsYexZWTvf4H8QZ3sooV7xi7DeRiDuFvZPLq3zJDCHBXUe3MDpwQQNglOqfQnk8bnGCd-cgXSSITCxXP78S6XpBW3GsGw8Isae0QlkLaVCe0Ax-JhxpTlHx2Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4);
  background-size: cover;
  background-position: center;

}
</style>