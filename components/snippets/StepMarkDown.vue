<template>
  <div v-html="markdown">

  </div>
</template>

<script>
import hljs from 'highlight.js'
let markdown = require('markdown-it')({
  highlight(str , lang){
    let esc = markdown.utils.escapeHtml
    if(lang && hljs.getLanguage(lang)){
      return '<pre class="hljs ' + esc(lang.toLowerCase()) + '"><code>'+ hljs.highlightAuto(esc(str)).value +'</code></pre>'
    }
    return '<pre class="hljs"><code>'+ esc(str) +'</code></pre>'
  }
})
export default {
name: "StepMarkDown",
  props : {
    value : {
      required : false ,
      type : String
    }
  },
  computed : {
    markdown(){
      return markdown.render(this.value)
    }
  }
}
</script>

<style scoped>

</style>
