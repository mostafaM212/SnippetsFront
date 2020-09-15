<template>
  <div class="mt-24 mb-12">
    <div class="container flex flex-wrap lg:flex-no-wrap justify-between">
      <ul class="flex items-centre mb-6 lg:mb-0 ">
        <li class="mr-16">
          <nuxt-link  :to="{ name:'index'}"
                      class="text-gray-500 text-sm mb-2  inline-block"
          >Home</nuxt-link>
          <div class="text-gray-500 text-sm">
            &copy; MostafaWD Ltd 2019. All rights reserved
          </div>
        </li>
      </ul>
      <ul class="flex items-end flex-wrap lg:flex-no-wrap">
        <li class="mr-8 w-full lg:w-auto">
          <a href="https://codecourse.com"
             class="text-gray-500 text-sm"
             target="_blank"
             rel="noopener"
          >codecoure.com</a>
        </li>
        <li class="mr-8  w-full lg:w-auto">
          <a href="#"
             class="text-gray-500 text-sm"
             target="_blank"
             rel="noopener"
          >Terms</a>
        </li>
        <li class="mr-8  w-full lg:w-auto">
          <a href="#"
             class="text-gray-500 text-sm"
             target="_blank"
             rel="noopener"
          >Privacy Policy</a>
        </li>
        <li class="mr-8  w-full lg:w-auto">
          <a href="mailto:snippets@codecourse.com"
             class="text-gray-500 text-sm"
          >snippets@codecourse.com</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "footer"
}
</script>

<style scoped>

</style>
