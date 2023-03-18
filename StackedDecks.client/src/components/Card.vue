<template>
  <!-- NOTE Face of Card -->
  <div class="my-3">
    <div class="kard shadow bg-secondary rounded">
      <div class="kard_face shadow kard-front card bg-card p-2 rounded">
        <div class="card elevation-5">
          <i v-if="!card.imgUrl" class="mdi mdi-loading mdi-spin"></i>
          <img class="img-fluid rounded types" :src="card.imgUrl" :alt="card.name">
        </div>
        <div class="pb-1 text-center ">
          <div class="card-body elevation-3 rounded-bottom">
            <p class="text-capitalize"><b>{{ card.name }}</b></p>
            <p class="mb-0 on-hover">CLICK IMAGE TO SEE DETAILS</p>
          </div>
        </div>
        <div v-if="deckCard && backPath != '/decks'">
          <div v-if="deckCard.creatorId == account.id">
            <form @submit.prevent="saveExerciseInfo(reps, weight, sets, time, deckCard.id)">
              <div class="d-flex justify-content-between">
                <span>reps</span>
                <span>weight</span>
              </div>
              <div class="d-flex justify-content-between">
                <div class="input-group mb-3">
                  <button @click.stop="reps--" class="btn btn-outline-primary mdi mdi-minus fs-3" type="button"></button>
                  <input @click.stop min="0" class="w-25 text-center" v-model="reps" type="number">
                  <button @click.stop="reps++" class="btn btn-outline-primary mdi mdi-plus fs-3" type="button"></button>
                </div>
                <div class="input-group mb-3 justify-content-end">
                  <button @click.stop="weight--" class="btn btn-outline-primary mdi mdi-minus fs-3"
                    type="button"></button>
                  <input @click.stop min="0" class="w-25 text-center" v-model="weight" type="number">
                  <button @click.stop="weight++" class="btn btn-outline-primary mdi mdi-plus fs-3" type="button"></button>
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <span>sets</span>
                <span>time</span>
              </div>
              <div class="d-flex justify-content-between">
                <div class="input-group mb-3">
                  <button @click.stop="sets--" class="btn btn-outline-primary mdi mdi-minus fs-3" type="button"></button>
                  <input @click.stop min="0" class="w-25 text-center" v-model="sets" type="number">
                  <button @click.stop="sets++" class="btn btn-outline-primary mdi mdi-plus fs-3" type="button"></button>
                </div>
                <div class="input-group mb-3 justify-content-end">
                  <button @click.stop="time--" class="btn btn-outline-primary mdi mdi-minus fs-3" type="button"></button>
                  <input @click.stop min="0" class="w-25 text-center" v-model="time" type="number">
                  <button @click.stop="time++" class="btn btn-outline-primary mdi mdi-plus fs-3" type="button"></button>
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <!-- NOTE: Section Checkbox -->
                <button @click.stop type="submit" class="btn btn-success p-1">Save</button>
                <input @click.stop @change="saveCompletedInfo(deckCard.id)" :disabled="deckCard.completed"
                  :checked="deckCard.completed" class="large-ch" type="checkbox">
              </div>
            </form>
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
                <option v-for="deck in decks" :value="deck.id" selected>{{
                  deck.name }}</option>
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
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { AppState } from "../AppState";
import { Card } from '../models/Card.js';
import { Deck } from "../models/Deck";
import { DeckCard } from "../models/DeckCard";
import { deckCardsService } from "../services/DeckCardsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
// import { DeckCard } from '../models/DeckCard.js';

export default {
  props: {
    card: { type: Object, required: true },
    decks: { type: Array, required: true },
    deckCard: { type: DeckCard, },
    reps: { type: Number, },
    weight: { type: Number, },
    sets: { type: Number, },
    time: { type: Number, },




  },
  setup() {
    const editable = ref({})
    const exerciseVariable = ref({})
    const router = useRouter();
    const backPath = router.options.history.state.back


    return {
      backPath,
      exerciseVariable,
      account: computed(() => AppState.account),
      editable,
      accountDeckCards: computed(() => AppState.accountDeckCards),
      async addCardToDeck(deckId, cardId) {
        try {
          if (!deckId) { Pop.error('Please select a deck!') }
          else {
            await deckCardsService.addCardToDeck(deckId, cardId)
            Pop.success('Added Card!')
          }
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      },

      async saveExerciseInfo(reps, weight, sets, time, deckCardId) {
        try {
          const updatedInfo = {
            reps: reps,
            weight: weight,
            sets: sets,
            time: time,
          }
          // debugger
          await deckCardsService.saveExerciseInfo(updatedInfo, deckCardId)
          Pop.success('Updated Card!')
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      },
      async calculateXp() {
        try {
          await deckCardsService.calculateXp()
        } catch (error) {
          Pop.error(error.message)
        }
      },

      async saveCompletedInfo(deckCardId) {
        try {
          logger.log('are you here completed?', deckCardId)
          await deckCardsService.saveCompletedInfo(deckCardId)
          this.calculateXp()
        } catch (error) {
          Pop.error(error.message)
        }
      },




      checkDeckCardsInDecks(deck) {
        const deckCard = AppState.accountDeckCards.find(d => d.deckId == deck.id)
        if (!deckCard) { return false }
        else { return true }
      }


    }

  }
}

</script>


<style lang="scss" scoped>
.large-ch {
  display: inline-block;
  padding: 8px;
  width: 30px;

}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.shadow {
  box-shadow: 1px 4px 2px black;
}

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
  object-fit: contain;
  object-position: center;
  justify-content: space-around;
  margin: 0px 0 40px 0;
  height: 250px
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