<template>
  <!-- NOTE Face of Card -->
  <div class=" my-3">
    <div class="kard bg-secondary rounded">
      <div class="kard_face kard-front card bg-card p-2 rounded">
        <div class="card elevation-5">
          <i v-if="!card.imgUrl" class="mdi mdi-loading mdi-spin"></i>
          <img class="img-fluid types" :src="card.imgUrl" :alt="card.name">
        </div>
        <div class="pb-1 text-center ">
          <div class="card-body elevation-3 rounded-bottom">
            <p class="text-capitalize"><b>{{ card.name }}</b></p>
            <p class="mb-0">CLICK IMAGE TO SEE DETAILS</p>
          </div>
        </div>
        <div class="my-2">
          <div>
            <form v-if="account.id" @submit.prevent="addCardToDeck(editable.value, card.id)" class="d-flex">
              <button @click.stop type="submit" class="btn btn-outline-dark rounded-left d-flex flex-wrap m-auto">
                Add To Deck
              </button>
              <select placeholder="select a deck" @click.stop v-model="editable.value"
                class="form-select rounded-right w-75 m-auto " aria-label="Default select example">
                <option v-for="deck in decks" :value="deck.id" selected>{{ deck.name }}</option>
              </select>
            </form>
          </div>
        </div>
      </div>

      <!-- NOTE Back of card -->
      <div class="card kard_face  scrollbox kard-back">
        <!-- <img class="img-fluid" :src="card.imgUrl" :alt="card.name"> -->
        <div class="Deck_Card_Info ">
          <h2 class="text-capitalize fw-bold">{{ card?.name }}</h2>
          <div v-if="card?.difficulty == 'beginner'" class="progress" role="progressbar" aria-label="Basic example"
            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar bg-success" style="width: 25%"></div>
          </div>
          <div v-if="card?.difficulty == 'intermediate'" class="progress" role="progressbar" aria-label="Basic example"
            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar bg-warning" style="width: 50%"></div>
          </div>
          <div v-if="card?.difficulty == 'expert'" class="progress" role="progressbar" aria-label="Basic example"
            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar bg-danger" style="width: 100%"></div>
          </div>
          <p class="text-capitalize"><b>Level:</b> {{ card?.difficulty }}</p>

          <div class="card-body elevation-3 p-2">
            <h4 class="text-capitalize fw-bold">{{ card?.muscleGroup }}</h4>
            <p class="fs-6"><b>Instructions:</b> {{ card?.instruction }}</p>
            <p class="text-center">{Back Side}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, computed } from "vue";
import { AppState } from "../AppState";
import { Card } from '../models/Card.js';
import { Deck } from "../models/Deck";
import { deckCardsService } from "../services/DeckCardsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
// import { DeckCard } from '../models/DeckCard.js';

export default {
  props: {
    card: { type: Object, required: true },
    decks: { type: Array, required: true }
    // deckCard: { type: DeckCard, required: true }

  },
  setup() {
    const editable = ref({})

    return {
      account: computed(() => AppState.account),
      editable,
      async addCardToDeck(deckId, cardId) {
        try {
          if (!deckId) { Pop.error('Please select a deck!') }
          else {
            await deckCardsService.addCardToDeck(deckId, cardId)
            Pop.success('Added Card!')
          }
        } catch (error) {
          logger.error(error)

        }
      }


    }

  }
}

</script>


<style lang="scss" scoped>
.bg-card {
  background-color: rgba(177, 78, 136, 0.682);
}

.kard_face {
  // position: absolute;

  backface-visibility: hidden;
}

.kard {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transform-style: preserve-3d;
  transform-origin: center right;
  transition: transform .75s;

}

.kard.is-flipped {
  transform: translateX(-100%) rotateY(-180deg);
}



.kard-back {
  position: fixed;
  top: 0%;
  transform: rotateY(180deg);
}

.scrollbox {
  height: 100%;
  overflow: auto;
}

.small {}

.icon {
  border: solid 2em transparent;
  border-top-color: white;
  bottom: -1.5em;
  color: white;
  height: 0;
  left: 50%;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  text-align: center;
  transform: translate(-50%, 0);
  transition: all .2s ease-out;
  width: 0;
}

.show-icon {
  .icon {
    animation: flash 1.5s infinite linear;
    // opacity:1;
  }
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  background-color: #eff3ff;
}

.ccontainer {
  width: 350px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}

#card {
  position: relative;
  width: 100%;
  padding: 30px 20px;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
}

#card img {
  display: block;
  width: 180px;
  max-height: 200px;
  position: relative;
  margin: 20px auto;
}

.hp {
  width: 80px;
  background-color: #ffffff;
  text-align: center;
  padding: 8px 0;
  border-radius: 30px;
  margin-left: auto;
  font-weight: 400;
}

.poke-name {
  text-align: center;
  font-weight: 600;
}

.types {
  display: flex;
  justify-content: space-around;
  margin: 20px 0 40px 0;
}

.hp span,
.types span {
  font-size: 12px;
  letter-spacing: 0.4px;
  font-weight: 600;
}

.types span {
  padding: 5px 20px;
  border-radius: 20px;
  color: #ffffff;
}

.stats {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
}

.stats p {
  color: #404060;
}

#btn {
  display: block;
  padding: 15px 60px;
  font-size: 18px;
  background-color: #101010;
  color: #ffffff;
  position: relative;
  margin: 30px auto;
  border: none;
  border-radius: 5px;
}
</style>