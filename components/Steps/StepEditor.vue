<template>
  <div class="">
            <textarea class="w-full mb-6 border-dashed border-2 border-gray-400 rounded-lg"
                      v-model="currentStep.body"
                      v-on:change="setChange"
                      style="height: 300px ; padding: 40px"
            >{{currentStep.body}}</textarea>
    <div class="bg-white p-8 rounded-lg text-gray-600 w-full">
      <step-mark-down
        :value="currentStep.body "
      />

    </div>
  </div>
</template>

<script>
import StepMarkDown from "../snippets/StepMarkDown";
export default {
name: "StepEditor",
  components : {
    StepMarkDown
  },
  props : {
    currentStep : {
      required : true ,
      type : Object
    }
  },
  methods : {
    setChange(){
      this.$emit('body',this.currentStep.body)
    }
  }
}
</script>

<style scoped>

</style>
