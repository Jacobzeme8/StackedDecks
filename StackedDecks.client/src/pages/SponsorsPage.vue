<template>
    <h1>Sponsors here!</h1>
</template>


<script>
import { useRoute, useRouter } from 'vue-router';
export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        return {
            route,
        }
    }
}
</script>


<style lang="scss" scoped></style>