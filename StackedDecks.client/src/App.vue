<template>
  <header class="bg-color">
    <Navbar />
  </header>
  <main class="bg-color">
    <div class="container-fluid">
      <div class="row ">
        <div class="col-2 d-flex flex-column">
          <button @click="changeFilterType('all')" class="btn btn-outline-light text-dark">All</button>
          <button @click="changeFilterType('arms')" class="btn btn-outline-light text-dark">Arms</button>
          <button @click="changeFilterType('back')" class="btn btn-outline-light text-dark">Back</button>
          <button @click="changeFilterType('cardio')" class="btn btn-outline-light text-dark">Cardio</button>
          <button @click="changeFilterType('chest')" class="btn btn-outline-light text-dark">Chest</button>
          <button @click="changeFilterType('core')" class="btn btn-outline-light text-dark">Core</button>
          <button @click="changeFilterType('legs')" class="btn btn-outline-light text-dark">Legs</button>
          <button @click="changeFilterType('shoulders')" class="btn btn-outline-light text-dark">Shoulders</button>
        </div>
        <div class="col-10">
          <router-view />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
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


footer {
  display: grid;
  place-content: center;
  height: 32px;
}


.bg-color {
  background: rgb(0, 51, 87);
  background: linear-gradient(180deg, #003357 0%, #d9dace 100%);

}
</style>
