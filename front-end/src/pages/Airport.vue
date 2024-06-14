<template>
<div class="container">
    <p>{{ $store.state.user.firstName }} {{ $store.state.user.lastName }} 1</p>
    <p>{{ this.$store.getters.fullName }} 2</p>

    <div class="wrapper">
        <div v-for="airport in airports" :key="airport.abbreviation">
            <airport-card :airport="airport" @click="$store.dispatch('addToFavorites', airport)" />
        </div>
    </div>

    <h2 v-if="$store.state.airports.favorites.length" class="favoriteHeader">Favorites</h2>
    <div class="wrapper">
        <div v-for="airport in $store.state.airports.favorites" :key="airport.abbreviation">
            <airport-card :airport="airport" @click="$store.dispatch('removeFromFavorites', airport)"/>
        </div>
    </div>
</div>
</template>
  
<script>
import { ref } from 'vue';
import allAirports from '@/data/airports';
import AirportCard from '@/components/AirportCard.vue';

export default {
    components: {
        AirportCard
    },
    setup() {
        const airports = ref(allAirports);
        return { airports };
    }
}
</script>
  
<style>
.container {
    max-width: 960px;
    margin: 0 auto;
}

.wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 1rem;
    max-width: 960px;
    margin: 0 auto;
}

p, h3 {
    grid-column: span 3;
}

.favoriteHeader {
    color: white;
    background-color: gray;
    padding: 3px;
}

.wrapper2 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 1rem;
    max-width: 960px;
    margin: 0 auto;
}
</style>
