<template>
    <div class='max-w-3xl px-5 m-auto my-2 border-0'>
        <div class="m-auto mb-3 mt-4">
          <h3 class='xxxxx text-xl font-bold'>Checkout success</h3>
        </div>

        <h2 class="p-2 border-2 border-green-700">Thank you for your purchase!</h2>
        
        <h2 class="p-2 bg-green-700">Order Number: {{ orderId }}</h2>

        <ul>
            <li v-for="item in orderItems" :key="item._id">
                ID: {{ item.id }} / Price: {{ item.price }} / Qty: {{ item.quantity }}
            </li>
        </ul>

        <loading v-model:active="visible" :is-full-page="fullPage" :loader="loader" :can-cancel="false" />
    </div>
</template>

<script>
import baseURL from '@/components/Config';
import axios from 'axios';
import { mapGetters} from 'vuex';
import { computed } from 'vue';

export default {
  name: 'CheckoutSuccess',
  props: ['userId'],

  data() {
        return {
            data: null,
            userId: null,
            orderId: null,
            orderItems: [],

            fullPage: true,
            visible: false,
            loader: 'bars',
        }
  },

  computed: {
    ...mapGetters({
        loggedUserData: 'getLoggedUserInfo',
        currentOrderData: 'getLastOrderInfo',
        currentOrderItems: 'getCurrOrderItems',
    }),
  },

  mounted: function() {
    this.userId = this.loggedUserData.userId;
    this.orderId = this.currentOrderData.orderId;
    this.orderItems = this.currentOrderItems;
    this.clearCart(); // clear cart on success redirect from the payment gateway/page
  },

  methods: {
      clearCart: function() {
          if(this.userId) {
              let loader = this.$loading.show({});

              axios.delete(baseURL + `/cart/${this.userId}`)
              .then((response) => {
                  this.data = response.data;
                  loader.hide();
              })
              .catch((errors) => {
                  loader.hide();
              });
          }
      },

  }  
}

</script>
