<template>
    <div class='max-w-3xl bg-white px-5 m-auto my-2 border-0'>
        <div class="m-auto mb-3 mt-4">
          <h3 class='text-green-700 text-xl font-bold'>Checkout success</h3>
        </div>

        <h2>Thank you for your purchase!</h2>

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

            fullPage: true,
            visible: false,
            loader: 'bars',
        }
  },
  computed: {
    ...mapGetters({
        loggedUserData: 'loggedUserInfo'
    }),
  },

  mounted: function() {
    this.userId = this.loggedUserData.userId;
    this.clearCart();    
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
