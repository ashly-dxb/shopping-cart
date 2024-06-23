<template>
<div class="px-5 my-2 border-0 border-blue-600">
    <div class="w-full lg:w-1/3 flex border-0 border-green-600">

        <div class="w-full border-0 border-red-300">
            <div class="rounded-xl shadow p-2  border-x border-y border-r-1 border-gray-300">
                <form v-on:submit.prevent="register">
                    <div class="w-full m-auto mb-3 mt-4 border-0">
                        <h2 class='text-xl font-bold'>Register</h2>
                    </div>

                    <div class="w-full mb-3 mt-4 border-0 border-red-600 flex flex-wrap">
                        <input
                            type="text"
                            placeholder="Enter your name"
                            v-model="username"
                            class="border-x border-y border-solid border-gray-400 p-2 mt-2  w-full hover:border-green-500 focus:outline-blue-500"
                            />

                        <div v-if="this.errors.username" class="my-1  text-red-700">
                            {{this.errors.username}}
                        </div>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            v-model="email"
                            class="border-x border-y border-solid border-gray-400 p-2 mt-2  w-full hover:border-green-500 focus:outline-blue-500"
                            />

                        <div v-if="this.errors.email" class="my-1  text-red-700">
                            {{this.errors.email}}
                        </div>
                            
                        <input
                            type="password"
                            placeholder="Enter password"
                            v-model="password"
                            class="border-x border-y border-solid border-gray-400 p-2 mt-2  w-full hover:border-green-500 focus:outline-blue-500"
                            />

                        <div v-if="this.errors.password" class="my-1  text-red-700">
                            {{this.errors.password}}
                        </div>

                        <div v-if="serverError" class="p-2 my-2 border-x border-y border-solid border-red-300 text-red-700">
                            {{serverError}}
                        </div>

                        <div class="w-full">
                            <button type="submit" class="p-2 m-2 ml-0">Register</button>
                        </div>

                        <div class="w-full border-t-2 p-3 my-5 clearfix">
                            <div class="float-left">Already have an account?</div>
                            <div class="float-right">
                                <router-link to="/Login" class="">Login</router-link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <loading v-model:active="visible" :is-full-page="fullPage" :loader="loader" :can-cancel="false" />

    </div>
</div>
</template>

<script>
import axios from 'axios'; 
import baseURL from "../components/Config";

export default {
    name: 'Register',
    data() {
        return {
            showErrors: false,
            serverError: '',
            errors: {},

            fullPage: true,
            visible: false,
            loader: 'dots',
        }
    },
    methods: {        
        register(e) {
            e.preventDefault();

            this.showErrors = false;
            this.serverError = '';

            let username = this.username;
            let email = this.email;
            let password = this.password;

            this.errors = {};
            let invalidForm = false;
            
            if(!username) {
                this.showErrors = true;
                this.errors.username = "Name is required";
                invalidForm = true;
            }
            if(!email) {
                this.showErrors = true;
                this.errors.email = "Email is required";
                invalidForm = true;
            }
            if(!password) {
                this.showErrors = true;
                this.errors.password = "Password is required";
                invalidForm = true;
            }

            if(invalidForm){
                return false;
            }

            let doRegister = () => {
                let data = {
                    username: username,
                    email: email,
                    password: password
                };

                let loader = this.$loading.show({});

                axios.post(baseURL + "/users/register", data)
                    .then((response) => {
                        if(response.data.success) {
                            this.$router.push({path: '/Login'});
                        }
                        else {
                            this.showErrors = true;
                            this.serverError = response.data.message;
                        }

                        loader.hide();
                    })
                    .catch((errors) => {
                        this.showErrors = true;
                        this.serverError = 'An error occured!';

                        loader.hide();
                    })
            }

            doRegister();
        },
    },
}
</script>
