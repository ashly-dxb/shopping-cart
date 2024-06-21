<template>
  <div class='max-w-3xl flex flex-col px-5 m-auto my-2 border-0'>
    <div class="w-full m-auto mb-3 mt-4 ml-2">
      <h2 class='xxxxx text-xl font-bold'>Profile</h2>
    </div>

    <div class="w-full m-auto mb-3 mt-4 ml-2 border-0 border-yellow-300">
      <div className="flex flex-row flex-wrap m-auto mr-3 mb-4 border-b-2 border-0 border-gray-300">
        <div className=" w-1/2 md:w-1/2 lg:w-1/3 mr-1 font-bold">User Id</div>
        <div className=" w-1/2 md:w-1/2 lg:w-1/3 mr-1 " v-if="$store.state.auth.userObj !== null">{{ $store.state.auth.userObj.userId }}</div>
      </div>

      <div className="flex flex-row flex-wrap m-auto mr-3 mb-4 border-b-2 border-0 border-gray-300">
        <div className="w-1/2 md:w-1/2 lg:w-1/3 mr-1 font-bold">User name</div>
        <div className="w-1/2 md:w-1/2 lg:w-1/3 mr-1 " v-if="$store.state.auth.userObj !== null">{{ $store.state.auth.userObj.username }}</div>
      </div>

      <div className="flex flex-row flex-wrap m-auto mr-3 mb-4 border-b-2 border-0 border-gray-300">
        <div className="w-1/2 md:w-1/2 lg:w-1/3 mr-1 font-bold">Email</div>
        <div className="w-1/2 md:w-1/2 lg:w-1/3 mr-1 " v-if="$store.state.auth.userObj !== null">{{ $store.state.auth.userObj.email }}</div>
      </div>

      <div className="flex flex-row flex-wrap m-auto mr-3 mb-4 border-b-2 border-0 border-gray-300">
        <div className="w-1/2 md:w-1/2 lg:w-1/3 mr-1 font-bold">Token</div>
        <div className="w-1/2 md:w-1/2 lg:w-1/3 mr-1 " v-if="$store.state.auth.userObj !== null">{{$store.state.auth.userObj.password.substring(0, 20)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      // console.log("currentUser:::", this.$store.state.auth.userObj);
      return this.$store.state.auth.userObj;
    }
  },
  mounted() {
    if(!this.currentUser) {
      this.$router.push('/Login');
    }
  }
};
</script>
