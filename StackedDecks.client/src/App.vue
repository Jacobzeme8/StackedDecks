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
          <div class=" filter-desktop sticky-top shadow sticky-top">
            <div class="d-flex flex-column">
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
        </div>
        <div class="col-md-10 m-auto">
          <router-view :decks="decks" :cards="cards" />
        </div>
      </div>
    </div>
  </main>
  <footer class="bg-color-rev d-flex">
    <div v-if="route.path != '/account'" class="container-fluid bg-color-rev">
      <div v-if="route.path != '/decks'" class="row">
        <div v-if="route.path != '/about'" class="col-md-12">
          <div class="fs-5 text-center my-5">
            <router-link :to="{ name: 'SponsorPage' }">
              <h3>Our Sponsors:</h3>
            </router-link>
          </div>
          <div class="d-flex justify-content-between bg-color-rev">
            <div class="mb-2">
              <router-link :to="{ name: 'About' }" class="d-flex flex-column mb-2">
                <span class="aboutus"><a></a></span>
              </router-link>
            </div>
            <div class="">
              <img class="taller rounded" src="Public\Tempo.jpg" alt="">
            </div>
            <div>
              <img class="taller rounded" src="Public\PageTurn.jpg" alt="">
            </div>
            <div>
              <img class=" taller rounded" src="Public\SuperSetter.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed, ref, watchEffect, onUpdated, onMounted } from 'vue'
import { useRoute, useRouter } from "vue-router"
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import { logger } from "./utils/Logger"

export default {
  setup() {

    const filterType = ref('all')
    const route = useRoute()
    watchEffect(() => {
      if (filterType.value) {
        logger.log('filter watch effect')
        let cards = document.querySelectorAll('.kard');
        [...cards].forEach((card) => card.classList.remove('is-flipped'))
      }
    })

    watchEffect(() => {
      if (route.path) {
        filterType.value = 'all'
        // logger.log(router)
      }
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

.taller {
  height: 50px;
}

.bg-color-rev {
  background: #d9dace;
  height: 20vh;

}

.bebas {
  font-family: 'Bebas Neue', cursive;
  text-shadow: 1px 1px 2px black;
}

.shadow {
  box-shadow: 1px 4px 2px black;
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
  height: 100vh;
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

// NOTE Fun stuff
.aboutus {
  position: relative;
  display: inline-flex;
  width: 180px;
  height: 55px;
  margin: 0 15px;
  perspective: 1000px;
}

.aboutus a {
  font-size: 19px;
  letter-spacing: 1px;
  transform-style: preserve-3d;
  transform: translateZ(-25px);
  transition: transform .25s;
  font-family: 'Bebas Neue', cursive;

}

.aboutus a:before,
.aboutus a:after {
  position: absolute;
  content: "About Us!";
  height: 55px;
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid black;
  box-sizing: border-box;
  border-radius: 5px;
}

.aboutus a:before {
  color: #fff;
  background: rgba(160, 70, 123, 0.684);
  transform: rotateY(0deg) translateZ(25px);
}

.aboutus a:after {
  color: #000;
  transform: rotateX(90deg) translateZ(25px);
}

.aboutus a:hover {
  transform: translateZ(-25px) rotateX(-90deg);
}
</style>
