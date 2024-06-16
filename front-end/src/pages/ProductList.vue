<template>
    <div class='max-w-3xl bg-white px-5 m-auto my-2 border-0'>
        <div class="m-auto mb-3 mt-4">
          <h3 class='text-green-700 text-xl font-bold'>Product List</h3>
        </div>

        <div v-if="loading" class="loading">Loading...</div>
        <div v-if="error" class="error">{{error}}</div>

        <ProductCard :products="products" :cartItemsList="cartItemsList" :userId="userId" />
    </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import axios from 'axios';
import baseURL from "../components/Config";

export default {
    name: 'ProductList',
    components: {
        ProductCard,
    },
    data() {
        return {
            products: [],
            userId: null,
            loading: false,
            error: '',
            cartItemsList: [],
        }
    },
    async beforeRouteEnter(to, from, next) {
        // console.log("beforeRouteEnter");
        try {
            const response = await axios.get(baseURL + '/products/list');
            next(vm => vm.setPost(response.data))
        } catch (err) {
            next(vm => vm.setError(err))
        }
    },
    mounted: function () {
        this.created();
    },
    methods: {
        created: async function () {
            this.userId = localStorage.getItem("userId");

            this.loading = true;
            const response = await axios.get(baseURL + '/products/list');
            this.products = response.data;

            const response2 = await axios.get(baseURL + `/cart/itemlist/${this.userId}`);
            this.cartItemsList = response2.data;

            console.log("CART::", this.cartItemsList);

            this.loading = false;
        },
        setPost(products) {
            // console.log("setPost", products);
            this.products = products;
        },
        setError(error) {
            this.error = error.toString();
        }
    },
}
</script>
