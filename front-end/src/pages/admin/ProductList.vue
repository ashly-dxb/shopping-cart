<template>
    <div class='max-w-3xl px-5 m-auto my-2 border-0'>
        <div class="m-auto mb-3 mt-4">
          <h3 class='text-xl font-bold'>Product List</h3>
        </div>

        <div v-if="error" class="error">{{error}}</div>

        <div v-for="product in products" :key="product.id" class="flex px-2 py-2 m-2 border-x border-y rounded-xl border-gray-400 ">
            <img :src="require(`@/assets${product.imageUrl}`)" class="flex-col w-1/5 border-x "/>

            <div class="flex-col border-x ">{{ product.name }}</div>
            <div class="flex-col border-x ">AED {{ product.price }}</div>
            <div class="flex-col border-x ">{{ product.description }}</div>
            <div class="flex-col border-x ">
                <router-link :to="'EditProduct/' + product.id" color="link">
                    <span class="pi pi-pencil"></span>
                </router-link>
            </div>
        </div>

        <loading v-model:active="visible" :is-full-page="fullPage" :loader="loader" :can-cancel="false" />
    </div>
</template>
    
<script>
import axios from 'axios';
import baseURL from "../../components/Config";

export default {
    name: 'ProductList',
    data() {
        return {
            products: [],
            showErrors: false,
            serverError: '',
            errors: {},

            fullPage: true,
            visible: false,
            loader: 'dots',

            error: '',
        }
    },
    mounted: function() {
        this.listProducts();
    },
    methods: {
        listProducts() {
            this.showErrors = false;
            this.serverError = '';

            let loader = this.$loading.show({});

            axios.get(baseURL + "/products/list")
                .then((response) => {
                    if(response.data) {
                        this.products = response.data;
                    }
                    else {
                        this.showErrors = true;
                        this.serverError = response.data.message;
                    }
                })
                .catch((error) => {
                    this.error = error.toString();

                    this.showErrors = true;
                    this.serverError = error.toString();
                })
                .finally(() => {
                    loader.hide();
                });
        },
    },
}
</script>
    