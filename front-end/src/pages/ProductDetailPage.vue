<template>
    <div class='max-w-3xl bg-white flex flex-col px-5 m-auto my-2 border-2 '>
        <div class="m-auto mb-3 mt-4">
          <h3 class='text-green-700 text-xl font-bold'>Product Details</h3>
        </div>

        <div v-if="product" class="pb-4 mb-4">
            <div class="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow">
                <div class="w-full w-fixed flex-grow-0 px-4"><img :src="getIMGPath(product.imageUrl)" class="img-wrap" /></div>
                <div class="w-full w-fixed flex-grow-0 px-4 mt-7">{{ product.description }}</div>
            </div>
            
            <div class="product-details">
                <div class="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow">
                    <div class="w-full flex-grow-0 px-4"><h3>{{ product.name }}</h3></div>
                    <div class="w-full flex-grow-0 px-4"><h3 class="price">AED {{ product.price }}</h3></div>
                </div>

                <button class="add-to-cart" v-if="user && !itemIsInCart" @click="addToCart">Add to cart</button>
                <button class="grey-button" v-if="user && itemIsInCart">Item is in cart</button>
                <button class="sign-in" v-if="!user" @click="signIn">Sign in to add to cart</button>
            </div>
        </div>

        <div v-else>
            <NotFoundPage />
        </div>
    </div>
</template>

<script>
// import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import NotFoundPage from './NotFoundPage.vue';
import axios from 'axios';
import baseURL from "../components/Config";

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
                const response2 = await axios.get(`/users/${newUserValue.uid}/cart`);
                this.cartItems = response2.data;
            }
        }
    },
    mounted: function () {
        this.created();
    },
    methods: {
        created: async function () {
            console.log("In created...")
            // const auth = getAuth();
            // if (isSignInWithEmailLink(auth, window.location.href)) {
            //     const email = window.localStorage.getItem('emailForSignIn');
            //     await signInWithEmailLink(auth, email, window.location.href);

            //     alert('Successfully Signed In');
            //     window.localStorage.removeItem('emailForSignIn');                
            // }

            const response = await axios.get(baseURL + `/products/details/${this.$route.params.productId}`);
            this.product = response.data;

            if(this.user) {
                const response2 = await axios.get(baseURL + `/users/${this.user.uid}/cart`);
                this.cartItems = response2.data;
            }
        },
        getIMGPath: function(imageUrl) {
            console.log("gettimg image src", imageUrl);
            return imageUrl ? require("@/assets" + imageUrl) : "no-image";
        },
        addToCart: async function () {
            const response = await axios.post(baseURL + `/${this.user.uid}`, {id: this.$route.params.productId} );
            alert('Item added to the cart!');
        },
        signIn: async function () {
            // const auth = getAuth();
            // const email = prompt('Enter your email to sign-in');
            // const actionCodeSettings = {
            //     url: `https://shopping-cart-deployment.onrender.com/products/${this.$route.params.productId}`,
            //     handleCodeInApp: true
            // }

            // await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            
            // window.localStorage.setItem('emailForSignIn', email);

            alert('Login link has been sent to your email. Please follow the link in it.');
        }
    },
}
</script>
