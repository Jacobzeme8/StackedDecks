<template>
  <!-- NOTE Filter catagory  -->
  <div class="container-fluid">
    <div class="row my-4">
      <div class="col-md-12 p-4 mb-3">
        <h1 class="text-dark"></h1>
      </div>
      <div class="col-md-10 m-auto">
        <div class="bg-primary rounded p-3 d-flex justify-content-around">
          <button @click="changeFilterType('all')" class="btn btn-outline-light text-dark">All</button>
          <button @click="changeFilterType('arms')" class="btn btn-outline-light text-dark">Arms</button>
          <button @click="changeFilterType('back')" class="btn btn-outline-light text-dark">Back</button>
          <button @click="changeFilterType('cardio')" class="btn btn-outline-light text-dark">Cardio</button>
          <button @click="changeFilterType('chest')" class="btn btn-outline-light text-dark">Chest</button>
          <button @click="changeFilterType('core')" class="btn btn-outline-light text-dark">Core</button>
          <button @click="changeFilterType('legs')" class="btn btn-outline-light text-dark">Legs</button>
          <button @click="changeFilterType('shoulders')" class="btn btn-outline-light text-dark">Shoulders</button>
        </div>
      </div>
    </div>
  </div>

  <!-- NOTE Cards -->
  <h1>Workout Cards:</h1>
  <div class="container-fluid bg-pic">
    <div class="row">

      <div v-for="c in cards" class="col-md-4">
        <Card :decks="decks" :card="c" />
      </div>

    </div>
  </div>
</template>


<script>
import { onMounted, computed, ref, onUpdated, watchEffect, onBeforeUpdate } from 'vue';
import { AppState } from '../AppState.js';
import Card from '../components/Card.vue';
import { cardsService } from '../services/CardsService.js';
import { decksServices } from "../services/DecksService";
import { logger } from "../utils/Logger";
import Pop from '../utils/Pop.js';


export default {
  setup() {
    const filterType = ref('all')


    async function getAllCards() {
      try {
        await cardsService.getAllCards()
      } catch (error) {
        Pop.error(error)
      }
    }

    async function getMyDecks() {
      try {
        await decksServices.getMyDecks()
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getAllCards()

    })

    watchEffect(() => {
      if (filterType.value) {
        let kards = document.querySelectorAll('.kard');
        [...kards].forEach((kard) => {
          kard.classList.remove('is-flipped')
          kard.addEventListener('click', function () {
            kard.classList.toggle('is-flipped');
          });
        });
      }
    })

    watchEffect(() => {
      if (AppState.account.id) {
        getMyDecks()
        let kards = document.querySelectorAll('.kard');
        [...kards].forEach((kard) => {
          kard.classList.remove('is-flipped')
          kard.addEventListener('click', function () {
            kard.classList.toggle('is-flipped');
          });
        });
      }
    })


    onBeforeUpdate(() => {

      let kards = document.querySelectorAll('.kard');
      [...kards].forEach((kard) => {
        kard.addEventListener('click', function () {
          kard.classList.toggle('is-flipped');
        });
      });
    }
    )


    return {
      decks: computed(() => AppState.decks),
      cards: computed(() => {
        if (filterType.value == 'all') {
          return AppState.cards.slice(0, AppState.account.id ? undefined : 3)
        }
        else {
          return AppState.cards.filter(c => c.muscleGroup == filterType.value).slice(0, AppState.account.id ? undefined : 3)
        }
      }),

      changeFilterType(c) {
        filterType.value = c
      },
      account: computed(() => AppState.account)
    }
  },
  components: { Card }
}
</script>

<style scoped lang="scss">
.kard.is-flipped {
  transform: translateX(-100%) rotateY(-180deg);
}

.bg-pic {
  background-image: url(https://s3-alpha-sig.figma.com/img/ce11/88bd/a66c08afe888331707245a0eb22ab9cd?Expires=1679270400&Signature=ZtvAIUwLhjtxH7BacWkfdFG06VbcfHxzGf36CVr~80QNLWkUiQisK~pb8IcOQxSH4WnYKutLzXJ8YTunuLiI-NacppsNmuH94K5SzdmPXCTVXAHIKrzczlaPEwo~f2BAqsA5JLmFD0chx-JAYVTjRq9ocGGxBw02cYjn0M~1yWgM1TkxBdLnoOsStSyUsiHhrM13k72TWxfLWf-VP0NjDSGI977qgkueUt-t4XLMx1UCDsmf7MnV1RNMkYOJzrKWM7Lu4B~SCEVtrweCZWmLW3diJz~aygpwGl-zq-M6FrckQDLCfRl5Ah-T-PZoJK5tBldI4Z2jg4Ddt8Tp~WOvJQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4);
  background-size: auto;
  background-position: center;
  // opacity: 85%;
}

.bg-color {
  background-color: #501537;
}
</style>
