<template>
    <div class='max-w-3xl bg-white flex flex-col px-5 m-auto my-2 border-2 '>
        <div class="m-auto mb-3 mt-4">
          <h3 class='text-green-700 text-xl font-bold'>Shopping Cart</h3>
        </div>

        <div v-if="loading" class="loading">Loading...</div>
        <div v-if="error" class="error">{{error}}</div>

        <div v-if="cartItems.length > 0">
            <CartItems :items="cartItems" @remove-from-cart="removeFromCart($event)" />
            <button class="checkout-button">Proceed to checkout</button>
        </div>
        <div v-else-if="loading == false">
            Your cart is empty!
        </div>
    </div>
</template>

<script>
import baseURL from '@/components/Config';
import CartItems from '../components/CartItems.vue';
import axios from 'axios';

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
        }
    },
    watch: {
        async userId(newUserValue) {
            console.log("newUserValue: ", newUserValue);

            if (newUserValue) {
                const response2 = await axios.get(baseURL + `/cart/${newUserValue}`);
                this.cartItems = response2.data;
            }
        }
    },
    mounted: function () {
        this.created();
    },
    methods: {
        created: async function () {
            console.log("this.userId : ", this.userId);

            if(this.userId) {
                this.loading = true;
                const response = await axios.get(baseURL + `/cart/${this.userId}`);
                this.cartItems = response.data;
                this.loading = false;
            }
        },
        removeFromCart: async function (productId) {
            if(this.userId) {
                this.loading = true;
                const response = await axios.delete(baseURL + `/cart/${this.userId}/${productId}`);
                this.cartItems = response.data;
                this.loading = false;
            }
        }
    },
}
</script>
