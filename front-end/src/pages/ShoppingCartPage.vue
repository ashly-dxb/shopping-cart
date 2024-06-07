<template>
    <div class='max-w-3xl bg-white flex flex-col px-5 m-auto my-2 border-2 '>
        <div class="m-auto mb-3 mt-4">
          <h3 class='text-green-700 text-xl font-bold'>Shopping Cart</h3>
        </div>

        <div v-if="cartItems.length > 0">
            <CartItems :items="cartItems" @remove-from-cart="removeFromCart($event)" />
            <button class="checkout-button">Proceed to checkout</button>
        </div>
        <div v-else>
            Your cart is empty!
        </div>
    </div>
</template>

<script>
import baseURL from '@/components/Config';
import CartItems from '../components/CartItems.vue';
import axios from 'axios';

export default {
    name: 'ShoppingCartPage',
    props: ['user'],    
    components: {
        CartItems,
    },
    data() {
        return {
            cartItems: []
        }
    },
    watch: {
        async user(newUserValue) {
            console.log("newUserValue: ", newUserValue);
            if (newUserValue) {
                const response2 = await axios.get(baseURL + `/api/cart/${newUserValue.uid}`);
                this.cartItems = response2.data;
            }
        }
    },
    mounted: function () {
        this.created();
    },
    methods: {
        created: async function () {
            console.log("this.user : ", this.user);

            if(this.user) {
                const response = await axios.get(baseURL + `/api/cart/${this.user.uid}`);
                this.cartItems = response.data;
            }
        },
        removeFromCart: async function (productId) {
            if(this.user) {
                const response = await axios.delete(baseURL + `/api/cart/${this.user.uid}/${productId}`);
                this.cartItems = response.data;
            }
        }
    },
}
</script>
