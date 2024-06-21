<template>
    <div class="bg-white px-5 my-2 flex border-0 border-green-300">
        <div class="w-0 lg:w-2/3 float-left">&nbsp;</div>

        <div class="w-full lg:w-1/3 float-right flex border-0 border-yellow-300">

            <div class="w-full border-0 border-red-300">
                <div class="bg-gray-600 text-white rounded-2xl shadow p-2 pb-8 border-0 border-orange-300">
                    
                    <form @submit.prevent="login">
                    <div class="m-auto mb-3 mt-4 ">
                        <h2 class="text-white text-xl font-semibold">Login</h2>
                    </div>

                    <div class="m-auto mb-3 mt-4 ">
                        <input
                            type="email"
                            placeholder="Email"
                            v-model="email"
                            v-validate="required"
                            class="text-black border-x border-y border-solid border-gray-400 p-2 my-2 w-full hover:border-green-500 focus:outline-blue-500"
                            />
                        <input
                            type="password"
                            placeholder="Password"
                            v-model="password"
                            v-validate="required"
                            class="text-black border-x border-y border-solid border-gray-400 p-2 my-2 w-full hover:border-green-500 focus:outline-blue-500"
                            />

                        <div v-if="showErrors" class="px-2 my-2 border-x border-y border-solid border-red-500 text-red-700">
                            {{errors}}
                        </div>

                        <button
                            type="submit"
                            class="border-x border-y border-solid border-gray-400 p-2 my-2 md:text-xl w-full">
                            Login
                        </button>

                        <div class="border-t-2 p-3 my-5 clearfix">
                            <div class="float-left">No account? <router-link to="/Register" class="text-white">Sign-up</router-link></div>
                            <div class="float-right">
                                <router-link to="/ForgotPassword" class="text-white">Forgot password?</router-link>
                            </div>
                        </div>

                    </div>
                    </form>

                </div>
            </div>

        </div>

        <loading v-model:active="visible" :is-full-page="fullPage" :loader="loader" :can-cancel="false" />
    </div>
</template>

<script>
import baseURL from "../components/Config";

export default {
    name: 'Login',

    components: {
        // Loading: VueLoading.Component
    },

    data() {
        return {
            email: 'test@gmail.com',
            password: 'abcd12345',
            showErrors: false,
            errors: null,

            fullPage: true,
            visible: false,
            loader: 'dots',
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
                this.errors = "Email is required";
                return false;
            }
            if(!password) {
                this.showErrors = true;
                this.errors = "Password is required";
                return false;
            }

            let doLogin = async() => {

                let loader = this.$loading.show({
                    loader: 'dots',
                    width: 50,
                    height: 50,
                    opacity: 0.5,
                });

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
                    if(data.authenticated) {
                        localStorage.setItem('username', data.user.username);
                        localStorage.setItem('userId', data.user.userId);

                        this.$emit("user-logged-in", data);
                        // this.$store.commit("loginSuccess", data.user); // store mutation
                        this.$store.dispatch("loginDone", data.user); // store action

                        if(this.$route.query.redirect) {
                            this.$router.push({path: this.$route.query.redirect});
                        }
                        else {
                            this.$router.push({path: '/products'});
                        }
                    }
                    else {
                        // console.log(data.error);
                        this.showErrors = true;
                        this.errors = data.error;
                    }
                    
                    loader.hide();
                })
                .catch(function(error) {
                    loader.hide();

                    // console.log(error);
                    this.showErrors = true;
                    this.errors = 'Some error occured!';
                });
            }

            doLogin();
        },
    },

}
</script>
