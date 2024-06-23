<template>
    <div class=" flex justify-between items-center w-full py-2 bg-gray-400">
        <div class="font-signature ml-2">
            <a href="#" class="no-underline">Vue.js App</a>
            <p v-if="this.$store.getters.getLoggedUserInfo">{{ this.$store.getters.getLoggedUserInfo.username }}</p>
        </div>

        <div class="dark-mode-toggle border-2 border-gray-300" @click="toggleDarkMode" :title="isDarkMode? `Light Theme` : `Dark theme`">
            <div class="icon-mode-toggle" v-html="isDarkMode ? moonIcon : sunIcon"></div>
        </div>

        <ul class="hidden md:flex">
            <li v-if="loggedIn === true" v-for="item in primaryLinks" class="mt-2 px-2 py-1 rounded hover:bg-blue-500 sm:mt-0 sm:ml-2">
                <router-link v-if="item.type === 'LOGGED_IN'" :to="item.link" active-class="active-link">
                    <i :class="['pi', item.icon]" style="font-size: 1.1rem"></i><span class="ps-2">{{ item.text }}</span>
                </router-link>
            </li>

            <li v-else  v-for="item in secondaryLinks" class="mt-2 px-2 py-1 rounded hover:bg-blue-500 sm:mt-0 sm:ml-2">
                <router-link :to="item.link" active-class="active-link">
                    <i :class="['pi', item.icon]" style="font-size: 1.1rem"></i><span class="ps-2">{{ item.text }}</span>
                </router-link>
            </li>

            <li v-if="loggedIn === true" class="mt-2 px-2 py-1 rounded hover:bg-blue-500 sm:mt-0 sm:ml-2">
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

            sunIcon : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-sun" viewBox="0 0 16 16">
            <path d="M8 4.41a3.59 3.59 0 1 1 0 7.18 3.59 3.59 0 0 1 0-7.18zM8 1a.5.5 0 0 1 .5.5v1.5a.5.5 0 0 1-1 0V1.5A.5.5 0 0 1 8 1zm0 12a.5.5 0 0 1 .5.5v1.5a.5.5 0 0 1-1 0v-1.5a.5.5 0 0 1 .5-.5zm6-6a.5.5 0 0 1 .5.5h1.5a.5.5 0 0 1 0 1H14.5a.5.5 0 0 1-.5-.5zm-12 0A.5.5 0 0 1 2 8H.5a.5.5 0 0 1 0-1H2a.5.5 0 0 1 .5.5zm9.396 5.106a.5.5 0 0 1 .708 0l1.06 1.06a.5.5 0 1 1-.708.708l-1.06-1.06a.5.5 0 0 1 0-.708zM3.146 3.854a.5.5 0 0 1 .708 0L4.914 5.56a.5.5 0 1 1-.708.708L3.146 4.562a.5.5 0 0 1 0-.708zm9.708 9.292a.5.5 0 0 1 .708 0L14.06 14.44a.5.5 0 0 1-.708.708l-1.06-1.06a.5.5 0 0 1 0-.708zM3.146 14.44a.5.5 0 0 1 0 .708l-1.06 1.06a.5.5 0 1 1-.708-.708l1.06-1.06a.5.5 0 0 1 .708 0z"/>
            </svg>`,

            moonIcon : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16">
            <path d="M14.53 11.29c.801-1.422.852-3.108.172-4.614-.679-1.506-1.946-2.578-3.465-2.932a.5.5 0 0 0-.568.271A5.023 5.023 0 0 0 9 9.75c0 1.01.374 1.93.973 2.628a.5.5 0 0 0 .567.274 5.538 5.538 0 0 0 4.257-2.064.5.5 0 0 0-.267-.79z"/>
            </svg>`,

            isDarkMode : JSON.parse(localStorage.getItem('darkMode')) ? true : false,
            // darkModeVal : ref(JSON.parse(localStorage.getItem('darkMode') ?? 'false')),
            styleProperties: {
                                '--background-color'  : this.darkModeVal ? '#000' : '#fff',
                                '--text-color'        : this.darkModeVal ? '#fff' : '#000'
                            },
        }
    },

    mounted() {
        this.usedData = this.loggedUserData;

        this.styleProperties = {
                                '--background-color'  : this.isDarkMode ? '#000' : '#fff',
                                '--text-color'        : this.isDarkMode ? '#fff' : '#000'
                            };

        this.applyStyles();
    },

    methods: {        
        toggleDarkMode: function() {
            localStorage.setItem('darkMode', JSON.stringify(!this.isDarkMode));

            this.isDarkMode = JSON.parse(localStorage.getItem('darkMode')) ? true : false;

            this.styleProperties = {
                                '--background-color'  : this.isDarkMode ? '#000' : '#fff',
                                '--text-color'        : this.isDarkMode ? '#fff' : '#000'
                            };

            this.applyStyles();            
        },

        applyStyles: function() {
            console.log("apply styles started.. darkmode; ", this.isDarkMode);

            var root = document.querySelector(':root');

            for(const [key, value] of Object.entries(this.styleProperties)) {
                root.style.setProperty(key, value);

                console.log("Setting props: Key: ", key, ' Val: ',  value);
            }

            console.log("apply styles completed");
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
