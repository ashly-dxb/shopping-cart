<template>
    <div class="max-w-3xl bg-white flex flex-col px-5 m-auto my-2 border-2">
        <form v-on:submit.prevent="register">
            <div class="m-auto mb-3 mt-4">
                <h2 class='text-green-700 text-xl font-bold'>Register</h2>
            </div>

            <div class="m-auto mb-3 mt-4">
                <input
                    type="text"
                    placeholder="Enter your name"
                    v-model="username"
                    class="border-x border-y border-solid border-gray-400 p-2 m-2 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
                    />
                <span v-if="this.errors.username" class="p-2 my-4 bg-red-300 text-red-700">
                    {{this.errors.username}}
                </span>

                <input
                    type="email"
                    placeholder="Enter your email"
                    v-model="email"
                    class="border-x border-y border-solid border-gray-400 p-2 m-2 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
                    />
                <span v-if="this.errors.email" class="p-2 my-4 bg-red-300 text-red-700">
                    {{this.errors.email}}
                </span>
                    
                <input
                    type="password"
                    placeholder="Enter password"
                    v-model="password"
                    class="border-x border-y border-solid border-gray-400 p-2 m-2 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
                    />

                <span v-if="this.errors.password" class="p-2 my-4 bg-red-300 text-red-700">
                    {{this.errors.password}}
                </span>

                <div class="p-2">
                    <button type="submit" class="login-button">Register</button>
                </div>
            </div>
        </form> 
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

            let username = this.username;
            let email = this.email;
            let password = this.password;

            this.errors = {}

            let invalidForm = false;
            
            if(!username) {
                this.showErrors = true;
                this.errors.username = "Username is mandatory";
                invalidForm = true;
            }
            if(!email) {
                this.showErrors = true;
                this.errors.email = "Email is mandatory";
                invalidForm = true;
            }
            if(!password) {
                this.showErrors = true;
                this.errors.password = "Password is mandatory";
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
                        console.log("Registered successfully");
                        // router.push("/Login");
                        this.$router.push({path: '/Login'});
                    })
                    .catch((errors) => {
                        console.log("Error in registartion:", errors);
                    })
            }

            doRegister();
        },
    },
}
</script>
