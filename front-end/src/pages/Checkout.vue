<template>
    <div class='max-w-3xl bg-white px-5 m-auto my-2 border-0'>
        <div class="m-auto mb-3 mt-4">
          <h3 class='text-green-700 text-xl font-bold'>Checkout</h3>
        </div>

        <div>
            <stripe-checkout
                ref="checkoutRef"
                mode="payment"
                :pk="publishableKey"
                :line-items="lineItems"
                :success-url="successURL"
                :cancel-url="cancelURL"
                @loading="v => loading = v"
                />
            <button @click="submit">Pay now!</button>
        </div>
    </div>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import {stripePK} from "../components/Config";

export default {
    name: 'Checkout',

    components: {
        StripeCheckout,
    },

    data() {
        // this.publishableKey = process.env.VUE_APP_STRIPE_PK;
        // this.publishableKey = `${stripePK}`;
        this.publishableKey = 'pk_test_51NsibaGVxy3awU0NakOY7DyORV8nWYhOt7dURGynn5LXy5ivifiEGCLJ7cT2rbDMGnrE67RAnd2gcWHzFj0syKvw00PBqnNmmW';

        return {
            loading: false,
            lineItems: [                
                {
                    price: "price_1PNXFwGVxy3awU0N9L81Fe3e", 
                    quantity: 2
                },
                {
                    price: "price_1PCihkGVxy3awU0Ntbhxm1uL",
                    quantity: 3
                },
            ],
            successURL: `${window.location.origin}/checkout-success`,
            cancelURL: `${window.location.origin}/checkout-cancel`,
        };
    },

    methods: {
        submit () {
            // You will be redirected to Stripe's secure checkout page
            this.$refs.checkoutRef.redirectToCheckout();
        },
    },
}

</script>
