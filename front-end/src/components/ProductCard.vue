<template>
    <div class="flex flex-row flex-wrap gap-x-2 gap-y-2 py-2 border-0">
        <div :data-label="itemAddedToCart(product.id) ? 'In cart' : ''" v-for="product in products" :key="product.id" class="individual-card sm:w-3/4 md:w-48 lg:w-56 sm:flex-wrap md:flex-wrap px-4 py-2 border-x border-y rounded-xl hover:border-x-2 hover:opacity-70 border-gray-400 hover:border-blue-800" >
            <img :src="require(`@/assets${product.imageUrl}`)" />

            <h3 class="product-name">{{ product.name }}</h3>
            <h3 class="product-price">AED {{ product.price }}</h3>

            <span class="text-end">
                <router-link :to="'/products/' + product.id" color="link">
                    Details >>>
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
    props: ['products', 'userId', 'cartItemsList'],
    data() {
        return {
            // cartItems: [],
        }
    },

    methods: {
        itemAddedToCart (productID) {
            // console.log(productID);
            return (this.cartItemsList.indexOf(productID) > -1) ? true : false;
        },

        async addToCart(productID) {
            const response = await axios.post(baseURL + `/cart/${this.userId}`, {product_id: productID} );
            // console.log('Item added to the cart!', response);

            this.triggerToast();
        },

        triggerToast() {
          toast.success('Item added to cart', {
                rtl: false,
                position: "bottom-right",
                timeout: 4000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                // hideProgressBar: true,
                closeButton: "button",
           });
        },
    }
}
</script>

<style scoped>
.individual-card {
    /* color: green; */
}

.individual-card::after {
  position: relative;
  
  top: -260px;
  right: 18px;
  
  background: #2739aa;
  border-radius: 1px;
  /* box-shadow: 5px 7px 7px rgb(58, 58, 156); */

  color: white;
  text-align: center;
  content: attr(data-label);

  /* padding: 2px 1px; */
}
</style>
