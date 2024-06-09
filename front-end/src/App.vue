<template>
    <div>
        <NavBar key="123456" :user="user" :loggedIn="isLoggedIn"/>
        <router-view :user="user" class='pb-5 mt-5' @user-logged-in="getLoggedUserInfo">
            
        </router-view>
    </div>
</template>

<script>
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
import NavBar from '@/components/NavBar.vue';

export default {
    name: 'App',
    components: {
        NavBar,
    },
    data: function () {
        return {
          user: null,
          isLoggedIn: false,
        }
    },
    mounted: function () {
        this.created();
    },
    methods: {
        created: function () {
            this.user = localStorage.getItem('username');
            this.isLoggedIn = true; // dummy...need to correct
        },
        getLoggedUserInfo: function(data) {
            this.user = data.user.username;
            this.isLoggedIn = true;
        }
    }
}
</script>
