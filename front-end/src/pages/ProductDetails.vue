<template>
    <div class='max-w-3xl flex flex-col px-5 m-auto my-2 border-0'>
        <div class="m-auto mb-3 mt-4">
          <h3 class='xxxxx text-xl font-bold'>Product Details</h3>
        </div>

        <div v-if="product">
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

                <div class="text-right">
                    <button @click="goBack" class="mt-5">
                        <i class="pi pi-back" style="font-size: 1.1rem"></i><span class="ps-2">Back</span>
                    </button>
                </div>
            </div>
        </div>

        <div v-else>
            <NotFoundPage />
        </div>

        <loading v-model:active="visible" :is-full-page="fullPage" :loader="loader" :can-cancel="false" />
    </div>
</template>

<script>
import NotFoundPage from './NotFoundPage.vue';
import baseURL from "../components/Config";
import axios from 'axios';
import { mapGetters} from 'vuex';

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
// import MdiArrowLeftIcon from 'vue-material-design-icons/MDIArrowLeft.vue';

export default {
    name: 'ProductDetails',
    // props: ['userId'],
    components: {
        NotFoundPage,
        // MdiArrowLeftIcon
    },
    data() {
        return {
            userId: null,
            product: {},
            cartItems: [],
            loading: false,

            fullPage: true,
            visible: false,
            loader: 'dots',
        }
    },
    computed: {
        itemIsInCart() {
            return this.cartItems.some(item => item.id === parseInt(this.$route.params.productId));
        },
        ...mapGetters({
            loggedUserData: 'getLoggedUserInfo',
        }),
    },

    /*
    watch: {
        async userId(newUserValue) {
            if (newUserValue) {
                const response2 = await axios.get(baseURL + `/cart/${newUserValue}`);
                this.cartItems = response2.data;
            }
        }
    },
    */

    mounted: function () {
        this.userId = this.loggedUserData.userId;
        console.log("userId:::", this.userId);

        this.created();        
    },

    methods: {
        goBack: function() {
            this.$router.go(-1);
        },
        created: async function () {
            // this.loading = true;

            console.log("created");

            let loader = this.$loading.show({
                    loader: 'dots',
                    width: 50,
                    height: 50,
                    opacity: 0.5,
                });

            axios.get(baseURL + `/products/details/${this.$route.params.productId}`)
            .then((response) => {
                this.product = response.data;
                loader.hide();
            })
            .catch((errors) => {
                loader.hide();
            });

            if(this.userId) {
                console.log("created 12222");
                // const response2 = await axios.get(baseURL + `/cart/${this.userId}`);
                // this.cartItems = response2.data;

                axios.get(baseURL + `/cart/${this.userId}`)
                .then((response2) => {
                    this.cartItems = response2.data;
                })
                .catch((error) => {
                    console.log("error:", error);
                })
                .finally(() => {
                    // loader.hide();
                });
            }

            // this.loading = false;
            loader.hide();

            console.log("created 2");
        },
        
        getIMGPath: function(imageUrl) {
            return imageUrl ? require("@/assets" + imageUrl) : require("@/assets/logo-hexagon.svg");
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
            // console.log('Item added to the cart!', response);

            this.triggerToast();
        },

        signIn: async function () {
            this.$router.push({path: '/Login'});    
        }
    },
}
</script>
