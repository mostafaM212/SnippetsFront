<template>
  <div class="container mt-10">
    <div class="flex flex-col items-center">
      <!--     <div class="alert alert-danger" v-if="validation.length !== 0">-->
      <!--       <li>there are some thing wrong</li>-->
      <!--     </div>-->
      <h1 class="text-3xl text-gray-700 font-medium mb-10">
        {{ this.$auth.user.name }}
      </h1>
      <div class="w-full md:w-6/12 lg:w-6/12 mb-6">
        <form v-on:submit.prevent="submit" class="mb-6">
          <div class="mb-6">
            <label for="email" class="block text-gray-600 font-medium mb-2"
                   :class="{'text-red-500' : validation.email}">
              Email Address
            </label>
            <input type="text" name="email" id="email"
                   class="border-2 border-gray-400 rounded block w-full p-3 "
                   :class="{'border-red-500' : validation.email}"
                   v-model="form.email"
                   v-on:keydown="delete validation.email"
            >
          </div>
          <div class="text-red-500 mb-4 text-sm mt-1" v-if="validation.email">
            {{this.validation.email[0]}}
          </div>
          <div class="mb-6">
            <label for="password" class="block text-gray-600 font-medium mb-2"
                   :class="{ 'text-red-500' : validation.password}"
            >
              Password
            </label>
            <input type="password" name="password" id="password"
                   class="border-2 border-gray-400 rounded block w-full p-3"
                   :class="{ 'border-red-500' : validation.password}"
                   v-model="form.password"
                   v-on:keydown="delete validation.password"
            >
            <div class="text-red-500 mb-4 text-sm mt-1" v-if="validation.password">
              {{this.validation.password[0]}}
            </div>
            <div class="text-sm text-gray-500">
              Leave Punk to keep the same
              it must have 6 characters
            </div>
          </div>
          <div class="mb-6">
            <label for="email" class="block text-gray-600 font-medium mb-2"
                   :class="{'text-red-500' : validation.name}">
              name
            </label>
            <input type="text" name="name" id="name"
                   class="border-2 border-gray-400 rounded block w-full p-3 "
                   :class="{'border-red-500' : validation.name}"
                   v-model="form.name"
                   v-on:keydown="delete validation.name"
            >
          </div>
          <div class="text-red-500 mb-4 text-sm mt-1" v-if="validation.name">
            {{this.validation.name[0]}}
          </div>
          <div class="mb-6">
            <label for="username" class="block text-gray-600 font-medium mb-2"
                   :class="{'text-red-500' : validation.username}">
              Username
            </label>
            <input type="text" name="username" id="username"
                   class="border-2 border-gray-400 rounded block w-full p-3 "
                   :class="{'border-red-500' : validation.username}"
                   v-model="form.username"
                   v-on:keydown="delete validation.username"
            >
          </div>
          <div class="text-red-500 mb-4 text-sm mt-1" v-if="validation.username">
            {{this.validation.username[0]}}
          </div>
          <div class="">
            <button type="submit" class="bg-blue-500 text-white p-4 rounded font-medium block ">
              Update
            </button>
          </div>

        </form>
        <div class="">
          <nuxt-link :to="{ name : 'author-id' , params : { id : this.$auth.user.username}}" href="" class="">View your public profile</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return {
      form : {
        email : this.$auth.user.email,
        password : null,
        name : this.$auth.user.name,
        username : this.$auth.user.username
      },
      validation : {

      }
    }
  },
  methods : {
    async submit(){

      let res = await this.$axios.$put('/user/'+this.$auth.user.username,this.form).catch(error =>{
        window.alert('make sure that you writing data in right way')
        this.validation = error.response.data
        setTimeout(()=>{
          this.validation = ''
        },10000)

      })
      await this.$auth.fetchUser(res.data)

    }
  },
  head : {
    title : 'Edit account | Snippets'
  },
  middleware : ['authMiddleware']
}
</script>

<style scoped>

</style>
