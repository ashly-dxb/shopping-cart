<template>
    <div class='max-w-3xl bg-white flex flex-col px-5 m-auto my-2 border-2 '>
        <div class="m-auto mb-3 mt-4">
          <h3 class='text-green-700 text-xl font-bold'>Home</h3>
        </div>

        Welcome to home page!
        <!--
        <div>{{ //$store.state.counter }}</div>
        <button type="button" class="login-button" @click="$store.commit('decreaseCounter')">-</button>
        <button type="button" class="login-button" @click="$store.commit('increaseCounter')">+</button>
        -->
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    name: 'HomePage',
    methods: {
        
    },
    data() {
        return {
            error: '',           
        }
    }
}
</script>
