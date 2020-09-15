<template>
  <div >
    <div class="bg-white mb-16">
      <div class="container py-10 pb-16">
        <div class="w-10/12">
          <input type="text" class="text-4xl text-gray-700 font-header font-medium leading-right mb-4 w-full block
                 p-2 border-2 rounded border-dashed border-gray-400"
                 value="Snippets title"
                  placeholder="Untitled Snippet"
                 v-model="snippet.title"
                 v-on:change="changeTitle"
          >
          <div class="text-gray-600">
            Created by
            <nuxt-link :to="{}">
              {{snippet.author.name}}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="flex items-center mb-6">
        <div class="text-xl text-gray-600 font-medium  mr-3">
          {{ currentStepIndex + 1}}/{{steps.length}}.
        </div>
        <input type="text" class="w-full text-xl text-gray-600 font-medium p-2 py-1 border-2 bg-transparent rounded
               border-dashed border-gray-400"
               value="Step title"
               placeholder="Untitled Step"
               v-model="currentStep.title"
        >
      </div>
      <div class="flex   " >
        <div class="w-full lg:w-8/12 lg:mr-16 mb-8 mr-3 mr-3 ">
          <StepNavButton :next="nextStep" :previous="previousStep"
          v-on:next="setStepNext"
           v-on:previous="setStepPrevious"
          />
          <div class="">
            <textarea class="w-full mb-6 border-dashed border-2 border-gray-400 rounded-lg"
                      v-model="currentStep.body"
                      style="height: 300px ; padding: 40px"
            >{{currentStep.body}}</textarea>
            <div class="bg-white p-8 rounded-lg text-gray-600 w-full">
              <step-mark-down
                :value="currentStep.body "
              />

            </div>
          </div>

          <div class="row ml-1">
            <div class="order-first lg:order-last mt-2 ">
              <a v-on:click.prevent="deleteSnippet(snippet)" :to="{}" class="btn bg-red-500 " title="Delete">
                <i class="fa fa-trash "></i>
              </a>

<!--              <nuxt-link :to="{}" class="btn bg-green-500 " title="Edit">-->
<!--                <i class="fa fa-plus "></i>-->
<!--              </nuxt-link>-->
            </div>
            <add-step-button :snippet="snippet" :current-step="currentStep"  v-on:addingStep="addNewStep"/>
          </div>
        </div>
        <div class="w-full lg:w-4/12">
          <div class="mb-8">
            <h1 class="text-xl text-gray-700 font-medium leading-right mb-4">Steps</h1>
            <step-list :steps="orderStepsAsc" :current-step="currentStep" v-on:step="choose" v-on:deleted="delStep"/>
          </div>
          <div class="border-t-2 pt-6 py-6">
            <h1>Publishing....</h1>
            <div class="text-gray-500 text-sm mb-6">
              <template v-if="lastSave">Last saved at {{lastSaveFormatted}}</template>
              <template v-else>No changes saved in this session</template>

            </div>
            <div class="flex items-baseline">
              <input type="checkbox" class="text-blue-500" name="public" id="public"  v-model="snippet.is_public">
              <label for="public" class="ml-2 text-blue-500 font-bold ">
                Make Snippet Public
              </label>
            </div>
            <div class="text-gray-500 text-sm mb-6">you can change it later</div>
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
import StepList from "../../../../components/Steps/StepList";
import StepNavButton from "../../../../components/Steps/StepNavButton";
import { debounce as _debounce } from 'lodash'
import browseSnippets from "../../../../mixins/snippets/browseSnippets";
import AddStepButton from "../../../../components/Steps/AddStepButton";
import moment from 'moment'
import StepMarkDown from "../../../../components/snippets/StepMarkDown";
import deleteSnippet from "../../../../mixins/snippets/deleteSnippet";
export default {
  name: "index",
  data(){
    return {
      snippet : {},
      steps : [],
      lastSave : null
    }
  },
  // validate(data){
  //   return /^\d+$/.test(data.params.id)
  // }
  async asyncData(context){

    let res = await context.$axios.$get('/snippets/'+context.params.id).catch(error => {
      console.log(error)
    })

    return {
      snippet : res.data,
      steps : res.data.steps
    }
  },

  methods : {
    isCurrent(step){
      return step.uuid === this.$route.query.step
    },
    choose(step){
      this.$router.push('/snippets/'+this.$route.params.id+'/edit?step='+step.uuid)
    },
    async changeTitle(){
      await this.$axios.put('/snippets/'+this.snippet.uuid,{
        title : this.snippet.title

      })
      this.touchLastSave()
    },
    setStepNext(){
      this.$router.push('/snippets/'+this.$route.params.id+'/edit?step='+this.nextStep.uuid)
      this.currentStep = this.nextStep
    },
    setStepPrevious(){

      this.$router.push('/snippets/'+this.$route.params.id+'/edit?step='+this.previousStep.uuid)
      this.currentStep = this.previousStep
    },
    addNewStep(step){

      this.currentStep = step
      this.$router.push('/snippets/'+this.$route.params.id+'/edit?step='+step.uuid)
      this.steps.push(step)
    },
    async delStep(step){
      this.currentStep = this.firstStep
      this.steps = this.steps.filter((s) =>{
       return  s.uuid !== step.uuid
      })
      await this.$axios.$delete('/snippets/'+this.$route.params.id +'/'+step.uuid)
    },
    touchLastSave(){
      this.lastSave = moment.now()
    }
  },
  computed : {
    lastSaveFormatted(){
      if (!this.lastSave){
        return false
      }
      return moment(this.lastSave).format('hh:mm:ss')
    }
  },
  mixins : [
      browseSnippets,
      deleteSnippet
  ],
  watch : {
    currentStep : {
      deep : true ,
      handler : _debounce(async function (step){
        await this.$axios.$put('/snippets/'+this.snippet.uuid+'/step/'+step.uuid , step)
        this.touchLastSave()
      },500)
    },
    'snippet.is_public':{
      deep : true ,
      handler : _debounce(async function (isPublic){

        await this.$axios.$put('/snippets/'+this.snippet.uuid, {
          is_public : isPublic
        })
        this.touchLastSave()
      },500)
    }
  },
  middleware(context){
    if (!context.$auth.loggedIn ){
      return  context.redirect('/')
    }
  },

  head(){
    return {
      title :  this.snippet.title ? 'Edit - '+ this.snippet.title+' | Snippets' : 'Edit - '+ 'Untitled Snippet'+' | Snippets'

    }
  },
  components : {
     StepList,
    StepNavButton,
    AddStepButton,
    StepMarkDown
  }
}
</script>

<style scoped>

</style>
