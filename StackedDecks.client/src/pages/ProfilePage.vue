<template>
    <div v-if="profile">
        <h1>{{ profile.name }}</h1>
        <img :src="profile.picture" alt="">
    </div>
</template>


<script>
import { computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { profileService } from '../services/ProfileService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop';

export default {
    setup() {
        const route = useRoute();

        async function getUserProfile() {
            try {
                const creatorId = route.params.creatorId
                await profileService.getUserProfile(creatorId)
            } catch (error) {
                logger.error(error)
                Pop.error(error.message)
            }
        }

        onMounted(() => {
            getUserProfile()
        })
        return {
            profile: computed(() => AppState.profile),
            account: computed(() => AppState.account)
        }
    }
}
</script>


<style lang="scss" scoped></style>