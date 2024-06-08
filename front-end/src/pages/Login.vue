<template>
    <div class="max-w-3xl bg-white flex flex-col px-5 m-auto my-2 border-2">
        <form @submit.prevent="login">
            <div class="m-auto mb-3 mt-4">
                <h2 class='text-green-700 text-xl font-bold'>Login</h2>
            </div>

            <div class="m-auto mb-3 mt-4">
                <input
                    type="email"
                    placeholder="Email"
                    v-model="email"
                    class="border-2 border-solid border-gray-400 p-2 m-2 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
                    />
                <input
                    type="password"
                    placeholder="Password"
                    v-model="password"
                    class="border-2 border-solid border-gray-400 p-2 m-2 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
                    />

                <div v-if="showErrors" class="p-4 my-4 flex space-x-4 bg-red-300 text-red-700">
                    {{errors}}
                </div>

                <button type="submit" class="login-button">Login</button>
            </div>
        </form> 
    </div>
</template>

<script>
// import ProductList from '../components/ProductList.vue'
import axios from 'axios';
import baseURL from "../components/Config";
import { useRouter, useRoute } from 'vue-router'

export default {
    name: 'Login',
    components: {
        // ProductList,
    },
    data() {
        return {
            showErrors: false,
            errors: null,
            router : useRouter()
        }
    },
    mounted: function () {
        this.created();
    },
    methods: {
        created: async function () {
        },

        login(e) {    
            e.preventDefault();

            let email = this.email;
            let password = this.password;

            if(!email) {
                this.showErrors = true;
                this.errors = "Email is mandatory";
                return false;
            }
            if(!password) {
                this.showErrors = true;
                this.errors = "Password is mandatory";
                return false;
            }

            let doLogin = () => {
                let data = {
                    email: email,
                    password: password
                };

                axios.post(baseURL + "/users/login", data)
                    .then((response) => {
                        console.log("Logged in successfully");
                        // router.push("/");
                    })
                    .catch((errors) => {
                        console.log("Error in log in:", errors);
                    })
            }

            doLogin();
        },
    },

}
</script>
