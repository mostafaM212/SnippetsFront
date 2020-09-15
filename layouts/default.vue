<template>
  <div>
    <Nav/>
    <Nuxt />
    <app-footer />
  </div>
</template>
<script>
  import Navigation from "../components/global/Navigation";
  import Mefooter from "../components/Footer/Mefooter";
  export default {
    components : {
      'Nav' : Navigation,
      'app-footer' : Mefooter
    }
  }
</script>
<style>

</style>
