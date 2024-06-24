<template>
    <div class='max-w-3xl flex flex-col px-5 m-auto my-2 border-0'>
        <div class="w-full m-auto mb-3 mt-4">
          <h2 class='xxxxx text-xl font-bold'>My Orders</h2>
        </div>

        <div v-if="error" class="error">{{error}}</div>

        <div class="w-full flex m-auto border-0">
          <div class="flex-column w-1/3 border-0 border-green-400 max-h-80 overflow-y-auto">
            <div v-for="eachOrder in myOrders" :key="eachOrder.orderId" class="pt-2">
              <div @click="loadDetails(eachOrder)" :class="['cursor-pointer hover:bg-gray-400', eachOrder.orderId == selectedID ? 'activeItem' : '']">
                {{ eachOrder.orderId }} / {{ new Date(eachOrder.orderDate).toISOString().slice(0, 10) }} 
                {{ new Date(eachOrder.orderDate).toISOString().slice(11, 19) }}
              </div>
            </div>
          </div>

          <div class="flex-column w-2/3 border-0 border-yellow-400">
            <OrderCard v-if="currentOrder !== null" :order="currentOrder" class="p-2"/>
          </div>
        </div>
    </div>
</template>
  
<script>
import baseURL from '@/components/Config';
import axios from 'axios';
import { mapGetters} from 'vuex';
import OrderCard from '../components/OrderCard.vue';

export default {
    name: 'MyOrders',
    components: {
      OrderCard,
    },

    data() {
        return {
            myOrders: null,
            userId: null,
            currentOrder: null,
            selectedID: null,

            error: '',
        }
    },
    
    computed: {
        ...mapGetters({
            loggedUserData: 'getLoggedUserInfo'
        }),
    },

    mounted: function () {
      this.userId = this.loggedUserData.userId;

      this.created();
    },

    methods: {
        created: async function () {
            if(this.userId) {
                let loader = this.$loading.show({
                    loader: 'dots',
                    width: 64,
                    height: 64,
                    opacity: 0.5,
                });

                axios.get(baseURL + `/orders/user/${this.userId}`)
                .then((response) => {
                    this.myOrders = response.data.orders;
                })
                .catch((error) => {
                    console.log("error:", error);
                    this.error = error.toString();
                })
                .finally(() => {
                    loader.hide();
                });
            }
        },

        loadDetails: function(order) {
            // console.log("selected item: ", order)
            this.currentOrder = order;
            this.selectedID = order.orderId;
        }
    },    
};
</script>

<style scoped>
.activeItem {
    background-color: rgb(160, 81, 81);
    color: white;
    border-radius: 12px;
    padding: 3px;
}
</style>
