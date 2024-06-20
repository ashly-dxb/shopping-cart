<template>
<div class="bg-white px-5 my-2 border-0">
    <div class="w-full lg:w-2/5 flex">
        <form v-on:submit.prevent="sendLink">
            <div class="m-auto mb-3 mt-4 ml-2">
                <h2 class='text-green-700 text-xl font-bold'>Forgot Password</h2>
            </div>

            <div class="w-full m-auto mb-3 mt-4 ml-2">
                <input
                    type="email"
                    placeholder="Enter your email"
                    v-model="email"
                    class="border-x border-y border-solid border-gray-400 p-2 my-2 w-full hover:border-green-500 focus:outline-blue-500"
                    />

                <div v-if="this.errors.email" class="my-1 border-x border-y border-solid border-red-300 text-red-700">
                    {{this.errors.email}}
                </div>

                <div v-if="serverError" class="p-2 my-2 border-x border-y border-solid border-red-300 text-red-700">
                    {{serverError}}
                </div>

                <div class="w-full">
                    <button type="submit" class="p-2 m-2 ml-0">Send Password Reset Link</button>
                </div>

                <div v-if="successMessage" class="p-2 my-2 border-x border-y border-solid border-green-300 text-green-700">
                    {{successMessage}}
                </div>

            </div>
        </form>

        <loading v-model:active="visible" :is-full-page="fullPage" :loader="loader" :can-cancel="false" />
    </div>
</div>
</template>

<script>
import axios from 'axios'; 
import baseURL from "../components/Config";

export default {
    name: 'ForgotPassword',
    data() {
        return {
            showErrors: false,
            serverError: '',
            errors: {},
            successMessage: '',

            fullPage: true,
            visible: false,
            loader: 'dots',
        }
    },
    methods: {
        sendLink(e) {
            e.preventDefault();

            this.showErrors = false;
            this.serverError = '';

            let email = this.email;

            this.errors = {};
            let invalidForm = false;

            if(!email) {
                this.showErrors = true;
                this.errors.email = "Email is required";
                invalidForm = true;
            }

            if(invalidForm){
                return false;
            }

            let doSendLink = () => {
                let data = {
                    email: email,
                };

                let loader = this.$loading.show({});

                axios.post(baseURL + "/users/forgot-password", data)
                .then((response) => {
                    // console.log("forgot-password:::", response);

                    if(response.data.success) {
                        // console.log("Sent mail successfully");
                        // this.$router.push({path: '/Login'});
                        this.successMessage = 'Email sent. Please follow the link in the email to reset password!';
                    }
                    else {
                        // console.log(response.data.message);
                        this.showErrors = true;
                        this.serverError = response.data.message;
                    }

                    loader.hide();
                })
                .catch((errors) => {
                    // console.log("Error in send mail:", errors);
                    this.showErrors = true;
                    this.serverError = 'Some error occured!';

                    loader.hide();
                })
            }

            doSendLink();
        },
    },
}
</script>
