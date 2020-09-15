<template>
  <div class="container w-full  items-center justify-center " >
    <button class="bg-blue-500 btn  myClass"
            v-on:click="back"
            title="previous"
            :class="{
              'disabled' : this.prevPage == null
            }"
    >< Back</button>
    <button class="bg-blue-500 btn btn-success ml-auto justify-center"
            v-on:click="next"
            title="next"
            :class="{
              'disabled' : this.nextPage == null
            }"
    >Next ></button>
  </div>
</template>

<script>
export default {
name: "Nav",
  props : {
    url : {
      required : true ,
      type : String
    },
    page : {
      default : 1
    },
    nextPage : {
      default : null
    },
    prevPage : {
      default: null
    }
  },
  methods : {
    next(){
      console.log(this.page)
      if (this.nextPage !== null){
        this.page += 1
        this.$emit('next',this.url , this.page)
      }
    },
    back(){
      if (this.prevPage !== null){
        this.page -= 1
        this.$emit('back' , this.url , this.page)
      }
    }
  }
}
</script>

<style scoped>
  .myClass{
    margin-left: 400px;
  }
</style>
