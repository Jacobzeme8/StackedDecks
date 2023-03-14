<template>
    <div v-if="profile" class="container-fluid bg-coverImg">
        <div class="row">
            <div class="col-3"></div>
            <div class="col-md-6">
                <div class="d-flex justify-content-center pt-5">
                    <div>
                        <img class="rounded-circle" width="300" height="300" :src="profile.picture" alt="">
                    </div>
                </div>
                <div class="card frosted mt-3">
                    <div class="card-body">
                        <div class="">
                            <div class="d-flex justify-content-center">
                                <div>
                                    <h3 class="text-center"><b>{{ profile.name }}</b></h3>
                                </div>
                            </div>
                        </div>
                        <div class="">
                            <h6 class="text-center">{{ profile.bio }}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <h1>THEIR DECKS:</h1>
        <div class="container-fluid bg-pic">
            <div class="row" v-if="userDecks">
                <div v-for="deck in userDecks" class="col-md-3">
                    <Deck :deck="deck" />
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { decksServices } from '../services/DecksService.js';
import { profileService } from '../services/ProfileService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop';

export default {
    props: {
        userDecks: {
            type: Object,
            required: true
        }
    },
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

        async function getUserDecks() {
            try {

                const creatorId = route.params.creatorId
                await decksServices.getUserDecks(creatorId)
            } catch (error) {
                logger.error(error)
                Pop.error(error.message)

            }
        }


        onMounted(() => {
            getUserProfile()
            getUserDecks()
        })
        return {
            profile: computed(() => AppState.profile),
            account: computed(() => AppState.account),
            coverImg: computed(() => `url("${AppState.profile?.coverImg}")`),
            userDecks: computed(() => AppState.userDecks),
            deck: computed(() => AppState.deck),
            decks: computed(() => AppState.decks)


        }
    }
}
</script>


<style lang="scss" scoped>
.frosted {
    box-shadow: 0 0 5px 0;
    background: inherit;
    backdrop-filter: blur(80px);
    /* margin: 100px; */
}

.bg-coverImg {
    background-image: v-bind(coverImg);
    background-size: cover;
    background-position: center;
    height: 70vh;

}
</style>