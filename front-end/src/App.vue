<template>
    <div class='bg-gray-300'>
        <NavBar />
        <router-view :user="user" class='pb-5 mt-5'></router-view>
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import NavBar from '@/components/NavBar.vue';

export default {
    name: 'App',
    components: {
        NavBar,
    },
    data: function () {
        // console.log("data() App.vue");
        return {
          user: null
        }
    },
    mounted: function () {
        // console.log("mounted() App.vue");
        this.created();
    },
    methods: {
        created: function () {
            // console.log("created() 1");
            const auth = getAuth();
            onAuthStateChanged(auth, user => {
                this.user = user;
                // console.log("created() onAuthStateChanged", user);
            });
        }
    }
}
</script>
