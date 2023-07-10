<template>
    <h1>Shopping Cart</h1>

    <div v-if="cartItems.length > 0">
        <CartItems :items="cartItems" @remove-from-cart="removeFromCart($event)" />
        <button class="checkout-button">Proceed to checkout</button>
    </div>
    <div v-else>
        Your cart is empty!
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
            const response = await axios.get(`/api/users/${this.user.uid}/cart`);
            this.cartItems = response.data;
        },

        removeFromCart: async function (productId) {
            if (this.user) {
                const response = await axios.delete(`/api/users/${this.user.uid}/cart/${productId}`);
                this.cartItems = response.data;
            }
        }
    },
}

</script>