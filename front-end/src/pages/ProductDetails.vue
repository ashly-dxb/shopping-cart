<template>
    <div class='max-w-3xl bg-white flex flex-col px-5 m-auto my-2 border-0'>
        <div class="m-auto mb-3 mt-4">
          <h3 class='text-green-700 text-xl font-bold'>Product Details</h3>
        </div>

        <div v-if="loading" class="loading">Loading...</div>
        <div v-if="error" class="error">{{error}}</div>

        <div v-if="product" class="">
            <div class="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap pb-4 flex-grow">
                <div class="w-fixed w-full flex-grow-0 px-4"><img :src="getIMGPath(product.imageUrl)" class="img-wrap" /></div>
                <div class="w-fixed w-full flex-grow-0 px-4 mt-7">{{ product.description }}</div>
            </div>
            
            <div class="product-details">
                <div class="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow">
                    <div class="w-full flex-grow-0 px-4"><h3>{{ product.name }}</h3></div>
                    <div class="w-full flex-grow-0 px-4"><h3 class="price">AED {{ product.price }}</h3></div>
                </div>

                <button class="add-to-cart" v-if="userId && !itemIsInCart" @click="addToCart">Add to cart</button>
                <button class="grey-button" v-if="userId && itemIsInCart">Item is in cart</button>
                <button class="sign-in" v-if="!userId" @click="signIn">Sign in to add to cart</button>

                <button @click="goBack">
                    <i :class="['pi', 'pi-back']" style="font-size: 1.1rem"></i><span class="ps-2">Back</span>
                </button>
            </div>
        </div>

        <div v-else>
            <NotFoundPage />
        </div>
    </div>
</template>

<script>
import NotFoundPage from './NotFoundPage.vue';
import axios from 'axios';
import baseURL from "../components/Config";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// import MdiArrowLeftIcon from 'vue-material-design-icons/MDIArrowLeft.vue';

export default {
    name: 'ProductDetails',
    props: ['userId'],
    components: {
        NotFoundPage,
        // MdiArrowLeftIcon
    },
    data() {
        return {
            product: {},
            cartItems: [],
            loading: false,
            error: '',
        }
    },
    computed: {
        itemIsInCart() {
            // console.log(this.cartItems, "itemIsInCart");
            // console.log(this.$route.params);
            return this.cartItems.some(item => item.id === parseInt(this.$route.params.productId));
        }
    },
    watch: {
        async userId(newUserValue) {
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
        goBack: function() {
            this.$router.go(-1);
        },
        created: async function () {
            this.loading = true;

            const response = await axios.get(baseURL + `/products/details/${this.$route.params.productId}`);
            this.product = response.data;

            if(this.userId) {
                const response2 = await axios.get(baseURL + `/cart/${this.userId}`);
                this.cartItems = response2.data;
            }

            this.loading = false;
        },
        
        getIMGPath: function(imageUrl) {
            return imageUrl ? require("@/assets" + imageUrl) : "no-image";
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
                showCloseButtonOnHover: true,
                // hideProgressBar: true,
                closeButton: "button",
           });
        },

        addToCart: async function () {
            const response = await axios.post(baseURL + `/cart/${this.userId}`, {product_id: this.$route.params.productId} );
            console.log('Item added to the cart!', response);

            this.triggerToast();
        },

        signIn: async function () {
            this.$router.push({path: '/Login'});    
        }
    },
}
</script>
