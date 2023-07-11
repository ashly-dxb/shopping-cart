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
        this.created();
    },
    
    methods: {
        created: async function () {
            const auth = getAuth();
            await onAuthStateChanged(auth, user => {
                this.user = user;
            });
        }
    }
}

</script>
