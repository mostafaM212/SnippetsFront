<template>
  <div class="bg-white py-8 lg:py-0 flex items-center">
    <div class="container flex flex-wrap items-center lg:flex-no-wrap">
      <nuxt-link :to="{ name : 'index'}"
                 class="mr-10 flex-shrink-0"
                 >
        <img src="~/assets/snippetsicon.jpg" alt="logo" class="h-20" title="snippts.com">
      </nuxt-link>
      <a href="#"
         class="lg:hidden ml-auto flex flex-col relative w-8 h-8 "
      v-on:click.prevent="mobileNavOpen = !mobileNavOpen">
        <span class="bg-blue-500 h-1 w-8 rounded mb-1 justify-center"
              :class="{
                'rotate-45 absolute right-0' : mobileNavOpen
              }"
        ></span>
        <span class="bg-blue-500 h-1 w-8 rounded mb-1 justify-center"
              :class="{
                '-rotate-45 absolute right-0' : mobileNavOpen
              }"
        ></span>
        <span class="bg-blue-500 h-1 w-8 rounded mb-1 justify-center"
              :class="{
                'hidden' : mobileNavOpen
              }"
        ></span>

      </a>
      <div class="row  w-full lg:w-auto flex "
           :class="{
            'hidden lg:flex' : !mobileNavOpen
           }"
      >
        <ul class="lg:h-5 lg:flex items-center lg:w-auto ml-auto mr-20">
          <li>
            <nuxt-link :to="{name :'browse'}"
                       class="text-gray-700 text-lg lg:py-8 lg:px-3"
            >Browse</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{name :'search'}"
                       class="text-gray-700 text-lg lg:py-8 lg:px-3"
            >Search</nuxt-link>
          </li>

        </ul>
        <ul class="lg:h-5 lg:flex w-full items-center ml-50 text-right lg:w-auto" style="margin-left: 400px" >
          <template v-if="this.$auth.loggedIn" >
            <li>
              <nuxt-link :to="{name :'dashboard'}"
                         class="text-gray-700 text-lg lg:py-8 lg:px-3 "
              >Dashboard</nuxt-link>
            </li>
            <li class="mr-2">
              <nuxt-link :to="{name :'account'}"
                         class="text-gray-700   "
                         :class="{
                          'lg:py-8 lg:px-3' : !username,
                          'myFont' : username
                         }"

              >{{ this.$auth.user.name }}</nuxt-link>
            </li>
            <li>
              <a href="#" v-on:click.prevent="logout"
                         class="text-gray-700 text-lg lg:py-8 lg:px-3  "
              >Sign out</a>
            </li>
          </template>
          <template v-else>
            <li>
              <nuxt-link :to="{name :'auth-login'}"
                         class="text-lg text-gray-700  lg:py-8 lg:px-3 "
              >Sign in</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="{name :'auth-register'}"
                         class="text-gray-700 text-lg lg:py-8 lg:px-3  "
              >Register</nuxt-link>
            </li>

          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
name: "Navigation",
  data(){
  return{
    mobileNavOpen : false
  }
  },
  methods : {
    async logout(){
      this.$auth.logout().then(res =>{
        this.$router.push('/')
      }).catch(error =>{
        console.log(error)
      })
    },
    username(){
      if (this.$auth.user.name.lenght > 8){
        return true
      }
      return false
    }
  },
  head : {
  title : 'Search | Snippets'
  }
}
</script>

<style scoped>
  .myFont{
    font-max-size: 5px;
    font-min-size: 3px;
    padding: 0;

    font-size: small;

  }
</style>
