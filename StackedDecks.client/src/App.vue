<template>
  <header class="bg-color">
    <Navbar />
  </header>
  <main class="bg-color">
    <div class="container-fluid">
      <div class="row ">
        <div class="col-md-2" v-if="route.path != '/about'">
          <div class="d-flex flex-column sticky-top">
            <button @click="changeFilterType('all')"
              class="btn btn-outline-light text-light my-1 filter-buttons">All</button>
            <button @click="changeFilterType('arms')"
              class="btn btn-outline-light text-light my-1 filter-buttons">Arms</button>
            <button @click="changeFilterType('back')"
              class="btn btn-outline-light text-light my-1 filter-buttons">Back</button>
            <button @click="changeFilterType('cardio')"
              class="btn btn-outline-light text-light my-1 filter-buttons">Cardio</button>
            <button @click="changeFilterType('chest')"
              class="btn btn-outline-light text-light my-1 filter-buttons">Chest</button>
            <button @click="changeFilterType('core')"
              class="btn btn-outline-light text-light my-1 filter-buttons">Core</button>
            <button @click="changeFilterType('legs')"
              class="btn btn-outline-light text-light my-1 filter-buttons">Legs</button>
            <button @click="changeFilterType('shoulders')"
              class="btn btn-outline-light text-light my-1 filter-buttons">Shoulders</button>
          </div>
        </div>
        <div class="col-md-10 m-auto">
          <router-view :decks="decks" :cards="cards" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed, ref, watchEffect, onUpdated, onMounted } from 'vue'
import { useRoute } from "vue-router"
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import { logger } from "./utils/Logger"

export default {
  setup() {
    function addFlipEffect() {
      let kards = document.querySelectorAll('.kard');
      [...kards].forEach((kard) => {
        kard.classList.remove('is-flipped')
        kard.removeEventListener('click', function () {
          kard.classList.toggle('is-flipped');
        });
        kard.addEventListener('click', function () {
          kard.classList.toggle('is-flipped');
        });
      });
    }
    const filterType = ref('all')
    const route = useRoute()
    watchEffect(() => {
      if (filterType.value) {
        addFlipEffect()
      }
    })

    onMounted(() => {
      addFlipEffect()
    })
    return {
      route,
      appState: computed(() => AppState),
      changeFilterType(c) {
        filterType.value = c
      },
      cards: computed(() => {

        if (filterType.value == 'all') {
          let filter = AppState.cards
          return filter
        }
        else {
          let filter = AppState.cards.filter(c => c.muscleGroup == filterType.value)
          return filter
        }
      }),
      decks: computed(() => {
        if (filterType.value == 'all') {
          return AppState.decks
        }
        else {
          let filter = AppState.decks.filter(d => d.exerciseType.includes(filterType.value))
          return filter
        }
      })

    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

.sticky-top {
  position: sticky;
  top: 1em;
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}


.bg-color {
  background: rgb(0, 51, 87);
  background: linear-gradient(180deg, #003357 0%, #d9dace 100%);
}

.filter-buttons {
  background: rgb(0, 51, 87);
  background: linear-gradient(180deg, #003357 100%, #d9dace 0%);
}

.filter-buttons:hover {
  opacity: .65;
  text-transform: uppercase;
}
</style>
