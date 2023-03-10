<template>
  <div v-if="deck">
    <div class="container-fluid">
      <div class="row d-flex bg-banner">
        <div class="col-md-2"></div>
        <div class="col-md-8 p-2">
          <div class="card elevation-5 mx-auto frosted">
            <div class="card-body">
              <div v-if="account.id == deck.creatorId">
                <h6 title="Stacked progress is the mastery of this deck." class="text-center">Stacked
                  Progress</h6>
                <div class="d-flex justify-content-center">
                  <div class="progress w-50 " role="progressbar" aria-label="Example 20px high" aria-valuenow="25"
                    aria-valuemin="0" aria-valuemax="100" style="height: 20px">
                    <div class="progress-bar" style="width: 25%"></div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center pt-2">
                <h1 class="text-center">My {{ deck.name }} Deck </h1>
                <img class="img-fluid ms-3 rounded-circle profile-img" :src="deck.creator.picture" alt="">
              </div>
              <div v-if="account.id == deck.creatorId">

                <h6 class="text-center">Current Exercise Progress</h6>
                <div class="d-flex justify-content-center">
                  <div class="progress w-25 " role="progressbar" aria-label="Example 1px high" aria-valuenow="25"
                    aria-valuemin="0" aria-valuemax="100" style="height: 1px">
                    <div class="progress-bar" style="width: 25%"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="col-md-2">
        </div>
      </div>
    </div>
    <div v-for="d in deckCards">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <Card :card="d.card" />
          </div>
        </div>
      </div>
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
      account: computed(() => AppState.account),
      deck: computed(() => AppState.deck),
      deckCards: computed(() => AppState.deckCards),
      coverImg: computed(() => `url("${AppState.deck?.coverImg}")`)

      // card: computed(() => AppState.deckCard.card)

    };
  },
  components: { Card }
}
</script>


<style lang="scss" scoped>
.bg-banner {

  background-image: v-bind(coverImg);
  background-size: cover;
  background-position: center;
  opacity: 80%;
  height: 40vh;
}

.width-card {
  width: 40vh;
}

.profile-img {
  height: 45px;
  width: 45px;
}

.frosted {
  box-shadow: 0 0 5px 0;
  background: inherit;
  backdrop-filter: blur(80px);
  /* margin: 100px; */
}

.frosted-x {
  box-shadow: 0 0 5px 0;
  background: inherit;
  /* margin: 100px; */
}
</style>