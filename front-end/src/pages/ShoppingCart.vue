<template>
    <div class='max-w-3xl bg-white px-5 m-auto my-2 border-0'>
        <div class="m-auto mb-3 mt-4">
          <h3 class='text-green-700 text-xl font-bold'>Shopping Cart</h3>
        </div>

        <!-- <div v-if="loading" class="loading">Loading...</div>-->
        <div v-if="error" class="error">{{error}}</div>

        <div v-if="cartItems.length > 0">
            <CartItems :items="cartItems" 
                @remove-from-cart="removeFromCart($event)"  
                @decrease-qty="decreaseQty($event)" 
                @increase-qty="increaseQty($event)" />
            <div v-if="itemCount > 0" class="info m-4 mb-3 text-right font-bold text-xl">
                Cart Total: AED {{totalAmount}}
            </div>
            <button class="checkout-button">Checkout</button>
        </div>

        <div v-else-if="loading == false">
            Your cart is empty!
        </div>

        <loading v-model:active="visible" :is-full-page="fullPage" :loader="loader" :can-cancel="false" />

    </div>
</template>

<script>
import baseURL from '@/components/Config';
import CartItems from '../components/CartItems.vue';
import axios from 'axios';

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
    name: 'ShoppingCart',
    props: ['userId'],
    components: {
        CartItems,
        // Loading: VueLoading.Component
    },

    data() {
        return {
            cartItems: [],
            loading: false,
            error: '',
            itemCount: 5,
            totalAmount: 100,

            fullPage: true,
            visible: false,
            loader: 'dots',
        }
    },  
    
    mounted: function () {
        this.created();
    },

    methods: {        
        calculateCartTotal: function () {
            // console.log("CART cartItems:", this.cartItems);

            var amount = 0;
            this.cartItems.forEach(item => {
                amount += item.quantity * item.price;                
            });

            this.totalAmount = amount;
        },

        created: async function () {
            if(this.userId) {
                // this.loading = true;
                let loader = this.$loading.show({});

                const response = await axios.get(baseURL + `/cart/${this.userId}`);
                this.cartItems = response.data;
                this.calculateCartTotal();

                loader.hide();
                // this.loading = false;
            }
        },

        removeFromCart: async function (productId) {
            if(this.userId) {
                // this.loading = true;

                let loader = this.$loading.show({});

                const response = await axios.delete(baseURL + `/cart/${this.userId}/${productId}`);
                this.cartItems = response.data;

                this.calculateCartTotal();

                loader.hide();

                // this.loading = false;
                this.triggerToast();
            }
        },

        decreaseQty: async function (productId) {
            if(this.userId) {
                // this.loading = true;

                let loader = this.$loading.show({});

                const response = await axios.delete(baseURL + `/cart/${this.userId}/${productId}`);
                this.cartItems = response.data;

                this.calculateCartTotal();

                loader.hide();

                // this.loading = false;
            }
        },

        increaseQty: async function (productId) {
            if(this.userId) {
                // this.loading = true;

                let loader = this.$loading.show({});

                const response = await axios.post(baseURL + `/cart/${this.userId}`, {product_id: productId} );
                this.cartItems = response.data;

                this.calculateCartTotal();

                loader.hide();

                // this.loading = false;                
            }
        },

        triggerToast() {
          toast.success('Item removed from the cart!', {
                rtl: false,
                position: "bottom-right",
                timeout: 4000,
                closeOnClick: false,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: true,
                // hideProgressBar: true,
                closeButton: "button",
           });
        },
    },
}
</script>
