<template>
    <div class='max-w-3xl px-5 m-auto my-2 border-0'>
        <div class="w-full flex-row border-0">
            <div class="m-auto mb-3 mt-4">
                <h3 class='xxxxx text-xl font-bold'>Home</h3>
            </div>

            <div class="m-auto mb-3 mt-4 border-0">
                Welcome {{ usedData ? usedData.username : '..' }}
                <br />
                <i>{{ isUserLoggedIn ? 'LoggedIn' : 'NotLoggedIn' }}</i>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import {mapState, mapGetters} from 'vuex';

export default {
    name: 'Home',    
    data() {
        return {
            error: '',
            usedData: null,
            isUserLoggedIn: false,
            userObj : {},           
        }
    },
    computed: {
        ...mapState(['userObj', 'status']),
        ...mapGetters(['getLoggedUserInfo', 'getIsUserLoggedIn']),

        // ...mapState({
        //     user: (state) => state.userObj
        // }),

        // ...mapGetters({
        //     loggedUserData: 'getLoggedUserInfo'
        // }),
    },
    mounted() {
        console.log("HOME MOUNT:::", this.getIsUserLoggedIn);
        // this.usedData = this.loggedUserData;
        this.usedData = this.getLoggedUserInfo;
        this.isUserLoggedIn = this.getIsUserLoggedIn;
    },
}
</script>
