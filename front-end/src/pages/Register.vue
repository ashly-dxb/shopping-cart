<template>
<div class="bg-white px-5 my-2 border-2">
    <div class="lg:w-2/6 flex">
        <form v-on:submit.prevent="register">
            <div class="m-auto mb-3 mt-4 ml-2">
                <h2 class='text-green-700 text-2xl font-bold'>Register</h2>
            </div>

            <div class="m-auto mb-3 mt-4 ml-2">
                <input
                    type="text"
                    placeholder="Enter your name"
                    v-model="username"
                    class="border-x border-y border-solid border-gray-400 p-2 mt-2  w-full hover:border-green-500 focus:outline-blue-500"
                    />
                <div v-if="this.errors.username" class="p-2 bg-red-200 text-red-700">
                    {{this.errors.username}}
                </div>

                <input
                    type="email"
                    placeholder="Enter your email"
                    v-model="email"
                    class="border-x border-y border-solid border-gray-400 p-2 mt-2  w-full hover:border-green-500 focus:outline-blue-500"
                    />
                <div v-if="this.errors.email" class="p-2 bg-red-200 text-red-700">
                    {{this.errors.email}}
                </div>
                    
                <input
                    type="password"
                    placeholder="Enter password"
                    v-model="password"
                    class="border-x border-y border-solid border-gray-400 p-2 mt-2  w-full hover:border-green-500 focus:outline-blue-500"
                    />

                <div v-if="this.errors.password" class="p-2 bg-red-200 text-red-700">
                    {{this.errors.password}}
                </div>

                <div v-if="serverError" class="p-2 my-2 border-x border-y border-solid border-red-300 text-red-600">
                    {{serverError}}
                </div>

                <button type="submit" class="p-2 m-2 ml-0">Register</button>

                <div class="border-t-2 p-3 my-5 clearfix">
                    <div class="float-left">Already have an account?</div>
                    <div class="float-right">
                        <router-link to="/Login" class="text-blue-800">Login</router-link>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import axios from 'axios'; 
import baseURL from "../components/Config";

export default {
    name: 'Register',
    components: {
    },
    data() {
        return {
            showErrors: false,
            serverError: '',
            errors: {}
        }
    },
    methods: {
        created: async function () {
            // const response = await axios.get(baseURL + 'xxx/yyy');
            // this.products = response.data;
        },

        register(e) {
            e.preventDefault();

            this.showErrors = false;
            this.serverError = '';

            let username = this.username;
            let email = this.email;
            let password = this.password;

            this.errors = {}

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

                axios.post(baseURL + "/users/register", data)
                    .then((response) => {
                        console.log("ZZZ", response);

                        if(response.data.success) {
                            console.log("Registered successfully");
                            this.$router.push({path: '/Login'});
                        }
                        else {
                            console.log(response.data.message);
                            this.showErrors = true;
                            this.serverError = response.data.message;
                        }
                    })
                    .catch((errors) => {
                        console.log("Error in registering user:", errors);
                        this.showErrors = true;
                        this.serverError = 'An error occured!';
                    })
            }

            doRegister();
        },
    },
}
</script>
