<template>
  <div class="order-first lg:order-last mt-2 ml-auto mr-3">
    <a v-on:click.prevent="addBefore" class="btn bg-blue-500 " title="Add Step Before Current Step">
      <i class="fa fa-step-backward "></i>
    </a>
    <a v-on:click.prevent="addAfter" class="btn bg-blue-500 " title="Add Step After Current Step">
      <i class="fa fa-step-forward "></i>
    </a>
  </div>
</template>

<script>
export default {
  name: "AddStepButton",
  props : {
    snippet : {
      required : true ,
      type : Object
    },
    currentStep : {
      required : true ,
      type : Object
    },
  },
  methods : {
    async addAfter(){
        let res = await this.$axios.post('/snippets/'+this.snippet.uuid+'/step',{
          order : this.currentStep.order + 1
        }).catch(e => console.log(e))
        this.$emit('addingStep',res.data.data)

    },
    async addBefore(){
      let res = await this.$axios.post('/snippets/'+this.snippet.uuid+'/step',{
        order : this.currentStep.order - 1
      }).catch(e => console.log(e))
      this.$emit('addingStep',res.data.data)
    }
  }
}
</script>

<style scoped>

</style>
