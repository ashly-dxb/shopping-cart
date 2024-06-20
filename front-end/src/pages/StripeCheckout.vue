<template>
    <div class='max-w-3xl bg-white px-5 m-auto my-2 border-0'>
        <div class="m-auto mb-3 mt-4">
          <h3 class='text-green-700 text-xl font-bold'>Custom Checkout</h3>
        </div>

        <div class="w-full md:w-2/3 m-auto mb-3 mt-4 border-0 border-green-300">

            <div class="formElement my-3">
                <label class="bg-blue-600 text-white text-xl p-3">Total Amount: AED {{ paymentAmount }}</label>
            </div>

            <form @submit.prevent="handleSubmit" >
            <div class="formElement my-3">
                <label for="name_field">Name</label>
                <input
                    type="text"
                    placeholder="Name"              
                    name="name"
                    id="name_field"
                    class="border-x border-y border-solid border-gray-400 p-2 mt-2 w-full hover:border-green-500 focus:outline-blue-500"
                    />
            </div>

            <div class="formElement my-3">
                <label for="email_field">Email</label>
                <input
                    type="email"
                    placeholder="account@example.com"              
                    name="email"
                    id="email_field"
                    class="border-x border-y border-solid border-gray-400 p-2 mt-2 w-full hover:border-green-500 focus:outline-blue-500"
                    />
            </div>

            <div class="formElement my-3">
                <label for="element_strip">Card Details</label>
                <div id="element_strip" class="mb-4 w-full border-0 border-red-300"></div>
            </div>

            <div v-if="serverError" class="p-2 my-2 border-x border-y border-solid border-red-300 text-red-700">
                {{serverError}}
            </div>

            <div class="formElement my-3">
                <button
                    type="submit"
                    class="p-2 my-2"
                    >
                    {{ loadingStatus ? "Loading..." : "Pay Now" }}
                </button>
            </div>
            </form>

            <loading v-model:active="visible" :is-full-page="fullPage" :loader="loader" :can-cancel="false" />
        </div>
    </div>
</template>

<script>
import baseURL from '@/components/Config';
import axios from 'axios';

import { loadStripe } from "@stripe/stripe-js";
import { ref, computed } from "vue";
import { mapGetters} from 'vuex';

const cardElementStyle = {
                style: {
                    base: {
                        iconColor: "#000",
                        color: "#000",
                        fontSize: "18px",
                        // fontWeight: "500",
                        fontFamily: "Press Start 2P",
                        fontSmoothing: "antialiased",
                        ":-webkit-autofill": {
                            color: "#fce883"
                        },
                        "::placeholder": {
                            color: "#D3D3D3"
                        }
                    },
                    invalid: {
                        iconColor: "#FFC7EE",
                        color: "red"
                    }
                }
            };

            
export default {
    data: function() {
        return {
            stripe : null,
            elements : null,
            loadingStatus : ref(true),

            serverError: '',
            paymentAmount: 0,
            orderData: null,
            userId: null,
            orderItems: [],

            fullPage: true,
            visible: false,
            loader: 'bars',
        }
    },

    computed: {
        ...mapGetters({
            loggedUserData: 'getLoggedUserInfo',
            currentOrderItems: 'getCurrOrderItems',
        }),
    },
    
    mounted: function () {
        this.userId = this.loggedUserData.userId;
        this.orderItems = this.currentOrderItems;
        this.created();
    },

    methods: {
        created: function() {
            // console.log("loadingStatus:", this.loadingStatus);
            this.paymentAmount = this.$route.query.amount;
            this.onMounted();
        },

        onMounted: async function() {
            this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_PK);

            const ELEMENT_TYPE = "card";
            this.elements = this.stripe.elements();

            const element = this.elements.create(ELEMENT_TYPE, cardElementStyle);
            element.mount("#element_strip");

            this.loadingStatus = false;
        },

        addOrder: async function() {
            const response = await axios.post(baseURL + `/orders/create`, {
                userId: this.userId,
                orderAmount: this.paymentAmount,
                orderItems: this.orderItems,
            })
            return response;

            // .then((response) => {                
            //     console.log("response.data ::", response.data);
            // })
            // .catch((errors) => {
            //     console.log("errors ::", errors);
            // });
        },

        handleSubmit: async function(event) {
            // console.log("In progress:", this.loadingStatus);
            if (this.loadingStatus) 
                return;

            this.loadingStatus = true;

            let loader = this.$loading.show({
                    loader: 'dots',
                    width: 64,
                    height: 64,
                    opacity: 0.5,
                });

            const { name, email } = Object.fromEntries( new FormData(event.target) );   
            const billingDetails = {
                                        name,
                                        email,
                                        address: {
                                            line1: 'Test Address',
                                        }
                                    };
    
            const cardElement = this.elements.getElement("card");
    
            try {
                this.$store.dispatch("checkoutStart"); // store action

                const response = await fetch(baseURL + "/stripe/payment_intent", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify({ amount: this.paymentAmount * 100 })
                                        });

                const { secret } = await response.json();
        
                const paymentMethodReq = await this.stripe.createPaymentMethod({
                    type: "card",
                    card: cardElement,
                    billing_details: billingDetails
                });
        
                if(paymentMethodReq.error) { // error handling
                    this.serverError = paymentMethodReq.error.message;
                    loader.hide();
                    this.loadingStatus = false;
                    return false;
                }
        
                const { status } = await this.stripe.confirmCardPayment(secret, {
                    payment_method: paymentMethodReq.paymentMethod.id
                });

                // console.log("confirmCardPayment status:", status);

                /*
                if(status.error) { // error handling ...check this....
                    this.serverError = status.error.message;                    
                    loader.hide();
                    this.loadingStatus = false;
                    return false;
                }
                */

                const resp = await this.addOrder(); // save order details in the database, after a successful payment
                this.orderData = resp.data.savedOrder;

                this.$store.dispatch("checkoutComplete", this.orderData); // store action

                loader.hide(); 

                this.loadingStatus = false;
                this.$router.push("/checkout-success");
            }
            catch (error) {
                console.log("Error ::", error);

                this.loadingStatus = false;
                loader.hide();
            }
        },
    }    
}
</script>
  
<style scoped>
.formInput {
    border: 1px solid gray;
    padding: 2px 3px;
    margin: 3px;
}

.formElement {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 3px;
}

.dis {
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
}
</style>
