<template>
  <div class="container-fluid bg-pic rounded-top pb-5">
    <div class="row">
      <div class="col-md-12">
        <h1 class="text-light bebas mt-2">Posted Decks:</h1>
      </div>
    </div>
    <div class="row d-flex justify-content-between" v-if="decks">
      <div v-for="deck in decks" class="col-md-6 col-lg-3 d-flex justify-content-center fit-content">
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
  props: {
    decks: {
      type: Object,
      required: true
    }
  },
  setup() {

    async function getAllDecks() {
      try {

        await decksServices.getAllDecks()
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }

    async function getMyDecks() {
      try {
        await decksServices.getMyDecks()
      } catch (error) {
        logger.log(error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getAllDecks();
      getMyDecks()
    }
    )

    return {
      decks: computed(() => AppState.decks),
      myDecks: computed(() => AppState.myDecks),
      isBookmarked: computed(() => AppState.myDecks.includes())
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

.bebas {
  font-family: 'Bebas Neue', cursive;
}

.fit-content {
  object-fit: contain;
  // position: fixed;
}
</style>