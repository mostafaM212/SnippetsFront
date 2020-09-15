<template>
  <div class="container mt-16">
    <div class="flex justify-between">
      <h1 class="text-xl text-gray-600 font-medium mb-6">
        Your Snippets ({{snippets.length}})
      </h1>
      <a href="" v-on:click.prevent="createSnippet">+ Create a snippet</a>
    </div>
    <div class="text-gray-600 font-medium" v-if="snippets.length ===0">
      You have no snippets yet please create snippets
      <a href="" v-on:click.prevent="createSnippet">+ Create a snippet</a>

    </div>
    <snippet-card v-for="snippet in snippets"
                  :key="snippet.uuid"
                  :snippet="snippet"
                  v-else

    >
      <ul class="flex items-end text-gray-600 ">
        <li class="mr-2">
          <template v-if="snippet.is_public">
            Public
          </template>
          <template v-else>
            Private
          </template>
        </li>
        <li class="mr-2">
          <nuxt-link :to="{name : 'snippets-id-edit', params : {id : snippet.uuid}}">Edit</nuxt-link>
        </li>
        <li>
          <a href="#" v-on:click.prevent="deleteSnippet(snippet)">Delete</a>
        </li>
      </ul>
    </snippet-card>
  </div>
</template>

<script>
import SnippetCard from "../../components/snippets/SnippetCard";
import deleteSnippet from '../../mixins/snippets/deleteSnippet';
export default {
name: "index",
  data(){
    return {
      snippets : [],
    }
  },
  middleware : ['authMiddleware'],
  async asyncData(context){
    let res = await context.$axios.$get('/me/snippets').catch(e =>{
      console.log(e)
    })
    console.log(res)
    return {
      snippets : res.data
    }
  },
  methods : {
    async createSnippet(){
      let res = await this.$axios.post('/snippets')

      this.$router.push({
        name : 'snippets-id-edit',
        params : {
          id : res.data.data.uuid
        }
      })
    },
    next(){

    },
    back(){

    }
  },
  components : {
    SnippetCard,

  },
  mixins : [
    deleteSnippet
  ],
  head : {
    title : 'Dashboard | Snippets'
  }
}
</script>

<style scoped>

</style>
