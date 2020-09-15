<template>
  <snippet-card :snippet="snippet" >
    <nuxt-link :to="{ name : 'author-id' , params : {id : snippet.author.username}}">{{snippet.author.name}}</nuxt-link>
  </snippet-card>
</template>

<script>
import SnippetCard from "./SnippetCard";
export default {
name: "BrowseSnippetsCard",
  components : {
    SnippetCard
  },
  props : {
    snippet : {
      required : true ,
      type : Object
    }
  }
}
</script>

<style scoped>

</style>
