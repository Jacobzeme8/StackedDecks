<template>
  <div class="relative">
    <div class=" bg-card decks-stacked card elevation-3 shadow-lg p-3 my-4 fit-content" v-if="route">
      <div class="d-flex flex-row elevation-3 rounded justify-content-between">
        <!-- NOTE deck.id is not deckId as it is pulling by prop -->
        <div title="Bookmark this deck" @click="copyDeck(deck.id)" v-if="deck.creatorId != account.id">
          <i class="mdi mdi-star text-warning fs-2 selectable"></i>
        </div>
        <div v-if="deck.isCopied == false && deck.isPublic == false">
          <div title="Post this deck" v-if="account.id == deck.creatorId && route.path == '/account'"
            @click="postDeck(deck.id)">
            <i class="mdi mdi-postage-stamp fs-2 selectable text-secondary"></i>
          </div>
        </div>
        <div title="Delete this deck" v-if="account.id == deck.creatorId" @click="deleteDeck(deck.id)">
          <i class="mdi mdi-delete text-danger fs-2 selectable"></i>
        </div>
        <div v-if="route.path == `/account`">
          <i data-bs-toggle="modal" :data-bs-target="`#modal${deck.id.toString()}`" :title="`${deck.name} note`"
            class="selectable mdi mdi-note fs-2 text-warning"></i>
        </div>
      </div>
      <div class="d-flex text-light justify-content-center">
        <p> <b>{{ deck.name }}</b> </p>
      </div>
      <router-link :to="{ name: 'Deck', params: { deckId: deck.id } }">
        <img class="img-fluid rounded elevation-3 cover-img mb-2" :title="`${deck.name} page`" :src="deck.coverImg"
          alt="">
      </router-link>
      <router-link :to="{ name: 'Profile', params: { creatorId: deck.creatorId } }">
        <div v-if="deck.creator" class="d-flex text-light align-items-center justify-content-between">
          <b>{{ deck.creator.name }}</b>
          <img class="img-fluid rounded-circle profile-img" :src="deck.creator.picture" alt="">
        </div>
      </router-link>
    </div>
    <div class="card-1 card"></div>
    <div class="card card-2"></div>
    <div class="card card-3"></div>
  </div>
  <Modal :id="`modal${deck.id.toString()}`" modal-title="Create Deck">
    <NoteComponent :deck="deck" />
  </Modal>
</template>


<script>
import { Deck } from "../models/Deck";
import { logger } from "../utils/Logger";
import { decksServices } from "../services/DecksService";
import Pop from "../utils/Pop";
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import { useRoute, useRouter } from "vue-router";
import { DeckCard } from "../models/DeckCard.js";
import { router } from "../router.js";
import NoteComponent from "./NoteComponent.vue";

export default {
  props: {
    deck: {
      type: Deck,
      required: true
    }
  },
  setup() {
    const route = useRoute();

    onMounted(() => { logger.log(route); });
    return {
      route,
      account: computed(() => AppState.account),
      async postDeck(deckId) {
        try {
          await decksServices.postDeck(deckId);
          Pop.success("Your deck has been posted.");
        }
        catch (error) {
          logger.error(error);
          Pop.error(error);
        }
      },
      async copyDeck(deckId) {
        try {
          const copied = await decksServices.copyDeck(deckId);
          Pop.success("You have successfully bookmarked this deck!");
          if (copied?.id) {
            router.push({ name: "Deck", params: { deckId: copied.id } });
          }
        }
        catch (error) {
          logger.error(error);
          Pop.error(error);
        }
      },
      async deleteDeck(deckId) {
        try {
          if (await Pop.confirm("Are you sure you want to delete this deck?")) {
            await decksServices.deleteDeck(deckId);
          }
        }
        catch (error) {
          logger.error(error);
          Pop.error(error);
        }
      }
    };
  },
  components: { NoteComponent }
}
</script>


<style lang="scss" scoped>
.profile-img {
  height: 45px;
  width: 45px;
}

.fit-content {
  object-fit: contain;
}

.cover-img {
  object-fit: cover;
  width: 100%;
  height: 30vh;
}

.relative {
  position: relative;
}

.bg-card {
  background-color: #2e536dee;
}

.card {
  background-color: #2e536dee;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 6px 16px rgba(93, 98, 98, 0.2);
  height: 420px;
  padding: 20px;
  transition: all 0.8s ease;
  width: 270px;
  z-index: 4;
}

.card-1 {
  background-color: rgb(126, 51, 95);
  position: absolute;
  bottom: 1.5vh;
  height: 415px;
  width: 268px;
  z-index: 3;
}

.card-2 {
  background-color: rgb(134, 51, 100);
  margin-left: 10px;
  position: absolute;
  bottom: .5vh;
  margin-top: 10px;
  width: 250px;
  z-index: 2;
}

.card-3 {
  background-color: rgb(140, 58, 106);
  margin-left: 20px;
  position: absolute;
  bottom: -.5vh;
  margin-top: 20px;
  width: 235px;
  z-index: 1;
}
</style>