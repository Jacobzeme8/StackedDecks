<template>
  <!-- NOTE Face of Card -->
  <div class=" my-3">
    <div class="kard">
      <div class="kard_face kard-front card">
        <img class="img-fluid" :src="card.imgUrl" :alt="card.name">
        <div class="card-body pb-1 text-center">
          <p class="text-capitalize"><b>{{ card.name }}</b></p>
          <p class="mb-0">CLICK IMAGE TO SEE DETAILS</p>
        </div>
        <div class="d-flex justify-content-end">
          <div class="input-group mb-3">
            <button @click.stop="removeEventListener()" type="button" class="btn btn-outline-secondary">Action</button>
            <button @click.stop="removeEventListener()" type="button"
              class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"
              aria-expanded="false">
              <span class="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- NOTE Back of card -->
      <div class="card kard_face  scrollbox kard-back p-2">
        <!-- <img class="img-fluid" :src="card.imgUrl" :alt="card.name"> -->
        <div class="Deck_Card_Info ">
          <h2 class="text-capitalize fw-bold">{{ card.name }}</h2>
          <div v-if="card.difficulty == 'beginner'" class="progress" role="progressbar" aria-label="Basic example"
            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar bg-success" style="width: 25%"></div>
          </div>
          <div v-if="card.difficulty == 'intermediate'" class="progress" role="progressbar" aria-label="Basic example"
            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar bg-warning" style="width: 50%"></div>
          </div>
          <div v-if="card.difficulty == 'expert'" class="progress" role="progressbar" aria-label="Basic example"
            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar bg-danger" style="width: 100%"></div>
          </div>
          <p class="text-capitalize"><b>Level:</b> {{ card.difficulty }}</p>
          <h4 class="text-capitalize fw-bold">{{ card.muscleGroup }}</h4>
          <p class="fs-6"><b>Instructions:</b> {{ card.instruction }}</p>
          <p class="text-center">{Back Side}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { Card } from '../models/Card.js';
import { logger } from "../utils/Logger";
// import { DeckCard } from '../models/DeckCard.js';

export default {
  props: {
    card: { type: Card, required: true },
    // deckCard: { type: DeckCard, required: true }

  },
  setup(props) {

    // var kards = document.querySelectorAll('.kard');
    // [...kards].forEach((kard) => {
    //   kard.addEventListener('click', function () {
    //     kard.classList.toggle('is-flipped');
    //   });
    // });



    // let kard = document.querySelectorAll('.kard')
    // [kard].forEach((kard) => {flipCard(){
    //   kard.classList.toggle('is-flipped');
    // }
    // })

    return {
      removeEventListener() {
        logger.log("button")
      }
    }

  }
}

</script>


<style lang="scss" scoped>
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
</style>