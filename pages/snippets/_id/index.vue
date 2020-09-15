<template>
  <div >
    <div class="bg-white mb-16">
      <div class="container py-10 pb-16">
        <div class="w-10/12">
          <h1 class="text-4xl text-gray-700 font-medium leading-right mb-4">
            {{ snippet.title ? snippet.title :'Untitled Snippet' }}
          </h1>
          <div class="text-gray-600">
            Created by
            <nuxt-link :to="{}">
              {{ snippet.author.name }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <h1 class="text-xl text-gray-600 font-medium mb-6">
        {{ currentStepIndex + 1}}/{{steps.length}}. {{ currentStep.title }}
      </h1>
      <div class="flex   " >
        <div class="w-full lg:w-8/12 lg:mr-16 mb-8 mr-3">
          <StepNavButton :next="nextStep" :previous="previousStep"
                         v-on:next="setStepNext"
                         v-on:previous="setStepPrevious"
          />
           <div class="">
             <div class="bg-white p-8 rounded-lg text-gray-600 w-full ">
               <step-mark-down :value=" currentStep.body ? currentStep.body : 'no text yet' "/>
             </div>
           </div>
          <div class="order-first lg:order-last mt-2 " v-if="snippet.my_data">
            <nuxt-link :to="{ name : 'snippets-id-edit',
            params : {
              id : snippet.uuid ,
              },
            query : {
              step : currentStep.uuid
            }}" class="btn bg-blue-500 " title="Edit">
              <i class="fa fa-edit "></i>
            </nuxt-link>
          </div>
        </div>
        <div class="w-full lg:w-4/12">
          <div class="mb-8">
            <h1 class="text-xl text-gray-700 font-medium leading-right mb-4">Steps</h1>
            <StepList :current-step="currentStep" :steps="orderStepsAsc" v-on:step="choose" :snippet="snippet"/>
          </div>
          <div class="text-gray-500 text-sm">
            Use <div class="inline-block px-2 leading-relaxed text-gray-600 rounded bg-gray-400  text-sm">ctrl</div> +
            <div class="inline-block px-2 leading-relaxed text-gray-600 rounded bg-gray-400  text-sm">shift</div> +
            <div class="inline-block px-2 leading-relaxed text-gray-600 rounded bg-gray-400  text-sm">left</div> or
            <div class="inline-block px-2 leading-relaxed text-gray-600 rounded bg-gray-400  text-sm">right</div> on keyboard to navigate between steps
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StepNavButton from "../../../components/Steps/StepNavButton";
import StepList from "../../../components/Steps/StepList";
import browseSnippets from "../../../mixins/snippets/browseSnippets";
import StepMarkDown from "../../../components/snippets/StepMarkDown";
export default {
name: "index",
  data(){
    return {
      snippet : null ,
      steps : []
    }
  },
  // validate(data){
  //   return /^\d+$/.test(data.params.id)
  // }
  async asyncData(context){

    let res = await context.$axios.get('/snippets/'+context.params.id).catch(e =>{
      console.log(e)
    })
    return {
      snippet : res.data.data ,
      steps : res.data.data.steps
    }
  },
  methods : {

    setStepNext(){
      this.$router.push('/snippets/'+this.$route.params.id+'?step='+this.nextStep.uuid)
      this.currentStep = this.nextStep
    },
    setStepPrevious(){

      this.$router.push('/snippets/'+this.$route.params.id+'?step='+this.previousStep.uuid)
      this.currentStep = this.previousStep
    },
    choose(step){

      this.$router.push('/snippets/'+this.$route.params.id+'?step='+step.uuid)
    },
  },

  head(){
    return {
      title :  this.snippet.title ?  this.snippet.title +' | Snippets' : 'Untitled Snippet'+' | Snippets'

    }
  },
  components : {
   StepList,
    StepNavButton,
    StepMarkDown
  },
  mixins : [
    browseSnippets
  ]
}
</script>

<style scoped>

</style>
