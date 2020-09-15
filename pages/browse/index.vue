<template>
  <div class="">
    <div class="mb-16 bg-white">
      <div class="container py-10 pb-16">
        <h1 class="text-4xl text-gray-700 font-medium leading-tight mb-4">
          Browse
        </h1>
      </div>
    </div>
    <div class="container">
      <h1 class="text-xl text-gray-600 font-medium mb-6" v-if="snippets.length">
        All Snippets ({{snippets.length}})
      </h1>
      <h1 class="text-xl text-gray-600 font-medium mb-6" v-else>
        No Snippets Yet
      </h1>
     <BrowseSnippetsCard v-for="snippet in snippets"
                         :key="snippet.uuid"
                         :snippet="snippet"
     />
    </div>
    <template v-if="snippets.length === 10">
      <Nav url="/snippets"
           :page="currentPage "
           :next-page="nextPage"
           :prev-page="prePage"
           v-on:next="next"
           v-on:back="back"
      />
    </template>
  </div>
</template>

<script>
import SnippetsNav from "../../mixins/snippets/SnippetsNav";
import Nav from "../../components/Nav/Nav";
import SnippetCard from "../../components/snippets/SnippetCard";
import BrowseSnippetsCard from "../../components/snippets/BrowseSnippetsCard";
export default {
name: "index",
  data(){
    return {
      snippets : []
    }
  },
  async asyncData(context){
    let res = await context.$axios.$get('/snippets').catch(e =>{
      console.log(e)
    })

    return {
      snippets : res.data,
      nextPage : res.links.next ,
      prePage : res.links.prev,
      currentPage : res.meta.current_page
    }
  },
  head : {
    title : 'Browse | Snippets'
  },
  components : {
    SnippetCard,
    BrowseSnippetsCard,
    Nav
  },
  mixins : [SnippetsNav]
}
</script>

<style scoped>

</style>
