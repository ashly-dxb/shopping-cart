<template>
    <div class="flex flex-wrap py-4 border-2 border-green-400">
        <div
            class="w-1/3 sm:w-3/3 flex-none px-4 mt-3 py-2 border-2 border-blue-400"
            v-for="product in products"
            :key="product.id"
        >
            <img :src="require(`@/assets${product.imageUrl}`)" class="xxxx" />

            <h3 class="product-name">{{ product.name }}</h3>
            <h3 class="product-price">AED {{ product.price }}</h3>

            <router-link :to="'/products/' + product.id">
                <button>View Details</button>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductCard',
    props: ['products'],
}
</script>
