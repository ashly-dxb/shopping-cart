<template>
    <div v-if="product">
        <div class="img-wrap">
            <img :src="product.imageUrl">
        </div>

        <div class="product-details">
            <h1>{{ product.name }}</h1>
            <h3 class="price">{{ product.price }}</h3>

            <button class="add-to-cart" v-if="user && !itemIsInCart" @click="addToCart">Add to cart</button>
            <button class="grey-button" v-if="user && itemIsInCart">Item is in cart</button>
            <button class="sign-in" v-if="!user" @click="signIn">Sign in to add to cart</button>
        </div>
    </div>

    <div v-else>
        <NotFoundPage />
    </div>
</template>


<script>
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import NotFoundPage from './NotFoundPage.vue';
import axios from 'axios';

export default {
    name: 'ProductDetailPage',
    props: ['user'],

    components: {
        NotFoundPage,
    },

    data() {
        return {
            product: {},
            cartItems: [],
        }
    },

    computed: {
        itemIsInCart() {
            return this.cartItems.some(item => item.id === this.$route.params.productId);
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
            const auth = getAuth();
            if (isSignInWithEmailLink(auth, window.location.href)) {
                const email = window.localStorage.getItem('emailForSignIn');
                await signInWithEmailLink(auth, email, window.location.href);
                alert('Successfully signed in!');
                window.localStorage.removeItem('emailForSignIn');                
            }

            const response = await axios.get(`/api/products/${this.$route.params.productId}`);
            this.product = response.data;

            if(this.user) {
                const response2 = await axios.get(`/api/users/${this.user.uid}/cart`);
                this.cartItems = response2.data;
            }
        },

        addToCart: async function () {
            const response = await axios.post(`/api/users/${this.user.uid}/cart`, {id: this.$route.params.productId} );
            alert('Successfully added item to cart!');
        },

        signIn: async function () {
            const email = prompt('Enter your email to sign-in');
            const auth = getAuth();
            const actionCodeSettings = {
                url: `https://shopping-cart-deployment.onrender.com/products/${this.$route.params.productId}`,
                handleCodeInApp: true
            }

            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            
            window.localStorage.setItem('emailForSignIn', email);

            alert('A login link was sent to the email you provided');
        }
    },
}

</script>
