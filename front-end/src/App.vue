<template>
    <div>
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
import NavBar from '@/components/NavBar.vue';
import {mapState, mapGetters} from 'vuex';

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

    computed: {
        ...mapGetters(['getIsUserLoggedIn']),
    },

    mounted: function() {
        // console.log("APP MOUNT loggedIn :::", this.getIsUserLoggedIn);
        this.isLoggedIn = this.getIsUserLoggedIn;
    },

    methods: {
        getLoggedInUserInfo: function(data) {
            this.userId = data.user.userId;
            this.isLoggedIn = true;
        },

        getLoggedOutUserInfo: function() {
            this.userId = '';
            this.isLoggedIn = false;
        }
    }
}
</script>
