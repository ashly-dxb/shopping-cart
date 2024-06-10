<template>
    <div @user-logged-out="getLoggedOutUserInfo">
        <NavBar key="123456" :userId="userId" :loggedIn="isLoggedIn"/>
        <router-view :userId="userId" class='pb-5 mt-5' @user-logged-in="getLoggedUserInfo" >
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
          userId: null,
          isLoggedIn: false,
        }
    },
    mounted: function () {
        this.created();
    },
    methods: {
        created: function () {
            this.userId = localStorage.getItem('userId');
            this.isLoggedIn = localStorage.getItem('userId') ? true : false; // dummy...need to correct
        },
        getLoggedUserInfo: function(data) {
            this.userId = data.user.userId;
            this.isLoggedIn = true;
        },
        getLoggedOutUserInfo: function(data) {

            console.log("in getLoggedOutUserInfo");
            this.userId = '';
            this.isLoggedIn = false;
        }
    }
}
</script>
