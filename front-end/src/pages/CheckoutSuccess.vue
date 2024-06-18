
<template>
    <div class='max-w-3xl bg-white px-5 m-auto my-2 border-0'>
        <div class="m-auto mb-3 mt-4">
          <h3 class='text-green-700 text-xl font-bold'>Checkout success</h3>
        </div>

        <h2>Thank you for your purchase!</h2>
    </div>
</template>

<script>
import baseURL from '@/components/Config';
import axios from 'axios';

export default {
  name: 'CheckoutSuccess',
  props: ['userId'],

  mounted: function() {
    this.clearCart();
  },

  methods: {
      clearCart: function() {
          if(this.userId) {
              let loader = this.$loading.show({});

              axios.delete(baseURL + `/cart/clear/${this.userId}`)
              .then((response) => {
                  this.cartItems = response.data;

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
