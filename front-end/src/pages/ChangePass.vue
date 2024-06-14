<template>
<div class="bg-white px-5 my-2 border-2">
    <div class="lg:w-2/6 flex">
        <form v-on:submit.prevent="updatePassword">
            <div class="m-auto mb-3 mt-4 ml-2">
                <h2 class='text-green-700 text-2xl font-bold'>Change Password</h2>
            </div>

            <div class="m-auto mb-3 mt-4 ml-2">
                <input
                    type="password"
                    placeholder="Enter New Password"
                    v-model="new_password"
                    class="border-x border-y border-solid border-gray-400 p-2 mt-2  w-full hover:border-green-500 focus:outline-blue-500"
                    />

                <input
                    type="password"
                    placeholder="Re-enter Password"
                    v-model="confirm_password"
                    class="border-x border-y border-solid border-gray-400 p-2 mt-2  w-full hover:border-green-500 focus:outline-blue-500"
                    />

                <div v-if="serverError" class="p-2 my-2 border-x border-y border-solid border-red-300 text-red-600">
                    {{serverError}}
                </div>

                <button type="submit" class="p-2 m-2 ml-0">Update</button>
                
            </div>
        </form>
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
            errors: {}
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

            if(invalidForm){
                return false;
            }

            let doUpdatePassword = () => {
                let data = {
                    password: new_password,
                };

                const userID = this.userId;

                axios.post(baseURL + `/users/change-password/${userID}`, data)
                    .then((response) => {
                        console.log("change-password :::", response);

                        if(response.data.success) {
                            console.log("Password changed ");
                            this.successMessage = 'Password changed successfully!';

                            // this.$router.push({path: '/'});
                        }
                        else {
                            console.log(response.data.message);
                            this.showErrors = true;
                            this.serverError = response.data.message;
                        }
                    })
                    .catch((errors) => {
                        console.log("Error in pass change:", errors);
                        this.showErrors = true;
                        this.serverError = 'Some error occured!';
                    })
            }

            doUpdatePassword();
        },
    },
}
</script>
