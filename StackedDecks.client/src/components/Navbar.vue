<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-color px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <h1 class="logo-font">Stacked Decks</h1>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>

        </li>
        <li v-if="account.id">
          <router-link :to="{ name: 'Decks' }">
            <button class="btn btn-secondary me-2">Posted Decks</button>
          </router-link>
        </li>
        <li>
          <button v-if="account.id" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#test-modal">
            Create Deck
          </button>
          <Modal id="test-modal" modal-title="Create Deck">
            <DeckForm />
          </Modal>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import Login from './Login.vue'
import { onMounted, computed, ref } from 'vue';
import { AppState } from '../AppState.js';

export default {
  setup() {
    return {
      account: computed(() => AppState.account),

    }
  },
  components: { Login }
}
</script>

<style scoped>
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

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}

.bg-color {
  background: rgb(0, 51, 87);
  background: linear-gradient(0deg, #003357 0%, #d9dace 100%);
}

.logo-font {
  font-family: 'Bebas Neue', cursive;
}
</style>
