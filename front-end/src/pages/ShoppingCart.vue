<template>
    <div class='max-w-3xl bg-white px-5 m-auto my-2 border-0'>
        <div class="m-auto mb-3 mt-4">
          <h3 class='text-green-700 text-xl font-bold'>Shopping Cart</h3>
        </div>

        <div v-if="error" class="error">{{error}}</div>

        <div v-if="cartItems.length > 0">
            <div class="flex w-full p-2 mb-3 font-bold bg-gray-400 text-white">
                <div class="details-wrap">Item</div>
                <div class="details-wrap">Qty</div>
                <div class="details-wrap">Sub Total</div>
            </div>

            <CartItems :items="cartItems" 
                @remove-from-cart="removeFromCart($event)"  
                @decrease-qty="decreaseQty($event)" 
                @increase-qty="increaseQty($event)" />
            
            <div v-if="cartItems.length > 0" class="flex w-full p-2 mb-3 bg-cyan-300 text-black">
                <div class="details-wrap font-bold text-center">Total</div>
                <div class="details-wrap">&nbsp;</div>
                <div class="details-wrap font-bold">AED {{cartTotalAmount}}</div>
            </div>

            <div class="flex w-full p-2 mb-3 font-bold">
                <div class="xxxx">
                    <router-link to="/products">
                        <i class="pi pi-shopping-bag" style="font-size: 1.1rem"></i> <span class="text-l w-full">Continue Shopping</span>
                    </router-link>
                </div>                
            </div>

            <div class="flex w-full p-2 border-0">
                <button class="checkout-button flex-column  mx-3" @click="redirectToCheckout">Checkout 1</button>
                <button class="checkout-button flex-column  mx-3 text-blue-300" @click="redirectToCheckout2">Checkout 2</button>
            </div>
        </div>

        <div v-else-if="loading == false" class="flex w-full p-2 border-0">
            <div class="left-pane">Your cart is empty!</div>

            <div class="right-pane">
                <router-link to="/products">
                    <i class="pi pi-shopping-bag" style="font-size: 1.1rem"></i><span class="text-l w-full shrink-0 ps-2">Continue Shopping</span>
                </router-link>
            </div>
        </div>

        <loading v-model:active="visible" :is-full-page="fullPage" :loader="loader" :can-cancel="false" />

    </div>
</template>

<script>
import baseURL from '@/components/Config';
import axios from 'axios';
import CartItems from '../components/CartItems.vue';

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
    name: 'ShoppingCart',
    props: ['userId'],
    components: {
        CartItems,
    },

    data() {
        return {
            cartItems: [],
            loading: false,
            error: '',
            cartTotalAmount: 0,

            fullPage: true,
            visible: false,
            loader: 'bars',
        }
    },  
    
    mounted: function() {
        this.created();
    },

    methods: {        
        calculateCartTotal: function () {
            var amount = 0;
            this.cartItems.forEach(item => {
                amount += item.quantity * item.price;                
            });

            this.cartTotalAmount = amount;
        },

        redirectToCheckout() {
            this.$router.push({path: '/checkout'});
        },
     
        redirectToCheckout2() {
            this.$store.dispatch("storeCurrOrderItems", this.cartItems); // store action

            this.$router.push({path: '/stripe-checkout', query: { amount: this.cartTotalAmount }});
            // this.$router.push({name: 'StripeCheckoutPage', params: { amount: this.cartTotalAmount }});
        },

        created: async function () {
            if(this.userId) {
                let loader = this.$loading.show({
                    loader: 'dots',
                    width: 64,
                    height: 64,
                    opacity: 0.5,
                });

                axios.get(baseURL + `/cart/${this.userId}`)
                .then((response) => {
                    this.cartItems = response.data;

                    // console.log("CART_ITEMS::::", response.data)
                    this.calculateCartTotal();

                    loader.hide();
                })
                .catch((errors) => {
                    loader.hide();
                });
            }
        },

        removeFromCart: async function (productId) {
            if(this.userId) {
                let loader = this.$loading.show({});

                axios.delete(baseURL + `/cart/${this.userId}/${productId}`)
                .then((response) => {
                    this.cartItems = response.data;
                    this.calculateCartTotal();

                    loader.hide();
                    this.triggerToast();
                })
                .catch((errors) => {
                    loader.hide();
                });
                
            }
        },

        decreaseQty: async function (productId) {
            if(this.userId) {
                let loader = this.$loading.show({});

                const change_type = 'DECREASE_QTY';

                axios.post(baseURL + `/cart/${this.userId}/changeqty`, {product_id: productId, change_type} )
                .then((response) => {
                    this.cartItems = response.data;
                    this.calculateCartTotal();
                    loader.hide();
                })
                .catch((errors) => {
                    loader.hide();
                });
            }
        },

        increaseQty: async function (productId) {
            if(this.userId) {
                let loader = this.$loading.show({});

                const change_type = 'INCREASE_QTY';

                axios.post(baseURL + `/cart/${this.userId}/changeqty`, {product_id: productId, change_type} )
                .then((response) => {
                    this.cartItems = response.data;
                    this.calculateCartTotal();
                    loader.hide();
                })
                .catch((errors) => {
                    loader.hide();
                });                
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
