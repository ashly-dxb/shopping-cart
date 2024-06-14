<template>
    <div class="flex flex-row flex-wrap gap-x-2 gap-y-2 py-2 border-0">
        <div class="sm:w-3/4 md:w-48 lg:w-56 sm:flex-wrap md:flex-wrap px-4 py-2 border-x border-y border-gray-400 rounded-xl hover:bg-gray-200 hover:border-blue-400" v-for="product in products" :key="product.id" >
            <img :src="require(`@/assets${product.imageUrl}`)" class="xxxx" />

            <h3 class="product-name">{{ product.name }}</h3>
            <h3 class="product-price">AED {{ product.price }}</h3>

            <span class="text-end">
                <router-link :to="'/products/' + product.id" color="link">
                    View Details >>
                </router-link>
            </span>

            <button class="add-to-cart" v-if="userId" @click="addToCart(product.id)">Add to cart</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import baseURL from "../components/Config";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
    name: 'ProductCard',
    props: ['products', 'userId'],
    data() {
        return {
            cartItems: [],
        }
    },
    computed: {
        async created() {
            if(this.userId) {
                const response2 = await axios.get(baseURL + `/cart/${this.userId}`);
                this.cartItems = response2.data;
            }
        },
        itemIsInCart() {
            console.log("xxx :::", this.$route.params.productId);
            // return this.cartItems.some(item => item.id === parseInt(this.$route.params.productId));
            return false;
        }
    },
    methods: {
        async addToCart(productID) {
            const response = await axios.post(baseURL + `/cart/${this.userId}`, {product_id: productID} );
            console.log('Item added to the cart!', response);

            this.triggerToast();
        },
        triggerToast() {
          toast.success('Item added to cart', {
                rtl: false,
                position: "bottom-right",
                timeout: 7000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
           });
        },
    }
}
</script>
