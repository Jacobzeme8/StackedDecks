<template>
  <!-- <div class="input-wrapper">
    <span class="placeholder">arm</span>
  </div> -->
  <div class="container bg-pic">
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <div class=" card frosted marg-top">
          <div class="card-body">
            <p class="text-light mt-5 line-1 anim-typewriter">Arms, Legs, Shoulders, Back, Cardio, Full Body</p>
          </div>
        </div>
      </div>
      <div class="col-md-2"></div>

    </div>
  </div>
  <!-- NOTE Cards -->
  <div class="container-fluid">
    <div class="row">

      <div v-for="c in cards" class="col-md-3">
        <Card :accountDeckCards="accountDeckCards" :decks="decks" :card="c" />
      </div>

    </div>
  </div>
</template>


<script>
import { onMounted, computed, ref, onUpdated, watchEffect, onBeforeUpdate } from 'vue';
import { AppState } from '../AppState.js';
import Card from '../components/Card.vue';
import { cardsService } from '../services/CardsService.js';
import { deckCardsService } from "../services/DeckCardsService";
import { decksServices } from "../services/DecksService";
import { logger } from "../utils/Logger";
import Pop from '../utils/Pop.js';


export default {

  props: {
    cards: {
      type: Object,
      required: true
    },
    decks: {
      type: Object,
      required: true
    }
  },

  setup() {



    async function getAllCards() {
      try {
        await cardsService.getAllCards()
      } catch (error) {
        Pop.error(error)
      }
    }

    async function getMyDecks() {
      try {
        await decksServices.getMyDecks()
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }

    function addFlipEffect() {
      let kards = document.querySelectorAll('.kard');
      [...kards].forEach((kard) => {
        kard.classList.remove('is-flipped')
        kard.removeEventListener('click', function () {
          kard.classList.toggle('is-flipped');
        });
        kard.addEventListener('click', function () {
          kard.classList.toggle('is-flipped');
        });
      });
    }

    async function getAccountDeckCards() {
      try {
        await deckCardsService.getAccountDeckCards()
      } catch (error) {
        logger.log(error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getAllCards();
      addFlipEffect()

    })



    watchEffect(() => {
      if (AppState.account.id) {
        getMyDecks();
        addFlipEffect();
        getAccountDeckCards();
      }
    })



    onUpdated(() => {
      addFlipEffect()
    })


    return {
      // decks: computed(() => AppState.decks),
      account: computed(() => AppState.account),
      accountDeckCards: computed(() => AppState.accountDeckCards)
    }
  },
  components: { Card }
}
</script>

<style scoped lang="scss">
.kard.is-flipped {
  transform: translateX(-100%) rotateY(-180deg);
}

.marg-top {
  margin-top: 70px;
}

.bg-pic {
  background-image: url(https://s3-alpha-sig.figma.com/img/ce11/88bd/a66c08afe888331707245a0eb22ab9cd?Expires=1679270400&Signature=ZtvAIUwLhjtxH7BacWkfdFG06VbcfHxzGf36CVr~80QNLWkUiQisK~pb8IcOQxSH4WnYKutLzXJ8YTunuLiI-NacppsNmuH94K5SzdmPXCTVXAHIKrzczlaPEwo~f2BAqsA5JLmFD0chx-JAYVTjRq9ocGGxBw02cYjn0M~1yWgM1TkxBdLnoOsStSyUsiHhrM13k72TWxfLWf-VP0NjDSGI977qgkueUt-t4XLMx1UCDsmf7MnV1RNMkYOJzrKWM7Lu4B~SCEVtrweCZWmLW3diJz~aygpwGl-zq-M6FrckQDLCfRl5Ah-T-PZoJK5tBldI4Z2jg4Ddt8Tp~WOvJQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4);
  background-attachment: fixed;
  background-position: bottom;
  height: 35vh;

}

.frosted {
  box-shadow: 0 0 5px 0;
  background: inherit;
  backdrop-filter: blur(5px);
  /* margin: 100px; */
}

.centered {
  position: absolute;
  top: 50%;
  // left: 50%;
  transform: translate(-50%, -50%);
}

.line-1 {
  position: relative;
  top: 50%;
  width: 24em;
  margin: 0 auto;
  border-right: 2px solid rgba(255, 255, 255, .75);
  font-size: 180%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  transform: translateY(-50%);
}

/* Animation */
.anim-typewriter {
  animation: typewriter 4s steps(44) 1s 1 normal both,
    blinkTextCursor 500ms steps(44) infinite normal;
}

@keyframes typewriter {
  from {
    width: 0;
  }

  to {
    width: 24em;
  }
}

@keyframes blinkTextCursor {
  from {
    border-right-color: rgba(255, 255, 255, .75);
  }

  to {
    border-right-color: transparent;
  }
}

// NOTE: Testing this cool text for the image.

// @mixin typed($text, $cursor, $speed, $caret-args) {
//   content: '';
//   display: inline-block;
//   width: 0;
//   height: 100%;
//   border-right: $caret-args;
//   animation: typing $speed steps(40, end),
//     blink-caret $cursor step-end infinite;

//   @keyframes typing {
//     from {
//       width: 0
//     }

//     to {
//       width: 100%
//     }
//   }

//   @keyframes blink-caret {

//     from,
//     to {
//       border-color: transparent
//     }

//     50% {
//       border-color: black
//     }
//   }
// }

// .input-wrapper {
//   display: block;
//   font-size: 125%;
//   width: 50%;

//   >input,
//   .placeholder {
//     display: block;
//     appearance: none;
//     width: 100%;
//     height: 100%;
//     background-color: transparent;
//     border: none;
//   }

//   >.placeholder {
//     pointer-events: none;
//     @include typed("arm",
//       2px,
//       1.5s,
//       2px solid black);
//   }

//   >input {

//     &:focus,
//     &:active {
//       +.placeholder {
//         display: none;
//       }
//     }
//   }
// }


// .input-wrapper {
//   display: block;
//   font-family: monospace;
//   font-size: 125%;
//   width: 50%;

//   >input,
//   >.placeholder {
//     display: block;
//     appearance: none;
//     width: 100%;
//     height: 100%;
//     background-color: transparent;
//     border: none;
//   }

//   >.placeholder {
//     pointer-events: none;
//     @include typed("How many roads must a man walk down before you call him a man?",
//       "How many seas must a white dove sail before she sleeps in the sand?",
//       "The answer, my friend, is blowin' in the wind",
//       1.5,
//       (caret-width: 2px,
//         caret-space: 2px));
//   }

//   >input {

//     &:focus,
//     &:active {
//       +.placeholder {
//         display: none;
//       }
//     }
//   }
// }
</style>
