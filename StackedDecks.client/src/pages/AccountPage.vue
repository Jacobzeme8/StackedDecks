<template>
  <!-- Button trigger modal -->
  <div class="container-fluid mt-3">
    <div class="row mt-3 me-2">
      <div class="col-md-12 d-flex justify-content-end mt-3 ms-2">
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Account</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <EditAccountForm />
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid bg-coverImg">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-md-6">
        <div class="d-flex justify-content-center pt-5">
          <div>
            <img class="rounded-circle" width="300" height="300" :src="account.picture" alt="">
          </div>
        </div>
        <div class="card frosted mt-3">
          <div class="card-body">
            <div class="">
              <div class="d-flex justify-content-center">
                <div>
                  <h3 class="text-center"><b>{{ account.name }}</b></h3>
                </div>
              </div>
            </div>
            <div class="">
              <h6 class="text-center">{{ account.bio }}</h6>
            </div>
          </div>
        </div>

        <div class="text-center edit-btn">
          <button type="button" class="btn btn-outline justify-content-center on-hover" data-bs-toggle="modal"
            data-bs-target="#exampleModal" aria-label="Edit Account" title="Edit Account">
            <i class="mdi mdi-pencil fs-1 text-light"></i>
          </button>
        </div>
      </div>
    </div>
  </div>


  <div class="pb-4">
    <h1>MY DECKS:</h1>
    <div class="container-fluid bg-pic">
      <div class="row" v-if="decks">
        <div v-for="deck in decks" class="col-md-3">
          <Deck :deck="deck" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import EditAccountForm from '../components/EditAccountForm.vue';
import { decksServices } from '../services/DecksService.js';
export default {
  props: {
    decks: {
      type: Object,
      required: true
    }
  },
  setup() {


    async function getMyDecks() {
      try {
        await decksServices.getMyDecks()
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }


    onMounted(() =>
      getMyDecks()
    )
    return {
      account: computed(() => AppState.account),
      coverImg: computed(() => `url("${AppState.account?.coverImg}")`),
      deck: computed(() => AppState.deck),
    };
  },
  components: { EditAccountForm }
}
</script>

<style scoped>
/* .Cover-image {
  height: auto;
  max-width: 100px;
} */
.bg-coverImg {
  background-image: v-bind(coverImg);
  background-size: cover;
  background-position: center;
  height: 70vh;

}

.account-data {
  transform: translateY(-120%);
}

.edit-btn {
  transform: translateY(-300%);

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
