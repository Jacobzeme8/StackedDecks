<template>
  <!-- <div class=" d-flex bg-color px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <h1 class="logo-font text-light">Stacked Decks</h1>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="justify-content-end d-flex" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li v-if="account.id">
          <router-link :to="{ name: 'Decks' }">
            <button class="btn btn-outline-light me-2 filter-buttons">Posted Decks</button>
          </router-link>
        </li>
        <li>
          <button v-if="account.id" class="btn btn-outline-light filter-buttons" data-bs-toggle="modal"
            data-bs-target="#test-modal">
            Create Deck
          </button>
          <Modal id="test-modal" modal-title="Create Deck">
            <DeckForm />
          </Modal>
        </li>
      </ul>
    </div>

    <Login />
  </div> -->
  <div class="container-fluid bg-color">
    <div class="row">
      <div class="col-12 p-2 d-flex justify-content-between align-items-center">
        <router-link class=" d-flex align-items-center" :to="{ name: 'Home' }">
          <img class="sd" src="Logo.png" alt="">
          <div class="d-flex flex-column ">
            <h1 class="logo-font text-light">Stacked Decks</h1>
          </div>
        </router-link>
        <div class="d-flex">
          <router-link :to="{ name: 'Decks' }" class="align-items-center d-flex">
            <button class="btn btn-outline-light me-2 filter-buttons">Posted Decks</button>
          </router-link>
          <div class="d-flex align-items-center">
            <button v-if="account.id" class="btn btn-outline-light filter-buttons me-2" data-bs-toggle="modal"
              data-bs-target="#test-modal">
              Create Deck
            </button>
          </div>
          <Login class="p-0" />
        </div>
      </div>
    </div>
  </div>
  <Modal id="test-modal" modal-title="Create Deck">
    <DeckForm />
  </Modal>
</template>

<script>
import Login from './Login.vue'
import { onMounted, computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter()
    return {
      account: computed(() => AppState.account),
      router

    }
  },
  components: { Login }
}
</script>

<style scoped>
.sd {
  height: 7em;
}

a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  /* border-bottom: 2px solid var(--bs-success); */
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

/* @media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
} */

.bg-color {
  background: rgb(0, 51, 87);
  background: linear-gradient(0deg, #003357 0%, #d9dace 160%);
}

.logo-font {
  font-family: 'Bebas Neue', cursive;
}

.filter-buttons {
  background: rgba(160, 70, 123, 0.684);
  background: linear-gradient(180deg, rgba(177, 78, 136, 0.682) 100%, #d9dace 0%);
}

.filter-buttons:hover {
  opacity: .65;
  text-transform: uppercase;
}
</style>
