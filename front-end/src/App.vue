<template>
    <div >
        <NavBar :userId="userId" :loggedIn="isLoggedIn"  @user-logged-out="getLoggedOutUserInfo" />
        <router-view 
            :userId="userId"
            @user-logged-in="getLoggedInUserInfo" 
           
            class='pb-5 mt-5'
            >
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
        },
        
        getLoggedInUserInfo: function(data) {
            // console.log("emitted getLoggedInUserInfo");

            this.userId = data.user.userId;
            this.isLoggedIn = true;
        },

        getLoggedOutUserInfo: function() {
            // console.log("emitted getLoggedOutUserInfo");

            this.userId = '';
            this.isLoggedIn = false;
        }
    }
}
</script>
