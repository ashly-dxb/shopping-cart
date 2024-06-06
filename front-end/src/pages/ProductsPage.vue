<template>
    <div class='max-w-3xl bg-white px-5 m-auto my-2 border-2 '>
        <div class="m-auto mb-8 mt-4">
          <h3 class='text-green-700 text-xl font-bold'>Product List</h3>
        </div>

        <ProductList :products="products" />
    </div>
</template>

<script>
import ProductList from '../components/ProductList.vue'
import axios from 'axios'; 

export default {
    name: 'ProductsPage',
    components: {
        ProductList,
    },
    data() {
        return {
            products: []
        }
    },
    mounted: function () {
        this.created();
    },
    methods: {
        created: async function () {
            const response = await axios.get('/api/products');
            this.products = response.data;
        }
    },
}
</script>
