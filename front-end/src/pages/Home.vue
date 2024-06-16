<template>
    <div class='max-w-3xl bg-white flex flex-col px-5 m-auto my-2 border-0'>
        <div class="w-full flex border-2">
            <div class="m-auto mb-3 mt-4">
                <h3 class='text-green-700 text-xl font-bold'>Home</h3>
            </div>

            <div class="m-auto mb-3 mt-4 ml-2  border-0">
                Welcome to home page!
            </div>
            <!--
            <div>{{ //$store.state.counter }}</div>
            <button type="button" class="" @click="$store.commit('decreaseCounter')">-</button>
            <button type="button" class="" @click="$store.commit('increaseCounter')">+</button>
            -->
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import {mapState, mapGetters} from 'vuex';

export default {
    name: 'Home',
    methods: {
        
    },
    data() {
        return {
            error: '',
            usedData: null,
        }
    },
    computed: {
        // console.log('in computed');
        ...mapState({
            user: (state) => state.userObj
        }),

        ...mapGetters({
            loggedUserData: 'loggedUserInfo'
        }),
    },
    mounted() {
        console.log("HOME GETTER", this.loggedUserData);
        this.usedData = this.loggedUserData;
    },
}
</script>
