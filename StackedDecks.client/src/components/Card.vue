<template>
  <!-- NOTE Face of Card -->
  <div class="Card  my-3">
    <div class="kard">
      <div class="kard_face kard-front">
        <img class="img-fluid" :src="card.imgUrl" :alt="card.name">
        <div class="card-body text-center">
          <p><b>{{ card.name }}</b></p>
          <p>CLICK IMAGE TO SEE DETAILS</p>
        </div>
      </div>

      <!-- NOTE Back of card -->
      <div class="kard_face kard-back">
        <!-- <img class="img-fluid" :src="card.imgUrl" :alt="card.name"> -->
        <div class="Deck_Card_Info">
          <h2 class="fw-bold">{{ card.name }}</h2>
          <h4 class="fw-bold">{{ card.muscleGroup }}</h4>
          <p class="fs-6">{{ card.instruction }}</p>
          <p class="">{{ card.difficulty }}</p>
          <p>Back Side</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { Card } from '../models/Card.js';
// import { DeckCard } from '../models/DeckCard.js';

export default {
  props: {
    card: { type: Card, required: true },
    // deckCard: { type: DeckCard, required: true }
  },
  setup() {

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
  transition: transform 1s;

}

.kard.is-flipped {
  transform: translateX(-100%) rotateY(-180deg);
}



.kard-back {
  position: fixed;
  top: 0%;
  transform: rotateY(180deg)
}
</style>