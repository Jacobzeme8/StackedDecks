<template>
  <!-- NOTE Filter catagory  -->
  <div class="container">
    <div class="row my-4">
      <div class="col-12 p-4 mb-3">
        <h1 class="text-dark">Events</h1>
      </div>
      <div class="col-10 m-auto">
        <div class="bg-primary rounded p-3 d-flex justify-content-around">
          <button @click="changeFilterType('')" class="btn btn-outline-light text-dark">All</button>
          <button @click="changeFilterType('arms')" class="btn btn-outline-light text-dark">Arms</button>
          <button @click="changeFilterType('back')" class="btn btn-outline-light text-dark">Back</button>
          <button @click="changeFilterType('cardio')" class="btn btn-outline-light text-dark">Cardio</button>
          <button @click="changeFilterType('chest')" class="btn btn-outline-light text-dark">Chest</button>
          <button @click="changeFilterType('core')" class="btn btn-outline-light text-dark">Core</button>
          <button @click="changeFilterType('legs')" class="btn btn-outline-light text-dark">Legs</button>
          <button @click="changeFilterType('shoulders')" class="btn btn-outline-light text-dark">Shoulders</button>
        </div>
      </div>
    </div>
  </div>
  <!-- NOTE Cards -->
  <h1>CARDS:</h1>
  <div class="container-fluid">
    <div class="row">
      <div v-for="c in cards" class="col-md-4">
        <Card :card="c" />
      </div>
    </div>
  </div>
</template>


<script>
import { onMounted, computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import Card from '../components/Card.vue';
import { cardsService } from '../services/CardsService.js';
import Pop from '../utils/Pop.js';


export default {
  setup() {
    const filterType = ref('')


    async function getAllCards() {
      try {
        await cardsService.getAllCards()
      } catch (error) {
        Pop.error(error)
      }
    }

    onMounted(() => {
      getAllCards()
    })

    return {
      cards: computed(() => {
        if (!filterType.value) {
          return AppState.cards
        }
        else {
          return AppState.cards.filter(c => c.muscleGroup == filterType.value)
        }
      }),
      changeFilterType(c) {
        filterType.value = c
      }
    }
  },
  components: { Card }
}
</script>

<style scoped lang="scss"></style>
