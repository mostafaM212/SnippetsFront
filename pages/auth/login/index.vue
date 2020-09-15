<template>
  <div class="container mt-10">
   <div class="flex flex-col items-center">
<!--     <div class="alert alert-danger" v-if="validation.length !== 0">-->
<!--       <li>there are some thing wrong</li>-->
<!--     </div>-->
     <h1 class="text-3xl text-gray-700 font-medium mb-6">Hello</h1>
     <form v-on:submit.prevent="submit" class="bg-white p-8 rounded w-4/12 mb-6">
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
       </div>
       <div class="">
         <button type="submit" class="bg-blue-500 text-white p-4 rounded font-medium block w-full">Login</button>
       </div>

     </form>
     <div class="">
       No account ?
       <nuxt-link :to="{name : 'auth-register'}">register</nuxt-link>
     </div>
     <div class="">
       Forget your Password ?
       <nuxt-link :to="{name : 'auth-forget'}">Forget</nuxt-link>
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
          email : null,
          password : null
        },
        validation : {

        }
      }
  },
  methods : {
    async submit(){

      let res = await this.$auth.loginWith('local',{data : this.form}).then(res =>{
        this.$router.push('/')
      }).catch(error =>{
        window.alert('make sure that you writing right email and password')
        this.validation = error.response.data
        setTimeout(()=>{
          this.validation = ''
        },5000)

      })

    }
  },
  head : {
    title : 'Login Page'
  }
}
</script>

<style scoped>

</style>
