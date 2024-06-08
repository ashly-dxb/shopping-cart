<template>
    <header class="bg-black text-white shadow-md border-2">
        <nav class="columns-2 pt-2">
            <div class="w-1/6">
                <img :src="logo" class="logo-wrap" />
            </div>
            <div class="w-5/6">
                <ul class="flex justify-end text-lg">
                    <li class="hover:text-blue-500 hover:background-white cursor-pointer px-4">
                        <router-link to="/Register" active-class="active-link">Register</router-link>
                    </li>
                    <li class="hover:text-blue-500 cursor-pointer px-4">
                        <router-link to="/Login" active-class="active-link">Login</router-link>
                    </li>
                    <li class="hover:text-blue-500 cursor-pointer px-4">
                        <router-link to="/" active-class="active-link">Home</router-link>
                    </li>
                    <li class="hover:text-blue-500 cursor-pointer px-4">
                        <router-link to="/products" active-class="active-link">Products</router-link>
                    </li>
                    <li class="hover:text-blue-500 cursor-pointer px-4">
                        <router-link to="/cart" active-class="active-link">Cart</router-link>
                    </li>
                    <li class="hover:text-blue-500 cursor-pointer px-4">
                        <router-link to="/airports" active-class="active-link">Airport</router-link>
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
