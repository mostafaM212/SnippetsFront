<template>
  <div class="order-first row">
    <a href="#"

               class="bg-blue-500 btn mb-2 ml-3"
               title="previous step"
               :class="{
                  'disabled' : previous === null
               }"
               v-on:click.prevent="setPrevious"
    ><i class="fa fa-arrow-left"></i></a>
    <a

               class="bg-blue-500 btn mb-2 ml-auto mr-3 "
               title="next step"
               :class="{
                  'disabled' : next === null
               }"
               v-on:click.prevent="setNext"
    ><i class="fa fa-arrow-right"></i></a>
  </div>
</template>

<script>
export default {
  name: "StepNavButton",
  props : {
    next : {

      default : null
    },
    previous : {
      default: null
    }
  },
  methods : {
    setNext(){
      this.$emit('next')
    },
    setPrevious(){
      this.$emit('previous')
    }
  }
}
</script>

<style scoped>

</style>
