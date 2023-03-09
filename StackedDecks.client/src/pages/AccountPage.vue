<template>
  <!-- Button trigger modal -->
  <div class="contianer-fluid mt-3">
    <div class="row mt-3 me-2">
      <div class="col-md-12 d-flex justify-content-end mt-3 ms-2">
        <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal">
          Edit Account
        </button>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Account</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <EditAccountForm />
        </div>
      </div>
    </div>
  </div>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <img class="Cover-image img-fluid" :src="account.coverImg" alt="">
    <p>{{ account.email }}</p>
    <h1>{{ account.bio }}</h1>
    <h2>{{ account.level }}</h2>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import EditAccountForm from '../components/EditAccountForm.vue';
export default {
  setup() {



    return {
      account: computed(() => AppState.account),

    };
  },
  components: { EditAccountForm }
}
</script>

<style scoped>
.Cover-image {
  height: auto;
  max-width: 100px;
}
</style>
