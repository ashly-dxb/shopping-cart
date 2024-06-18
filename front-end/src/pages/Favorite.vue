<template>
<div class="container">
    <div class="wrapper">
        <div v-for="eachItem in allItems" :key="eachItem.abbreviation">
            <favorite-card :item="eachItem" @click="$store.dispatch('addToFavorites', eachItem)" />
        </div>
    </div>

    <h2 v-if="$store.state.allItems.favorites.length" class="favoriteHeader">Favorites</h2>
    <div class="wrapper">
        <div v-for="eachItem in $store.state.allItems.favorites" :key="eachItem.abbreviation">
            <favorite-card :item="eachItem" @click="$store.dispatch('removeFromFavorites', eachItem)"/>
        </div>
    </div>
</div>
</template>
  
<script>
import { ref } from 'vue';
import itemList from '@/data/items';
import FavoriteCard from '@/components/FavoriteCard.vue';

export default {
    components: {
        FavoriteCard
    },
    setup() {
        const allItems = ref(itemList);
        return { allItems };
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
@/data/items