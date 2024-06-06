<template>
    <div class='bg-green-300 m-auto border-2 border-red-400'>
        <NavBar />
        <router-view :user="user"></router-view>
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
        console.log("data() App.vue");
        return {
          user: null
        }
    },
    mounted: function () {
        console.log("mounted() App.vue");
        this.created();
    },
    methods: {
        created: function () {
            console.log("created() 1");
            const auth = getAuth();
            onAuthStateChanged(auth, user => {
                this.user = user;
                console.log("created() onAuthStateChanged", user);
            });
        }
    }
}
</script>
