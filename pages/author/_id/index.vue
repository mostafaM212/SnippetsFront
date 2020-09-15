<template>
  <div class="">
    <div class="mb-16 bg-white">
      <div class="container py-10 pb-16">
        <h1 class="text-4xl text-gray-700 font-medium leading-tight mb-4">
          {{ author.name }}
        </h1>
        <div class="text-gray-600">
          member since {{author.joined}}
        </div>
      </div>
    </div>
    <div class="container">
      <h1 class="text-xl text-gray-600 font-medium mb-6" >
        Public Snippets ({{snippets.length}})
      </h1>
      <SnippetCard v-for="snippet in snippets"
                          :key="snippet.uuid"
                          :snippet="snippet"
      />
    </div>
  </div>
</template>

<script>
import SnippetCard from "../../../components/snippets/SnippetCard";
export default {
  name: "author",

  data(){
    return {
      author : null,
      snippets : null
    }
  },
  async asyncData(context){
    console.log(context.params.id)
    let res = await context.$axios.get('/user/'+context.params.id ).catch(e => {
      console.log(e)
    })
    let res2 = await context.$axios.$get('/user/'+context.params.id+'/snippets')
    return {
      author : res.data.data ,
      snippets : res2.data
    }
  },
  head(){
    return {
      title : this.author.name +' | Snippets'
    }
  },
  components : {
    SnippetCard
  }
}
</script>

<style scoped>

</style>
