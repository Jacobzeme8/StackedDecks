<template></template>


<script>
import { onMounted } from "vue";
import { decksServices } from "../services/DecksService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default {
  setup() {

    async function getAllDecks() {
      try {
        await decksServices.getAllDecks()
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }

    onMounted(() =>
      getAllDecks()
    )

    return {}
  }
}
</script>


<style lang="scss" scoped></style>