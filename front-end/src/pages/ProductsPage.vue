<template>
    <div class='max-w-3xl bg-white px-5 m-auto my-2 border-2 '>
        <div class="m-auto mb-8 mt-4">
          <h3 class='text-green-700 text-xl font-bold'>Product List</h3>
        </div>

        <div v-if="loading" class="loading">Loading...</div>
        <div v-if="error" class="error">{{error}}</div>

        <ProductList :products="products" />
    </div>
</template>

<script>
import ProductList from '../components/ProductList.vue'
import axios from 'axios';
import baseURL from "../components/Config";

// watch(() => route.params.id, fetchData, { immediate: true })

export default {
    name: 'ProductsPage',
    components: {
        ProductList,
    },
    data() {
        return {
            products: [],
            loading: false,
            error: '',
        }
    },
    async beforeRouteEnter(to, from, next) {
        console.log("beforeRouteEnter");
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
            this.loading = true;

            const response = await axios.get(baseURL + '/products/list');
            this.products = response.data;

            this.loading = false;            
        },
        setPost(products) {
            console.log("setPost", products);
            this.products = products;
        },
        setError(err) {
            this.error = err.toString()
        }
    },
}
</script>
