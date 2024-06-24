<template>
    <div class="px-5 my-2 border-0 border-blue-600">
        <div class="w-full lg:w-1/3 flex border-0 border-green-600">
    
            <div class="w-full border-0 border-red-300">
                <div class="rounded-xl shadow p-2  border-x border-y border-r-1 border-gray-300">
                    <form v-on:submit.prevent="addProduct">
                        <div class="w-full m-auto mb-3 mt-4 border-0">
                            <h2 class='text-xl font-bold'>Add Product</h2>
                        </div>
    
                        <div class="w-full mb-3 mt-4 border-0 border-red-600 flex flex-wrap">
                            <input
                                type="text"
                                placeholder="Enter Product Name"
                                v-model="name"
                                class="border-x border-y border-solid border-gray-400 p-2 mt-2  w-full hover:border-green-500 focus:outline-blue-500"
                                />
    
                            <div v-if="this.errors.name" class="my-1  text-red-700">
                                {{this.errors.name}}
                            </div>
    
                            <input
                                type="text"
                                placeholder="Enter Price"
                                v-model="price"
                                class="border-x border-y border-solid border-gray-400 p-2 mt-2  w-full hover:border-green-500 focus:outline-blue-500"
                                />
    
                            <div v-if="this.errors.price" class="my-1  text-red-700">
                                {{this.errors.price}}
                            </div>
                                
                            <textarea
                                placeholder="Enter description"
                                rows="8"
                                v-model="description"
                                class="border-x border-y border-solid border-gray-400 p-2 mt-2  w-full hover:border-green-500 focus:outline-blue-500"
                                />
    
                            <div v-if="this.errors.description" class="my-1  text-red-700">
                                {{this.errors.description}}
                            </div>

                            <input type="file" accept="image/*" @change="imageChange" />

                            <div class="border-x border-y p-2">
                                <img v-if="imageUrl" :src="imageUrl" class="border-2 border-red-500" />
                            </div>
    
                            <div v-if="serverError" class="p-2 my-2 border-x border-y border-solid border-red-300 text-red-700">
                                {{serverError}}
                            </div>
    
                            <div class="w-full">
                                <button type="submit" class="p-2 m-2 ml-0">Add Product</button>
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
    import baseURL from "../../components/Config";
    
    export default {
        name: 'AddProduct',
        data() {
            return {
                showErrors: false,
                serverError: '',
                errors: {},
    
                fullPage: true,
                visible: false,
                loader: 'dots',

                imageData: null,
                imageUrl: null,                
            }
        },
        methods: {
            imageChange(e) {
                const imageFile = e.target.files[0];
               
                this.imageData = imageFile;
                this.imageUrl = URL.createObjectURL(imageFile);

                console.log("imageData: ", this.imageData);
                // console.log("imageUrl: ", this.imageUrl);
            },

            addProduct(e) {
                e.preventDefault();

                this.showErrors = false;
                this.serverError = '';

                let name = this.name;
                let price = this.price;
                let description = this.description;
                let imageData = this.imageData;

                this.errors = {};
                let invalidForm = false;
                
                if(!name) {
                    this.showErrors = true;
                    this.errors.name = "Name is required";
                    invalidForm = true;
                }
                if(!price) {
                    this.showErrors = true;
                    this.errors.price = "Price is required";
                    invalidForm = true;
                }
                if(!description) {
                    this.showErrors = true;
                    this.errors.description = "Description is required";
                    invalidForm = true;
                }
    
                if(invalidForm){
                    return false;
                }

                let doAddProduct = () => {
                    const formData = new FormData();
                    formData.append("name", name);
                    formData.append("price", price);
                    formData.append("description", description);
                    formData.set("uploadedfiles", imageData);
    
                    let loader = this.$loading.show({});
    
                    axios.post(baseURL + "/products/create", formData, {
                                                                    headers: {
                                                                        'Content-Type': 'multipart/form-data'
                                                                    }
                                                                })
                        .then((response) => {
                            if(response.data.success) {
                                this.$router.push({path: '/Admin/ProductList'});
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
    
                doAddProduct();
            },
        },
    }
    </script>
    