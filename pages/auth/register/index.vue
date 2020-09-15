<template>
  <div class="container mt-10">
    <div class="flex flex-col items-center">
      <h1 class="text-3xl text-gray-700 font-medium mb-6">Get snippeting.</h1>
      <form v-on:submit.prevent="submit" class="bg-white p-12 rounded w-8/12 mb-6">
        <div class="mb-6">
          <label for="email" class="block text-gray-600 font-medium mb-2"
                 :class="{'text-red-500' : validation.email}">
            Email Address
          </label>
          <input type="email" name="email" id="email"
                 class="border-2 border-gray-400 rounded block w-full p-3 "
                 :class="{'border-red-500' : validation.email}"
                 v-model="form.email"
                 v-on:keydown="delete validation.email"
          >
          <div class="text-red-500 mb-4 text-sm mt-1" v-if="validation.email">
            {{this.validation.email[0]}}
          </div>
        </div>
        <div class="flex flex-wrap lg:flex-no-wrap">
          <div class="lg:mr-6 w-full lg:w-6/12 mb-6">
            <label for="name" class="block text-gray-600 font-medium mb-2"
                   :class="{'text-red-500' : validation.name}">
              Name
            </label>
            <input type="text" name="name" id="name"
                   class="border-2 border-gray-400 rounded block w-full p-3 "
                   :class="{'border-red-500' : validation.name}"
                   v-model="form.name"
                   v-on:keydown="delete validation.name"
            >
            <div class="text-red-500 mb-4 text-sm mt-1" v-if="validation.name">
              {{this.validation.name[0]}}
            </div>
          </div>
          <div class="lg:mr-6 w-full lg:w-5/12 mb-6 ">
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
            <div class="text-red-500 mb-4 text-sm mt-1" v-if="validation.username">
              {{this.validation.username[0]}}
            </div>
          </div>
        </div>
        <div class="flex flex-wrap lg:flex-no-wrap ">
          <div class="lg:mr-6 w-full lg:w-6/12 mb-6">
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
          </div>
          <div class="lg:mr-6 w-full lg:w-5/12 mb-6">
            <label for="password" class="block text-gray-600 font-medium mb-2"
                   :class="{ 'text-red-500' : validation.password_confirmation}"
            >
              Password Confirm
            </label>
            <input type="password" name="password_confirmation" id="password_confirmation"
                   class="border-2 border-gray-400 rounded block w-full p-3"
                   :class="{ 'border-red-500' : validation.password_confirmation}"
                   v-model="form.password_confirmation"
                   v-on:keydown="delete validation.password_confirmation"
            >
            <div class="text-red-500 mb-4 text-sm mt-1" v-if="validation.password_confirmation">
              {{this.validation.password_confirmation[0]}}
            </div>
          </div>
        </div>
        <div class="">
          <button type="submit" class="bg-blue-500 text-white p-4 rounded font-medium block w-full">
            <i class="fa fa-user"></i>
            Register
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return {
      form : {
        email : null,
        password : null,
        username : null ,
        name : null,
        password_confirmation : null
      },
      validation : {

      }
    }
  },
  methods : {
    async submit(){
      let res = await this.$axios.$post('/auth/register',this.form).catch(error =>{
        window.alert('make sure that you writing right email and password')
        this.validation = error.response.data
        setTimeout(()=>{
          this.validation = ''
        },5000)
      })
      let res1 = await this.$auth.loginWith('local',{data : this.form}).then(r =>{
        this.$router.push('/')
      }).catch(error =>{
          console.log(error)
      })

    }
  },
  head : {
    title : 'Register | Snippets'
  }
}
</script>

<style scoped>

</style>
