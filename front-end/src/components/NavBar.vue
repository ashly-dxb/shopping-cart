<template>
    <div class=" flex justify-between items-center w-full py-2 text-white bg-black">
        <div class="font-signature ml-2">
            <a href="#" class="no-underline text-white">NextJS</a>
            <div v-if="usedData !== null">{{usedData.username}}xxx</div>
            <div v-else>yyy</div>
        </div>

        <ul class="hidden md:flex">
            <!-- <li v-if="loggedIn === true">Logged In</li> -->

            <li v-if="loggedIn === true" v-for="item in primaryLinks" class="mt-2 px-2 py-1 rounded hover:bg-gray-800 sm:mt-0 sm:ml-2">
                <router-link v-if="item.type === 'LOGGED_IN'" :to="item.link" active-class="active-link">
                    <i :class="['pi', item.icon]" style="font-size: 1.1rem"></i><span class="ps-2">{{ item.text }}</span>
                </router-link>
            </li>

            <li v-else  v-for="item in secondaryLinks" class="mt-2 px-2 py-1 rounded hover:bg-gray-800 sm:mt-0 sm:ml-2">
                <router-link :to="item.link" active-class="active-link">
                    <i :class="['pi', item.icon]" style="font-size: 1.1rem"></i><span class="ps-2">{{ item.text }}</span>
                </router-link>
            </li>

            <li class="mt-2 px-2 py-1 rounded hover:bg-gray-800 sm:mt-0 sm:ml-2" v-if="loggedIn === true">
                <div @click="signOut" class="logoutHover"><i class="pi pi-sign-out" style="font-size: 1rem"></i><span class="ps-2">Logout</span></div>
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
import mainLinks, {otherLinks}  from '../components/menulinks';
import 'primeicons/primeicons.css';

import {mapState, mapGetters} from 'vuex';

export default {
    name: 'NavBar',
    // props: ['user', 'loggedIn'],
    props: ['loggedIn'],
    computed: {
        // console.log('in computed');
        ...mapState({
            user: (state) => state.userObj
        }),

        ...mapGetters({
            loggedUserData: 'loggedUserInfo'
        }),

        truncatedFullname: function() {
            return this.user.substring(0, 12);
        },
        // usedData: this.loggedUserData
    },
    data() {
        return {
            logo,
            isLogged: this.checkIfIsLogged(),
            isOpen: false,
            primaryLinks: mainLinks,
            secondaryLinks: otherLinks,
            usedData: null,
        }
    },
    mounted() {
        console.log("NAV mapGetters", this.loggedUserData);
        console.log("NAV mapState", this.user);
        this.usedData = this.loggedUserData;
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
                localStorage.removeItem('userId');

                console.log("Logging out:", data);

                this.$emit("user-logged-out");
                // this.$store.commit("logoutSuccess"); // store mutation
                this.$store.dispatch("logoutDone"); // store action

                console.log("Logging out: 222");

                this.isLogged = this.checkIfIsLogged();
                this.$router.push('/Login');
            }
        },

        checkIfIsLogged: function() {
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
    
}
</script>
