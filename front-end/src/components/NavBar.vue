<template>
    <div class=" flex justify-between items-center w-full py-4 text-white bg-black">
        <div class="font-signature ml-2">
            <a href="#" class="no-underline text-white">NextJS Cart</a>
            {{ user }}
        </div>
                
        <ul class="hidden md:flex">
            <li v-if="loggedIn === true">Logged In</li>
            <li class="mt-2 px-2 py-1 rounded hover:bg-gray-800 sm:mt-0 sm:ml-2" v-if="loggedIn === false">
                <router-link to="/Register" active-class="active-link">Register</router-link>
            </li>
            <li class="mt-2 px-2 py-1 rounded hover:bg-gray-800 sm:mt-0 sm:ml-2" v-if="loggedIn === false">
                <router-link to="/Login" active-class="active-link" >Login</router-link>
            </li>
            <li class="mt-2 px-2 py-1 rounded hover:bg-gray-800 sm:mt-0 sm:ml-2" v-if="loggedIn === true">
                <router-link to="/" active-class="active-link">Home</router-link>
            </li>
            <li class="mt-2 px-2 py-1 rounded hover:bg-gray-800 sm:mt-0 sm:ml-2" v-if="loggedIn === true">
                <router-link to="/products" active-class="active-link">Products</router-link>
            </li>
            <li class="mt-2 px-2 py-1 rounded hover:bg-gray-800 sm:mt-0 sm:ml-2" v-if="loggedIn === true">
                <router-link to="/cart" active-class="active-link">Cart</router-link>
            </li>
            <li class="mt-2 px-2 py-1 rounded hover:bg-gray-800 sm:mt-0 sm:ml-2" v-if="loggedIn === true">
                <router-link to="/airports" active-class="active-link">Airport</router-link>
            </li>
            <li class="mt-2 px-2 py-1 rounded hover:bg-gray-800 sm:mt-0 sm:ml-2"  v-if="loggedIn === true">
                <button @click="signOut">Logout</button>
            </li>
        </ul>

        <div
            @click="setIsOpen"
            class="cursor-pointer z-10 text-gray-500 md:hidden"
        >
            <svg class="h-10 w-10 fill-current" viewBox="0 0 24 24">                   
                <path v-if="isOpen"
                fillRule="evenodd"
                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
            
                <path v-else
                fillRule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />                    
            </svg>
        </div>

        <ul class="flex flex-col justify-top items-center absolute top-0 left-0 px-2 w-full h-screen bg-gradient-to-b from-black to-gray-500 z-10" v-if="isOpen">
            <li v-for="item in allLinks" class="flex flex-row pl-3 py-6 sm:mt-0 w-full shrink-0 hover:bg-gray-900">
                <router-link :to="item.link" @click="setIsOpen" active-class="active-link" class="text-3xl no-underline text-white hover:text-blue-400 w-full shrink-0">{{ item.text }}</router-link>
            </li>
        </ul>
    </div>

</template>

<script>
import baseURL from "./Config";
import logo from '@/assets/logo-hexagon.svg';
import links from '../components/menulinks';

export default {
    name: 'NavBar',
    props: ['user', 'loggedIn'],
    data() {
        return {
            logo,
            isLogged: this.checkIfIsLogged(),
            isOpen: false,
            allLinks: links,
        }
    },
    mounted() {
        // console.log('Links:', this.allLinks);
    },
    methods: {
        signOut: async function() {
            const response = await fetch(baseURL + "/users/logout", {
                    method: 'GET',
                    credentials: 'include', /* very important for the cookies to be set from the server*/
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });

            const data = await response.json();

            if(data.authenticated === false) {
                localStorage.removeItem('token');
                localStorage.removeItem('username');

                this.$emit("user-logged-out", data);

                console.log("logging out:", data)

                this.isLogged = this.checkIfIsLogged();
                this.$router.push('/Login');
            }
        },
        checkIfIsLogged () {
            let token = localStorage.getItem('token');
            if (token) {
                return true;
            } else {
                return false;
            }
        },
        setIsOpen: function() {
            this.isOpen = !this.isOpen;

            // console.log("isOpen: ", this.isOpen);
        }
    },
    computed: { 
        truncatedFullname: function() {
            return this.user.substring(0, 12);
        }
    } 
}
</script>
