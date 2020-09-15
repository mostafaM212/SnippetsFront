

export default {
  data(){
      return {
        currentPage : null ,
        nextPage : null ,
        prePage : null
      }
  },
  methods : {
    async next(url , page){
      this.currentPage +=1
      let res = await this.$axios.get(url + '?page='+page).catch(e =>{
        console.log(e)
      })
      this.snippets = res.data.data
      this.nextPage = res.data.links.next
      this.prePage = res.data.links.prev
    },
    async back(url , page){
      this.currentPage -=1
      let res = await this.$axios.get(url + '?page='+page).catch(e =>{
        console.log(e)
      })
      this.snippets = res.data.data
      this.nextPage = res.data.links.next
      this.prePage = res.data.links.prev
    }
  }
}
