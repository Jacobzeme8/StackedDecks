<template>
    <div v-if="profile" class="container-fluid bg-coverImg">
        <div class="row">
            <div class="col-3"></div>
            <div class="col-md-6">
                <div class="d-flex justify-content-center pt-5">
                    <div class="">
                        <img class="rounded-circle img-shadow" width="300" height="300" :src="profile.picture" alt="">
                    </div>
                </div>
                <div class="card frosted mt-3">
                    <div class="card-body">
                        <div class="">
                            <div class="d-flex justify-content-center">
                                <div>
                                    <h3 class="text-center text-light shadow"><b>{{ profile.name }}</b></h3>
                                    <div class="text-center fs-4">
                                        <span v-if="profile.github">
                                            <a :href="profile.github" target="_blank">
                                                <i class="mdi mdi-github"></i>
                                            </a>
                                        </span>
                                        <span v-if="profile.linkedin">
                                            <a :href="profile.linkedin" target="_blank">
                                                <i class="mdi mdi-linkedin"></i>
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="">
                            <h6 class="text-center text-light shadow">{{ profile.bio }}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="pb-4">
        <div v-if="profile" class="text-light fs-4 shadow-1"><b>{{ profile.name }}'s DECKS:</b>
        </div>
        <div class="container-fluid bg-pic">
            <div class="row" v-if="decks">
                <div v-for="deck in decks" class="col-md-3 d-flex justify-content-center">
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
        decks: {
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
        onUnmounted(() => {
            AppState.profile = []
        })
        return {
            profile: computed(() => AppState.profile),
            account: computed(() => AppState.account),
            coverImg: computed(() => `url("${AppState.profile?.coverImg}")`),
            // userDecks: computed(() => AppState.userDecks),
            deck: computed(() => AppState.deck),
            // decks: computed(() => AppState.decks)


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

.shadow {
    text-shadow: 2px 2px 4px rgb(134, 51, 100)
}

.shadow-1 {
    text-shadow: 2px 2px 4px black;

}

.img-shadow {
    box-shadow: 2px 4px 4px black
}
</style>