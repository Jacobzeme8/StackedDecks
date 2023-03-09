<template>
    <form @submit.prevent="createDeck()">
        <div class="modal-body text-dark">
            <div class="mb-3">
                <label for="name" class="form-label">Deck Name</label>
                <input v-model="editable.name" required type="text" class="form-control" id="name"
                    aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="coverImg" class="form-label">Deck Image</label>
                <input v-model="editable.coverImg" required type="url" class="form-control" id="coverImg"
                    aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <input v-model="editable.description" required type="text" textarea name="description" class="form-control"
                    id="description" aria-describedby="emailHelp">
            </div>
            <label for="type" class="form-label">Deck Type:</label>
            <select v-model="editable.type" class="form-select mb-3" aria-label="Default select example" id="type">
                <option selected value="arms">Arms</option>
                <option value="back">Back</option>
                <option value="cardio">Cardio</option>
                <option value="chest">Chest</option>
                <option value="core">Core</option>
                <option value="legs">Legs</option>
                <option value="shoulders">Shoulders</option>
            </select>
        </div>
        <div class="modal-footer">
            <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Create Album</button>
        </div>
    </form>
</template>


<script>
import { ref } from 'vue';
export default {
    setup() {
        const editable = ref({
            type: 'arms'
        })
        return {
            editable,
        }
    }
}
</script>


<style lang="scss" scoped></style>