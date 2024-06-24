<template>
    <nav class="sticky top-0 z-50"> 
    <div class="flex justify-between items-center w-full py-2 bg-gray-400">
        <div class="font-signature ml-2">
            <a href="#" class="no-underline">Vue.js App</a>
            <p v-if="this.$store.getters.getLoggedUserInfo">{{ this.$store.getters.getLoggedUserInfo.username }}</p>
        </div>

        <div class="dark-mode-toggle border-2 border-gray-300" @click="toggleDarkMode" :title="isDarkMode? `Light Theme` : `Dark theme`">
            <div class="icon-mode-toggle" v-html="isDarkMode ? moonIcon : sunIcon"></div>
        </div>

        <ul class="hidden md:flex">
            <li v-if="loggedIn === true" v-for="item in primaryLinks" class="mt-2 py-1 rounded hover:bg-blue-500 sm:mt-0 sm:ml-2">
                <router-link v-if="item.type === 'LOGGED_IN'" :to="item.link" active-class="active-link">
                    <i :class="['pi', item.icon]" style="font-size: 1.1rem"></i><span class="ps-2">{{ item.text }}</span>
                </router-link>
            </li>

            <li v-else  v-for="item in secondaryLinks" class="mt-2 py-1 rounded hover:bg-blue-500 sm:mt-0 sm:ml-2">
                <router-link :to="item.link" active-class="active-link">
                    <i :class="['pi', item.icon]" style="font-size: 1.1rem"></i><span class="ps-2">{{ item.text }}</span>
                </router-link>
            </li>

            <li v-if="loggedIn === true" class="mt-2 py-1 rounded hover:bg-blue-500 sm:mt-0 sm:ml-2">
                <div @click="signOut" class="logoutHover"><i class="pi pi-sign-out" style="font-size: 1.1rem"></i><span class="ps-2">Logout</span></div>
            </li>




            

        </ul>

        <div
            @click="setIsOpen"
            class="cursor-pointer z-20 text-gray-500 md:hidden"
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

        <ul class="flex flex-col justify-top items-center absolute top-0 left-0 px-2 w-full h-100 bg-gradient-to-b from-gray-200 to-gray-900 z-10" v-if="isOpen">
            <li v-if="loggedIn === true" v-for="item in primaryLinks" class="flex flex-row pl-3 py-6 sm:mt-0 w-full shrink-0 hover:bg-gray-900">
                <router-link v-if="item.type === 'LOGGED_IN'" :to="item.link" @click="setIsOpen" active-class="active-link" class="">
                    <i :class="['hover:text-blue-600 pi', item.icon]" style="font-size: 1.7rem"></i><span class="text-3xl hover:text-blue-600 w-full shrink-0 ps-2 ms-3">{{ item.text }}</span>
                </router-link>
            </li>

            <li v-else  v-for="item in secondaryLinks" class="flex flex-row pl-3 py-6 sm:mt-0 w-full shrink-0 hover:bg-gray-900">
                <router-link :to="item.link" @click="setIsOpen" active-class="active-link" class="">
                    <i :class="['hover:text-blue-600 pi', item.icon]" style="font-size: 1.7rem"></i><span class="text-3xl hover:text-blue-600 w-full shrink-0 ps-2 ms-3">{{ item.text }}</span>
                </router-link>
            </li>

            <li v-if="loggedIn === true" class="flex flex-row pl-3 py-6 sm:mt-0 w-full shrink-0 hover:bg-gray-900">
                <div @click="signOut(); setIsOpen();" class="logoutHover"><i class="hover:text-blue-600 pi pi-sign-out" style="font-size: 1.7rem"></i><span class="text-3xl hover:text-blue-600 w-full shrink-0 ps-2 ms-3">Logout</span></div>
            </li>
        </ul>        
    </div>
</nav>
</template>

<script>
import baseURL from "./Config";
import logo from '@/assets/logo-hexagon.svg';
import mainLinks, {otherLinks}  from './NavBarLinks';
import 'primeicons/primeicons.css';
import {mapState, mapGetters} from 'vuex';
// import {ref} from 'vue';

export default {
    name: 'NavBar',
    props: ['loggedIn'],
    computed: {
        // ...mapState({
        //     user: (state) => state.userObj
        // }),

        ...mapGetters({
            loggedUserData: 'getLoggedUserInfo'
        }),

        truncatedFullname: function() {
            return this.user.substring(0, 12);
        },
    },

    data() {
        return {
            logo,
            isOpen: false,
            primaryLinks: mainLinks,
            secondaryLinks: otherLinks,
            usedData: null,

            sunIcon : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path>
                        </svg>`,

            moonIcon : ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="w-5 h-5 transform -rotate-90" viewBox="0 0 24 24">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>`,

            isDarkMode : JSON.parse(localStorage.getItem('darkMode')) ? true : false,
            styleProperties: {
                                '--background-color'  : this.isDarkMode ? '#121228' : '#fff',
                                '--text-color'        : this.isDarkMode ? '#fff' : '#121228'
                            },
        }
    },

    mounted() {
        this.usedData = this.loggedUserData;

        this.styleProperties = {
                                '--background-color'  : this.isDarkMode ? '#121228' : '#fff',
                                '--text-color'        : this.isDarkMode ? '#fff' : '#121228'
                            };

        this.applyStyles();
    },

    methods: {        
        toggleDarkMode: function() {
            localStorage.setItem('darkMode', JSON.stringify(!this.isDarkMode));

            this.isDarkMode = JSON.parse(localStorage.getItem('darkMode')) ? true : false;

            this.styleProperties = {
                                '--background-color'  : this.isDarkMode ? '#121228' : '#fff',
                                '--text-color'        : this.isDarkMode ? '#fff' : '#121228'
                            };

            this.applyStyles();            
        },

        applyStyles: function() {
            var root = document.querySelector(':root');

            for(const [key, value] of Object.entries(this.styleProperties)) {
                root.style.setProperty(key, value);
            }
        },

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
                localStorage.removeItem('username');
                localStorage.removeItem('userId');

                this.$emit("user-logged-out");
                // this.$store.commit("logoutSuccess"); // store mutation
                this.$store.dispatch("logoutDone"); // store action

                this.$router.push('/Login');
            }
        },

        setIsOpen: function() {
            this.isOpen = !this.isOpen;
        }
    },
}
</script>


<style scoped>
.dark-mode-toggle {
    width: 35px;
    height: 35px;
    border-radius: 18px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: var(--background-color);
    color: var(--text-color);

    margin: 5px 4px;

    cursor: pointer;
}

.icon-mode-toggle {
    display: inline-block;
    margin: auto;
}
</style>
