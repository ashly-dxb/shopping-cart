<template>
    <div v-for="product in items" class="product-container">
        <div class="details-wrap">
            <div class="left-container">
                <img :src="require(`@/assets${product.imageUrl}`)" class="product-image" />
            </div>
            <div class="right-container">
                <h3>{{ product.name }}</h3>
                <h3>AED {{ product.price }}</h3>
            </div>
        </div>

        <div class="details-wrap">
            <div class="qty-container">
                <div @click="$emit('decrease-qty', product.id)" class="qty-item qtyButtons">-</div>
                <input type="text" :value="product.quantity" class="qty-item qtyInput" readonly />
                <div @click="$emit('increase-qty', product.id)" class="qty-item qtyButtons">+</div>
            </div>
        </div>

        <div class="details-wrap">
            <h3 class="text-right">AED {{ product.price * product.quantity }}</h3>
        </div>

        <div class="remove-button" @click="$emit('remove-from-cart', product.id)">
            <i class="pi pi-trash" style="font-size: 1.1rem"></i>
        </div>    
    </div>
</template>

<script>
export default {
    name: 'CartItems',
    props: ['items'],
}
</script>
