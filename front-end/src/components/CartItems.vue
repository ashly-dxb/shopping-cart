<template>
    <div class="product-container" v-for="product in items" :key="product.id">
        <img class="product-image" :src="product.imageUrl">

        <div class="details-wrap">
            <h3>{{ product.name }}</h3>
            <h3>{{ product.price }}</h3>
        </div>

        <button class="remove-button" @click="$emit('remove-from-cart', product.id)">Remove</button>    
    </div>
</template>


<script>

export default {
    name: 'CartItems',
    props: ['items'],
}

</script>