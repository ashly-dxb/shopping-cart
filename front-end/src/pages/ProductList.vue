<template>
    <div class='max-w-3xl px-5 m-auto my-2 border-0'>
        <div class="m-auto mb-3 mt-4">
          <h3 class='text-xl font-bold'>Product List</h3>
        </div>

        <div v-if="error" class="error">{{error}}</div>

        <ProductCard :products="products" :cartItemsList="cartItemsList" :userId="userId" />

        <loading v-model:active="visible" :is-full-page="fullPage" :loader="loader" :can-cancel="false" />
    </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import baseURL from '@/components/Config';
import axios from 'axios';
import { mapGetters} from 'vuex';

export default {
    name: 'ProductList',
    components: {
        ProductCard,
    },
    data() {
        return {
            userId: null,
            products: [],
            error: '',
            cartItemsList: [],

            fullPage: true,
            visible: false,
            loader: 'dots',
        }
    },
    /*
    async beforeRouteEnter(to, from, next) {
        // console.log("beforeRouteEnter");
        try {
            const response = await axios.get(baseURL + '/products/list');
            next(vm => vm.setPost(response.data))
        } catch (err) {
            next(vm => vm.setError(err))
        }
    },
    */
    computed: {
        ...mapGetters({
            loggedUserData: 'getLoggedUserInfo',
        }),
    },
    mounted: function () {
        this.userId = this.loggedUserData.userId;
        this.created(); // this.userId should be set before call to created()
    },
    methods: {
        created: async function () {

            let loader = this.$loading.show({
                loader: 'bars',
                width: 50,
                height: 50,
                // backgroundColor: 'rgb(40, 190, 40)',
                // color: 'rgb(180, 110, 160)',
                opacity: 0.5,
            });

            axios.get(baseURL + '/products/list')
                .then((response) => {
                    this.products = response.data;
                })
                .catch((error) => {
                    console.log("error:", error);
                    this.error = error.toString();
                })
                .finally(() => {
                    loader.hide();
                });

            if(this.userId) {
                const response2 = await axios.get(baseURL + `/cart/itemlist/${this.userId}`);
                this.cartItemsList = response2.data;
            }
            // loader.hide();
        },
        setPost(products) {
            // console.log("setPost", products);
            this.products = products;
        },
        setError(error) {
            this.error = error.toString();
        }
    },
}
</script>
