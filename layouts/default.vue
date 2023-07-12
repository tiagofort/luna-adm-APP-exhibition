
<template>
      <v-app id="home">
            <MenuBar/>
              <v-main class="white pa-0">
                  <nuxt />
              </v-main>
            <Snackbar/>
            <Footer/>
        </v-app>
</template>



<script>
import logo from "@/static/logo/logoLuna.svg";
import MenuBar from "~/components/MenuBar.vue";
import Footer from "~/components/Footer.vue";
import Snackbar from "~/components/Snackbar.vue";

export default {
  data: () => ({
      aut: false,
      imgLogo: logo
  }),
  
  components: { MenuBar, Footer, Snackbar }
}
</script>
