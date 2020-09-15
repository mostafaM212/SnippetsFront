<template>
  <ul>
    <li v-for="( step ,index) in steps"
        :key="index"
        class="mb-1"
    >
      <a href="" v-on:click.prevent="choose(step)"
         :class="{
                            'font-bold': currentStep.uuid === step.uuid
                           }"
      >
        {{index +1 }}.{{step.title ? step.title : 'Untitled Step'}}

      </a>
      <a href="#" v-on:click.prevent="deleteStep(step)" class="ml-2 "
      v-if="step.uuid === currentStep.uuid && steps.length > 1 "
      ><i class="fa fa-backspace text-red-500"></i></a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "StepList",
  props : {
    steps : {
      required : true ,
      type :Array
    },
    currentStep : {
      required: true,
      type : Object
    },
  },
  methods : {
    choose(step){
      this.$emit('step',step)
    },
     deleteStep(step){
       this.$emit('deleted',this.currentStep)
    }
  }
}
</script>

<style scoped>

</style>
