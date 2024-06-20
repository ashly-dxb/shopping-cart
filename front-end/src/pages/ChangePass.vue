<template>
    <div class='max-w-3xl bg-white flex flex-col px-5 m-auto my-2 border-0'>
        <div class="w-full flex border-0">
            <form v-on:submit.prevent="updatePassword">
                <div class="m-auto mb-3 mt-4 ml-2">
                    <h2 class='text-green-700 text-xl font-bold'>Change Password</h2>
                </div>

                <div class="m-auto mb-3 mt-4 ml-2  border-0">
                    <input
                        type="password"
                        placeholder="Enter New Password"
                        v-model="new_password"
                        class="border-x border-y border-solid border-gray-400 p-2 mt-2 w-full hover:border-green-500 focus:outline-blue-500"
                        />

                    <span v-if="this.errors.new_password" class="my-4 p-2 text-red-700">
                        {{this.errors.new_password}}
                    </span>

                    <input
                        type="password"
                        placeholder="Re-enter Password"
                        v-model="confirm_password"
                        class="border-x border-y border-solid border-gray-400 p-2 mt-2  w-full hover:border-green-500 focus:outline-blue-500"
                        />
                    
                    <span v-if="this.errors.confirm_password" class="my-4 p-2 text-red-700">
                        {{this.errors.confirm_password}}
                    </span>

                    <span v-if="serverError" class="p-2 my-2 border-x border-y border-solid border-red-300 text-red-700">
                        {{serverError}}
                    </span>

                    <div>
                        <button type="submit" class="p-2 m-2 ml-0">Update</button>
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
    name: 'ChangePassword',
    props: ['userId'],
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
        updatePassword(event) {
            event.preventDefault();

            this.showErrors = false;
            this.serverError = '';

            let new_password = this.new_password;
            let confirm_password = this.confirm_password;

            this.errors = {};
            let invalidForm = false;

            if(!new_password) {
                this.showErrors = true;
                this.errors.new_password = "Enter new password";
                invalidForm = true;
            }
            if(!confirm_password) {
                this.showErrors = true;
                this.errors.confirm_password = "Re-enter new password";
                invalidForm = true;
            }
            if(!invalidForm && new_password !== confirm_password) {
                this.showErrors = true;
                this.errors.confirm_password = "New password and Re-entered password donot match";
                invalidForm = true;
            }

            if(invalidForm){
                return false;
            }

            let doUpdatePassword = () => {
                let data = {
                    password: new_password,
                };

                const userID = this.userId;

                let loader = this.$loading.show({});

                axios.post(baseURL + `/users/change-password/${userID}`, data)
                    .then((response) => {
                        if(response.data.success) {
                            this.successMessage = 'Password changed successfully!';
                            // this.$router.push({path: '/'});
                        }
                        else {
                            // console.log(response.data.message);
                            this.showErrors = true;
                            this.serverError = response.data.message;
                        }

                        loader.hide();
                    })
                    .catch((errors) => {
                        // console.log("Error in pass change:", errors);
                        this.showErrors = true;
                        this.serverError = 'Some error occured!';
                        loader.hide();
                    })
            }

            doUpdatePassword();
        },
    },
}
</script>
