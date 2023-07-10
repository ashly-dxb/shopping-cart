<template>
    <h3>Products</h3>
    <ProductsList :products="products" />
</template>


<script>
import ProductsList from '../components/ProductList.vue'
import axios from 'axios'; 

export default {
    name: 'ProductsPage',

    components: {
        ProductsList,
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
