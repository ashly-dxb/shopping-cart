<template>
    <div class="flex bg-white px-5 my-2 border-2">
        <div class="lg:w-4/6 float-left">&nbsp;</div>

        <div class="lg:w-2/6 float-right flex">
            <form @submit.prevent="login">
                <div class="my-2 ">
                    <h2 class="text-green-700 md:text-2xl font-bold">Login</h2>
                </div>

                <div class="m-auto mb-3 mt-4">
                    <input
                        type="email"
                        placeholder="Email"
                        v-model="email"
                        v-validate="'required'"
                        class="border-x border-y border-solid border-gray-400 p-2 my-2 w-full hover:border-green-500 focus:outline-blue-500"
                        />
                    <input
                        type="password"
                        placeholder="Password"
                        v-model="password"
                        v-validate="'required'"
                        class="border-x border-y border-solid border-gray-400 p-2 my-2 w-full hover:border-green-500 focus:outline-blue-500"
                        />

                    <div v-if="showErrors" class="p-2 my-2 bg-red-300 text-red-600">
                        {{errors}}
                    </div>

                    <button 
                        type="submit" 
                        class="border-x border-y border-solid border-gray-400 p-2 my-2 md:text-xl w-full">
                        Login
                    </button>

                    
                </div>
            </form>

        </div>
    </div>
</template>

<script>
// import axios from 'axios';
import baseURL from "../components/Config";
// import { useRouter, useRoute } from 'vue-router'

export default {
    name: 'Login',
    data() {
        return {
            email: 'ashlythomas@gmail.com',
            showErrors: false,
            errors: null,
            // router : useRouter()
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

            let doLogin = async() => {
                let data = {
                    email: email,
                    password: password
                };

                fetch(baseURL + "/users/login", {
                    method: 'POST',
                    credentials: 'include', /* very important for the cookies to be set from the server*/
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    localStorage.setItem('token', '123456789');
                    localStorage.setItem('username', data.user.username);
                    localStorage.setItem('userId', data.user.userId);
                    this.$emit("user-logged-in", data);

                    if(this.$route.query.redirect) {
                        this.$router.push(this.$route.query.redirect);
                    }
                    else {
                        this.$router.push({path: '/products'});
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
            }

            doLogin();
        },
    },

}
</script>
