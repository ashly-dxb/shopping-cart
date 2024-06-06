<template>
    <div class='max-w-3xl bg-gray-400 px-5 m-auto my-2 border-2 '>
        <div class="m-auto mb-8 mt-4">
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
                const response2 = await axios.get(`/api/users/${newUserValue.uid}/cart`);
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
                const response = await axios.get(`/api/users/${this.user.uid}/cart`);
                this.cartItems = response.data;
            }
        },
        removeFromCart: async function (productId) {
            if(this.user) {
                const response = await axios.delete(`/api/users/${this.user.uid}/cart/${productId}`);
                this.cartItems = response.data;
            }
        }
    },
}
</script>
