<template>
    <header class="bg-white shadow-md border-2">
        <nav class="columns-3">
            <div class="w-full">
                <img :src="logo" class="logo-wrap" />
            </div>
            <div class="w-full">
                <ul class="flex justify-end text-lg">
                    <li class="hover:text-blue-500 cursor-pointer px-4">
                        <router-link to="/Register">Register</router-link>
                    </li>
                    <li class="hover:text-blue-500 cursor-pointer px-4">
                        <router-link to="/Login">Login</router-link>
                    </li>
                    <li class="hover:text-blue-500 cursor-pointer px-4">
                        <router-link to="/">Home</router-link>
                    </li>
                    <li class="hover:text-blue-500 cursor-pointer px-4">
                        <router-link to="/products">Products</router-link>
                    </li>
                    <li class="hover:text-blue-500 cursor-pointer px-4">
                        <router-link to="/cart">Cart</router-link>
                    </li>
                    <li class="hover:text-blue-500 cursor-pointer px-4">
                        <button @click="signOut" v-if="user">Sign out</button>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth';
import logo from '@/assets/logo-hexagon.svg';

export default {
    name: 'NavBar',
    props: ['user'],
    data() {
        return {
            logo,
        }
    },    
    methods: {
        signOut() {
            const auth = getAuth();
            signOut(auth);
        }
    }
}
</script>
