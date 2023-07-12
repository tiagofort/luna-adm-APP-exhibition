<template>
    <v-footer
      dark
      padless
    >
        <v-card
          class="flex"
          flat
          tile
        >
          <v-card-title class="grey lighten-4" elevation="2">
            <strong class="subheading black--text">Get connected with us on social networks!</strong>
            <v-spacer></v-spacer>
            <v-btn
              class="mx-4"
              dark
              icon
              @click="abrirInsta"
            >
              <v-icon class="black--text" size="24px">
                  mdi-instagram
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="py-2 white--text text-center">
              {{ new Date().getFullYear() }} — <strong>Webdesigner ©Tiago Fortaleza Gai</strong>
              <v-btn
                  class="mx-4"
                  dark
                  icon
                  @click="abrirInstaDeveloper"
              >
                  <v-icon class="white--text" size="18px">
                      mdi-instagram
                  </v-icon>
              </v-btn>
          </v-card-text>
        </v-card>
    </v-footer>
</template>
  
<script>
export default {
  methods: {
    abrirInsta(){
      window.open("https://www.instagram.com/lunapedraria.ie/?igshid=YmMyMTA2M2Y%3D");
    },
    abrirInstaDeveloper(){
      window.open("https://www.instagram.com/tiagofort/");
    } 
  }
}
</script>