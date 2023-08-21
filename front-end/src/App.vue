<template>
    <NavBar />
    <div class="page-wrap">
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

    data() {
        return {
          user: null
        }
    },

    mounted: function () {
        console.log("mounted VUE");

        this.created();        
    },
    
    methods: {
        created: function () {
            console.log("createed 1");
            const auth = getAuth();
            console.log("createed 2");
            onAuthStateChanged(auth, user => {
                this.user = user;
                console.log("createed 3");
            });
        }
    }
}

</script>
