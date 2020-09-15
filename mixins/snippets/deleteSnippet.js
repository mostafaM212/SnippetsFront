

export default {


  methods : {
    async  deleteSnippet(snippet){

      if (! window.confirm('Do you want to delete that snippet '+snippet.title)){
        return null
      }
      await this.$axios.delete('/snippets/'+ snippet.uuid).catch(e => {
        console.log(e)
      })
      this.$router.push({name : 'index'})
      window.alert('the snippet deleted successfully')
    }
  }
}
