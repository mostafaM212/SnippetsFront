<template>
  <div class="container mt-10">
    <div class="flex flex-col items-center">
      <h1 class="text-3xl text-gray-700 font-medium mb-6">Sending Password to you</h1>
      <form v-on:submit.prevent="submit" class="bg-white p-8 rounded w-4/12 mb-6">
        <div class="mb-6">
          <label for="email" class="block text-gray-600 font-medium mb-2">
            Your Username
          </label>
          <input type="text" name="email" id="email"
                 class="border-2 border-gray-400 rounded block w-full p-3 "
                 v-model="form.username"
          >
          <p>the message will be send to your email account</p>
        </div>
        <div class="">
          <button type="submit" class="bg-blue-500 text-white p-4 rounded font-medium block w-full">Send</button>
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
      username : null
    }
  }
  },
  methods : {
    async submit(){
      let res = await this.$axios.$get('auth/forget/'+this.form.username).then(res=>{
        this.$router.push('/')
      }).catch(e=>{
        window.alert('invalid username entered')
      })
    }
  }
}
</script>

<style scoped>

</style>
