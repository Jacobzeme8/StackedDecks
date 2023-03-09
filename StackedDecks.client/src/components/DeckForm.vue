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
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Dropdown button
                </button>
                <ul class="dropdown-menu dropdown-menu-dark">
                    <li>
                        <div class="form-check ms-1">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                arms
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="form-check ms-1">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                legs
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="form-check ms-1">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                back
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="form-check ms-1">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                chest
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="form-check ms-1">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                cardio
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="form-check ms-1">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                core
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="form-check ms-1">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                shoulders
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
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