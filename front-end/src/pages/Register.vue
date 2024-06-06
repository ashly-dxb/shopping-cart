<template>
    <div class="flex flex-col m-auto max-w-2xl border-2">
        <form v-on:submit.prevent="register">
            <div class="m-auto mb-3 mt-4">
                <h2 class="text-2xl">Register</h2>
            </div>

            <div class="m-auto mb-3 mt-4">
                <input
                    type="text"
                    placeholder="Enter your name"
                    v-model="username"
                    class="border-2 border-solid border-gray-400 p-2 m-2 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
                    />
                <div v-if="this.errors.username" class="p-4 my-4 flex space-x-4 bg-red-300 text-red-700">
                    {{this.errors.username}}
                </div>

                <input
                    type="email"
                    placeholder="Enter your email"
                    v-model="email"
                    class="border-2 border-solid border-gray-400 p-2 m-2 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
                    />
                <div v-if="this.errors.email" class="p-4 my-4 flex space-x-4 bg-red-300 text-red-700">
                    {{this.errors.email}}
                </div>
                    
                <input
                    type="password"
                    placeholder="Enter password"
                    v-model="password"
                    class="border-2 border-solid border-gray-400 p-2 m-2 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
                    />

                <div v-if="this.errors.password" class="p-4 my-4 flex space-x-4 bg-red-300 text-red-700">
                    {{this.errors.password}}
                </div>

                <button type="submit">Register</button>
            </div>
        </form> 
    </div>
</template>

<script>
// import ProductList from '../components/ProductList.vue'
import axios from 'axios'; 
// import VueRouter from 'vue-router';
// import router from '../router';

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
            // const response = await axios.get('/api/products');
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

                axios.post("/api/register", data)
                    .then((response) => {
                        console.log("Registered successfully");
                        router.push("/Login");
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

