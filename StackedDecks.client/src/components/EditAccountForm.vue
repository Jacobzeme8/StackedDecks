<template>
  <form @submit.prevent="editAccount()">
    <div class="mb-3">
      <label for="name" class="form-label">name</label>
      <input required v-model="editable.name" minlength="3" type="text" class="form-control" id="name" name="name">
    </div>
    <div class="mb-3">
      <label for="bio" class="form-label">bio</label>
      <input v-model="editable.bio" maxlength="300" type="text" class="form-control" id="bio">
    </div>
    <div class="mb-3">
      <label for="picture" class="form-label">picture</label>
      <input required v-model="editable.picture" maxlength="1000" type="url" class="form-control" id="picture">
    </div>
    <div class="mb-3">
      <label for="coverImg" class="form-label">coverImg</label>
      <input required v-model="editable.coverImg" maxlength="1000" type="url" class="form-control" id="coverImg">
    </div>
    <div class="mb-3">
      <label for="github" class="form-label">github</label>
      <input v-model="editable.github" type="url" maxlength="200" class="form-control" id="github">
    </div>
    <div class="mb-3">
      <label for="linkedin" class="form-label">linkedin</label>
      <input v-model="editable.linkedin" type="url" maxlength="200" class="form-control" id="linkedin">
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
    </div>
  </form>
</template>


<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { accountService } from '../services/AccountService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({})

    watchEffect(() => {
      if (AppState.account.id) {
        editable.value = { ...AppState.account }
      }
    })
    return {
      editable,
      async editAccount() {
        try {
          const formData = editable.value
          await accountService.editAccount(formData)
          logger.log(formData)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>