<template>
  <header class="bg-color">
    <Navbar />
  </header>
  <main class="bg-color">
    <div class="container-fluid">
      <div class="row ">
        <div class="col-md-2 d-flex flex-column justify-content-between" v-if="route.path != '/about'">
          <!-- NOTE offcanvas start -->
          <button class="filter-mobile btn btn-outline-light filter-buttons text-light mb-2" type="button"
            data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
            <i class="mdi mdi-filter-multiple text-light"></i>
          </button>
          <div class="offcanvas offcanvas-start text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel">
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
              aria-label="Close"></button>
            <div class="offcanvas-body">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-12 ">
                    <div class="d-flex flex-column sticky-top">
                      <button data-bs-dismiss="offcanvas" @click="changeFilterType('all')"
                        class="btn btn-outline-light my-1 filter-buttons bebas">All</button>
                      <button data-bs-dismiss="offcanvas" @click="changeFilterType('arms')"
                        class="btn btn-outline-light my-1 filter-buttons bebas">Arms</button>
                      <button data-bs-dismiss="offcanvas" @click="changeFilterType('back')"
                        class="btn btn-outline-light my-1 filter-buttons bebas">Back</button>
                      <button data-bs-dismiss="offcanvas" @click="changeFilterType('cardio')"
                        class="btn btn-outline-light my-1 filter-buttons bebas">Cardio</button>
                      <button data-bs-dismiss="offcanvas" @click="changeFilterType('chest')"
                        class="btn btn-outline-light my-1 filter-buttons bebas">Chest</button>
                      <button data-bs-dismiss="offcanvas" @click="changeFilterType('core')"
                        class="btn btn-outline-light my-1 filter-buttons bebas">Core</button>
                      <button data-bs-dismiss="offcanvas" @click="changeFilterType('fullBody')"
                        class="btn btn-outline-light my-1 filter-buttons bebas">Full
                        Body</button>
                      <button data-bs-dismiss="offcanvas" @click="changeFilterType('legs')"
                        class="btn btn-outline-light my-1 filter-buttons bebas">Legs</button>
                      <button data-bs-dismiss="offcanvas" @click="changeFilterType('lowerBody')"
                        class="btn btn-outline-light my-1 filter-buttons bebas">Lower
                        Body</button>
                      <button data-bs-dismiss="offcanvas" @click="changeFilterType('shoulders')"
                        class="btn btn-outline-light my-1 filter-buttons bebas">Shoulders</button>
                      <button data-bs-dismiss="offcanvas" @click="changeFilterType('upperBody')"
                        class="btn btn-outline-light my-1 filter-buttons bebas">Upper
                        Body</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- NOTE offcanvas end -->
          <div class=" filter-desktop">
            <div class="d-flex flex-column sticky-top">
              <button @click="changeFilterType('all')"
                class="btn btn-outline-light my-1 filter-buttons bebas">All</button>
              <button @click="changeFilterType('arms')"
                class="btn btn-outline-light my-1 filter-buttons bebas">Arms</button>
              <button @click="changeFilterType('back')"
                class="btn btn-outline-light my-1 filter-buttons bebas">Back</button>
              <button @click="changeFilterType('cardio')"
                class="btn btn-outline-light my-1 filter-buttons bebas">Cardio</button>
              <button @click="changeFilterType('chest')"
                class="btn btn-outline-light my-1 filter-buttons bebas">Chest</button>
              <button @click="changeFilterType('core')"
                class="btn btn-outline-light my-1 filter-buttons bebas">Core</button>
              <button @click="changeFilterType('fullBody')" class="btn btn-outline-light my-1 filter-buttons bebas">Full
                Body</button>
              <button @click="changeFilterType('legs')"
                class="btn btn-outline-light my-1 filter-buttons bebas">Legs</button>
              <button @click="changeFilterType('lowerBody')" class="btn btn-outline-light my-1 filter-buttons bebas">Lower
                Body</button>
              <button @click="changeFilterType('shoulders')"
                class="btn btn-outline-light my-1 filter-buttons bebas">Shoulders</button>
              <button @click="changeFilterType('upperBody')" class="btn btn-outline-light my-1 filter-buttons bebas">Upper
                Body</button>
            </div>
          </div>
          <div class="mb-2">
            <router-link :to="{ name: 'About' }" class="d-flex flex-column mb-2">
              <button class="btn btn-outline-light filter-buttons flex-fill">About</button>
            </router-link>
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
import { useRoute, useRouter } from "vue-router"
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

    watchEffect(() => {
      if (route.path) {
        filterType.value = 'all'
        // logger.log(router)
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

.bebas {
  font-family: 'Bebas Neue', cursive;
  text-shadow: 1px 1px 2px black;
}

.filter-mobile {
  display: none;
}

@include media-breakpoint-down(md) {
  .filter-mobile {
    display: block;
  }
}

.filter-desktop {
  display: block;
}

@include media-breakpoint-down(md) {
  .filter-desktop {
    display: none;
  }
}

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

// background-color: rgba(177, 78, 136, 0.682);

.filter-buttons {
  background: rgba(160, 70, 123, 0.684);
  background: linear-gradient(180deg, rgba(177, 78, 136, 0.682) 100%, #d9dace 0%);
}

.filter-buttons:hover {
  opacity: .65;
  text-transform: uppercase;
  text-shadow: none;
}
</style>
