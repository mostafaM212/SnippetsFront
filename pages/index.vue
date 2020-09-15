<template>
  <div class="">
    <div class="bg-white mb-16">
      <div class="container flex py-16 lg:py-30">
<!--        <div class="row">-->
<!--          <p class="text-gray-500 ml-auto font-medium ml-auto">{{time}}</p>-->
<!--        </div>-->
        <div class="full-width lg:w-6/12">
          <h1 class="font-medium text-5xl text-gray-700 leading-tight mb-6">
            Browse and Create mini step by step tutorials.
          </h1>
          <p class="text-xl text-gray-700 mb-12">
            Snippets are small collection of steps for things you don't need to remember.
          </p>
          <nuxt-link :to="{name : 'snippets-id', params : {id : snippetExampleUuid}}"
                      class="inline-block text-lg py-3 px-5 bg-blue-500 text-white rounded-lg"
          >Show an Example &rarr;</nuxt-link>
        </div>
      </div>
    </div>
    <div class="container">
      <h1 class="text-xl text-gray-600 font-medium mb-6" >
        Latest Snippets
      </h1>
      <latest-snippets-card v-for="snippet in snippets"
                            :key="snippet.uuid"
                            :snippet="snippet"
                            />
    </div>

      <Nav url="/snippets"
           :page="currentPage "
           :next-page="nextPage"
           :prev-page="prePage"
           v-on:next="next"
           v-on:back="back"
      />

  </div>
</template>

<script>
import config from "@/config";
import { debounce as _debounce } from 'lodash'
import moment from 'moment'
import LatestSnippetsCard from "../components/snippets/LatestSnippetsCard";
import Nav from "../components/Nav/Nav";
import SnippetsNav from "../mixins/snippets/SnippetsNav";
export default {
  components : {
    LatestSnippetsCard,
    Nav
  },
  head(){
    return {
      title : 'Home | Snippets'
    }
  },
  data(){
    return {
      STRIPE_SECRET : process.env.STRIPE_SECRET,
      timeMe : null,
      snippets : [],
      snippetExampleUuid : process.env.SNIPPET_EXAMPLE_UUID
    }
  },
  async asyncData(context){
    let res = await context.$axios.$get('/snippets').catch(e=>{
      console.log(e)
    })

    return {
      snippets : res.data,
      nextPage : res.links.next ,
      prePage : res.links.prev,
      currentPage : res.meta.current_page
    }
  },
  mounted() {

  },
  computed : {
    time(){
        return moment(moment.now()).format('LL');
    }
  },
  mixins : [SnippetsNav]
}
</script>

<style>
</style>
