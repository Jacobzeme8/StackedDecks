<template>
  <div v-if="account">
    <!-- <div class="input-wrapper">
    <span class="placeholder">arm</span>
  </div> -->
    <div class="container rounded bg-pic">
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
          <div class=" card frosted marg-top">
            <div class="card-body d-flex ">
              <p class="bebas text-light mt-5 line-1 anim-typewriter flex-wrap">Arms, Legs, Shoulders, Back, Cardio,
                Full
                Body ...</p>
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
          <Card :decks="decks" :card="c" />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-light text-center p-5">
    <h1 class="display-1">
      <i class="mdi mdi-pinwheel mdi-spin"></i><i class="mdi mdi-pinwheel mdi-spin"></i><i
        class="mdi mdi-pinwheel mdi-spin"></i><i class="mdi mdi-pinwheel mdi-spin"></i>
    </h1>
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
        logger.log('getting my decks', AppState.decks)
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
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


    })

    onUpdated(() => {
      // getMyDecks()

    })




    watchEffect(() => {
      if (AppState.account.id) {
        getMyDecks();

        getAccountDeckCards();
        logger.log('watch effect')
      }
    })



    onUpdated(() => {

    })


    return {
      // decks: computed(() => AppState.decks),
      account: computed(() => AppState.account),
      accountDeckCards: computed(() => AppState.accountDeckCards),
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

.bebas {
  font-family: 'Bebas Neue', cursive;
  text-shadow: 1px 1px 2px black;
}

.bg-pic {
  background-image: url(https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGd5bSUyMHJvcGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60);
  background-attachment: fixed;
  // width: 100%;
  // background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  height: 35vh;

}

.frosted {
  box-shadow: 0 0 5px 0;
  background: inherit;
  backdrop-filter: blur(25px);
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
  max-height: fit-content;
  overflow: hidden;
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
