<template>
    <div class="bg-white px-5 my-2 border-2 flex">
        <div class="lg:w-4/6 float-left">&nbsp;</div>

        <div class="lg:w-2/6 float-right flex">
            <form @submit.prevent="login">
                <div class="m-auto mb-3 mt-4 ml-2">
                    <h2 class="text-green-700 text-xl font-bold">Login</h2>
                </div>

                <div class="m-auto mb-3 mt-4 ml-2">
                    <input
                        type="email"
                        placeholder="Email"
                        v-model="email"
                        v-validate="required"
                        class="border-x border-y border-solid border-gray-400 p-2 my-2 w-full hover:border-green-500 focus:outline-blue-500"
                        />
                    <input
                        type="password"
                        placeholder="Password"
                        v-model="password"
                        v-validate="required"
                        class="border-x border-y border-solid border-gray-400 p-2 my-2 w-full hover:border-green-500 focus:outline-blue-500"
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
                        <div class="float-left">No account? <router-link to="/Register" class="text-blue-800">Sign-up</router-link></div>
                        <div class="float-right">
                            <router-link to="/ForgotPassword" class="text-blue-800">Forgot password?</router-link>
                        </div>
                    </div>

                </div>
            </form>

            <loading v-model:active="visible" :is-full-page="fullPage" :loader="loader" :can-cancel="false" />

        </div>
    </div>
</template>

<script>
import baseURL from "../components/Config";

// import VueLoading from 'vue-loading-overlay';
// import 'vue-loading-overlay/dist/css/index.css';

export default {
    name: 'Login',

    components: {
        // Loading: VueLoading.Component
    },

    data() {
        return {
            email: 'ashlythomas@gmail.com',
            password: 'abcd1234',
            showErrors: false,
            errors: null,
            // router : useRouter(),

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

                let loader = this.$loading.show({});

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

                    // setTimeout(() => loader.hide(), 3 * 1000);

                    if(data.authenticated) {
                        localStorage.setItem('token', '123456789');
                        localStorage.setItem('username', data.user.username);
                        localStorage.setItem('userId', data.user.userId);

                        this.$emit("user-logged-in", data);
                        // this.$store.commit("loginSuccess", data.user); // store mutation
                        this.$store.dispatch("loginDone", data.user); // store action

                        if(this.$route.query.redirect) {
                            this.$router.push(this.$route.query.redirect);
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
