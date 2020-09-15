<template>
  <nuxt-link  :to="{name : 'snippets-id', params : { id : snippet.uuid}}">
    <div class="flex flex-wrap lg:flex-no-wrap justify-between items-center bg-white p-8 rounded-lg w-full mb-2">
      <div class=" mr-8 mb-2 lg:mb-0">
        <h1 class="text-gray-600 text-xl leading-snug ">
          {{snippet.title || 'Untitled Snippet'}}
        </h1>
        <div class="text-gray-500 mr-6 font-medium">
          {{snippet.steps_count }} steps
        </div>
      </div>
      <div class="">
        <slot />
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: "SnippetCard",
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
