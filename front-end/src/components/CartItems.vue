<template>
    <div v-for="product in items" class="product-container">
        <img :src="require(`@/assets${product.imageUrl}`)" class="product-image" />

        <div class="details-wrap">
            <h3>{{ product.name }}</h3>
            <h3>AED {{ product.price }}</h3>
        </div>

        <div class="details-wrap">
            <div class="text-right qty-container">
                <div @click="$emit('decrease-qty', product.id)" class="qty-item qtyButtons">-</div>
                <input type="text" class="qty-item qtyDisplay" :value="product.quantity" />
                <div @click="$emit('increase-qty', product.id)" class="qty-item qtyButtons">+</div>
            </div>
        </div>

        <div class="details-wrap">
            <h3 class="text-right">Amount: AED {{ product.price * product.quantity }}</h3>
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
