<template>
  <div class="">
    <div class="mb-16 bg-white">
      <div class="container py-10 pb-16">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-4xl text-gray-700 font-medium leading-tight mb-4">
            Search
          </h1>
          <div class="text-gray-600 mb-8">
            Search by Snippet title
            <i class="fa fa-search-plus"></i>
          </div>
        </div>

        <div class="flex full-width">
          <label for="search"></label>
          <input type="text" id="search"
                 placeholder="Search here..."
                 v-model.lazy.trim="search"
                 class="w-full border-2 border-gray-400 rounded-lg font-medium block p-2 border-dashed"
          >
          <i class=" fa fa-search text-lg m-2"></i>
        </div>
      </div>
    </div>
    <div class="container">
      <template v-if="result.length >0">

          <h1 class="text-xl text-gray-600 font-medium mb-6" >
            All Snippets Results ({{result.length}})
          </h1>

        <BrowseSnippetsCard v-for="snippet in result"
                            v-if="snippet"
                            :key="snippet.uuid"
                            :snippet="snippet"

        />
      </template>
      <h1 class="text-xl text-gray-600 font-medium mb-6" v-else>
        No Snippets Found
      </h1>
    </div>
  </div>
</template>

<script>
import BrowseSnippetsCard from '../../components/snippets/BrowseSnippetsCard'
export default {
  name: "index",
  components : {
    BrowseSnippetsCard
  },
  data(){
    return {
      snippets : [],
      search : null,
      result : []
    }
  },
  async asyncData(context){
    let res = await context.$axios.$get('/snippet/search').catch(e =>{
      console.log(e)

    })

    return {
      snippets : res.data
    }
  },
  computed : {
      searchAttr(){

        this.search = this.$route.query.query
      }
  },
  watch : {
    'search'(value){
     if(value !== ''){
       for (let i in this.snippets){
         if (this.snippets[i].title.toLocaleLowerCase().includes(value) ){

           if (!this.result.includes(this.snippets[i])){
             this.result.push(this.snippets[i])
             this.$router.push('/search?query='+value)
           }
         }
         continue
       }
     }else {
       this.result = []
     }
    }
  },
  head : {
    title : 'Search | Snippets'
  }
}
</script>

<style scoped>

</style>
