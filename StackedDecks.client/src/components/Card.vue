<template>
  <div class="Card card my-3">
    <img :src="card.imgUrl" :alt="card.name">
  </div>
  <div class="card-body text-center">
    <p><b>{{ card.name }}</b></p>
  </div>
</template>


<script>
import { Card } from '../models/Card.js';

export default {
  props: {
    card: { type: Card, required: true }
  },
  setup() {

    return {}
  }
}
</script>


<style lang="scss" scoped></style>